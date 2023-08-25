const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { notifyRoutes } = require('./routes/notifyRoute');
const {
  parseSymbols,
  parseSymbolsAndNormalize,
} = require('./middlewares/parseStringMiddleware');
const { decode, encode } = require('./helpers/cryptHashing');
// decode('cat'); //////// =<<<<<<<<<<<<<<<<<<
// encode('eyJhbGciOiJIUzI1NiJ9.Y2F0.JyKJCzCuj2pIQiHORJhcBIJ0ywmKt5olSY6OwuV_un4'); //////// =<<<<<<<<<<<<<<<<<<
const {
  myFirstMsg,
  mySuccessMsg,
  myBuyMsg,
  mySaleMsg,
  myFailMsg,
} = require('./helpers/messages');
const { writeToDb } = require('./services/user');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  });
  next();
});

app.use('/check-photo', notifyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}/`);
});

// =============== bot
const token = process.env.TOKEN;
const channelId = process.env.CHANNEL_ID;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    try {
      await bot.sendMessage(chatId, myFirstMsg(), {
        parse_mode: 'MarkdownV2',
      });
    } catch (error) {
      console.log('/start sendMessage error ====== >', error);
    }
  }
});

bot.on('polling_error', error => {
  console.log('bot_polling_error', error.message);
});

bot.on('webhook_error', error => {
  console.log('bot_webhook_error', error.message);
});

bot.on('new_chat_members', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  console.log(msg);

  // if (msg.new_chat_member.username === me.username) {
  console.log('join %s(%s)', msg.chat.title, msg.chat.id);
  // }
  // if (text === '/start') {
  //   try {
  //     await bot.sendMessage(chatId, myFirstMsg(), {
  //       parse_mode: 'MarkdownV2',
  //     });
  //   } catch (error) {
  //     console.log('/start sendMessage error ====== >', error);
  //   }
  // }
});

app.post('/web-data-sale', async (req, res) => {
  const { title, description, cost, contact, queryId, photoURL, payment } =
    req.body;

  const arrayPhoto = photoURL.map((item, index) => {
    if (index === 0) {
      return {
        type: 'photo',
        media: photoURL[index],
        caption: mySaleMsg(title, description, cost, contact),
        parse_mode: 'MarkdownV2',
      };
    }
    return {
      type: 'photo',
      media: photoURL[index],
    };
  });

  try {
    await bot.sendMediaGroup(channelId, arrayPhoto);

    const time = await writeToDb({
      ...req.body,
      payment: payment ? payment : false,
    });

    if (queryId) {
      await bot.answerWebAppQuery(queryId, {
        type: 'article',
        id: queryId,
        title: 'Оголошення опубліковано',
        input_message_content: {
          message_text: mySuccessMsg(title),
          parse_mode: 'Markdown',
        },
      });
    }

    res
      .status(200)
      .send({ ...req.body, sendToTelegram: arrayPhoto, sendToDb: time });
  } catch (error) {
    if (queryId) {
      await bot.answerWebAppQuery(queryId, {
        type: 'article',
        id: queryId,
        title: 'Не вийшло відправити оголошення',
        input_message_content: {
          message_text: myFailMsg(),
          parse_mode: 'Markdown',
        },
      });
    }

    res.status(500).send({ error });
  }
});

app.post('/web-data-buy', async (req, res) => {
  const { title, description, contact, queryId, payment } = req.body;

  try {
    await bot.sendMessage(channelId, myBuyMsg(title, description, contact), {
      parse_mode: 'MarkdownV2',
    });

    const time = await writeToDb({
      ...req.body,
      payment: payment ? payment : false,
    });

    if (queryId) {
      await bot.answerWebAppQuery(queryId, {
        type: 'article',
        id: queryId,
        title: 'Оголошення опубліковано',
        input_message_content: {
          message_text: mySuccessMsg(title),
          parse_mode: 'Markdown',
        },
      });
    }

    res.status(200).send({
      ...req.body,
      sendToTelegram: myBuyMsg(title, description, contact),
      sendToDb: time,
    });
  } catch (error) {
    if (queryId) {
      await bot.answerWebAppQuery(queryId, {
        type: 'article',
        id: queryId,
        title: 'Не вийшло відправити оголошення',
        input_message_content: {
          message_text: myFailMsg(),
          parse_mode: 'Markdown',
        },
      });
    }

    res.status(500).send({ error });
  }
});

// адмінські супер можливості
app.post('/web-data-admin', async (req, res) => {
  const { title, description, cost, contact, queryId, photoURL, type } =
    req.body;

  if (
    (type === 'sale' && photoURL === undefined && cost === undefined) ||
    (type === 'sale' && photoURL === undefined) ||
    (type === 'sale' && cost === undefined)
  ) {
    return res.status(500).send({
      message: 'Потрібні фотографії для такого оголошення і вартість',
    });
  }

  if (type === 'sale' && photoURL.length > 0) {
    const myCaption = `\*${parseSymbolsAndNormalize(
      title
    )}*\n\*Опис:* ${parseSymbolsAndNormalize(
      description
    )}\n\*Ціна:* ${cost} грн\n\*Зв'язок:* ${parseSymbols(contact)}`;

    const arrayPhoto = photoURL.map((item, index) => {
      if (index === 0) {
        return {
          type: 'photo',
          media: photoURL[index],
          caption: myCaption,
          parse_mode: 'MarkdownV2',
        };
      }

      return {
        type: 'photo',
        media: photoURL[index],
      };
    });

    try {
      await bot.sendMediaGroup(channelId, arrayPhoto);

      const time = await writeToDb({ ...req.body });

      res
        .status(200)
        .send({ ...req.body, sendToTelegram: arrayPhoto, sendToDb: time });
    } catch (error) {
      if (queryId) {
        await bot.answerWebAppQuery(queryId, {
          type: 'article',
          id: queryId,
          title: 'Не вийшло відправити оголошення',
          input_message_content: {
            message_text: `Не вийшло відправити оголошення, спробуйте знову`,
          },
        });
      }

      res.status(500).send({ error });
    }
  }

  if (type === 'buy') {
    try {
      await bot.sendMessage(channelId, myBuyMsg(title, description, contact), {
        parse_mode: 'MarkdownV2',
      });

      const time = await writeToDb({
        ...req.body,
      });

      if (queryId) {
        await bot.answerWebAppQuery(queryId, {
          type: 'article',
          id: queryId,
          title: 'Оголошення опубліковано',
          input_message_content: {
            message_text: mySuccessMsg(title),
            parse_mode: 'Markdown',
          },
        });
      }

      res.status(200).send({
        ...req.body,
        sendToTelegram: myBuyMsg(title, description, contact),
        sendToDb: time,
      });
    } catch (error) {
      if (queryId) {
        await bot.answerWebAppQuery(queryId, {
          type: 'article',
          id: queryId,
          title: 'Не вийшло відправити оголошення',
          input_message_content: {
            message_text: myFailMsg(),
            parse_mode: 'Markdown',
          },
        });
      }

      res.status(500).send({ error });
    }
  }
});

app.use('/', (req, res) => {
  const pathToHomePage = path.join(__dirname, 'index.html');
  res.sendFile(pathToHomePage);
});
