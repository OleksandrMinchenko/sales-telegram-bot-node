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

app.post('/web-data-sale', async (req, res) => {
  const { title, description, cost, contact, user, queryId, photoURL } =
    req.body;

  const dataForDb = {
    user: user ? user : 'anonym',
    title,
    description,
    cost,
    contact,
    photoURL,
    type: 'sale',
    payment: false,
  };

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

    const time = await writeToDb(dataForDb);

    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Оголошення опубліковано',
      input_message_content: {
        message_text: mySuccessMsg(title),
        parse_mode: 'Markdown',
      },
    });

    res
      .status(200)
      .send({ ...req.body, sendToTelegram: arrayPhoto, sendToDb: time });
  } catch (error) {
    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Не вийшло відправити оголошення',
      input_message_content: {
        message_text: myFailMsg(),
        parse_mode: 'Markdown',
      },
    });

    res.status(500).send({ error });
  }
});

app.post('/web-data-buy', async (req, res) => {
  const { title, description, contact, user, queryId } = req.body;

  const dataForDb = {
    user: user ? user : 'anonym',
    title,
    description,
    contact,
    type: 'buy',
    payment: false,
  };

  try {
    await bot.sendMessage(channelId, myBuyMsg(title, description, contact), {
      parse_mode: 'MarkdownV2',
    });

    const time = await writeToDb(dataForDb);

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
      .send({ ...req.body, sendToTelegram: myMessage, sendToDb: time });
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
  const {
    title,
    description,
    cost,
    contact,
    user,
    queryId,
    photoURL,
    type,
    payment,
  } = req.body;

  const dataForDb = {
    user: user ? user : 'anonym',
    title,
    description,
    cost,
    contact,
    photoURL,
    type,
    payment,
  };
  console.log('inside /web-data-admin - dataForDb =====>>>>> ', dataForDb);

  // написати умову в залежності від типу оголошення формувати різне повідомлення. З фото і без

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

    const time = await writeToDb(dataForDb);

    res
      .status(200)
      .send({ ...req.body, sendToTelegram: arrayPhoto, sendToDb: time });
  } catch (error) {
    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Не вийшло відправити оголошення',
      input_message_content: {
        message_text: `Не вийшло відправити оголошення, спробуйте знову`,
      },
    });

    res.status(500).send({ error });
  }
});

app.use('/', (req, res) => {
  const pathToHomePage = path.join(__dirname, 'index.html');
  res.sendFile(pathToHomePage);
});
