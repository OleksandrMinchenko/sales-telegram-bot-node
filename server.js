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
const { db } = require('./config/firestore');

const sendToDb = async () => {
  const docRef = db.collection('users').doc('alovelace');

  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  });

  // other collection
  const aTuringRef = db.collection('users').doc('aturing');

  await aTuringRef.set({
    first: 'Alan',
    middle: 'Mathison',
    last: 'Turing',
    born: 1912,
  });
};

// sendToDb();

const readFromDb = async () => {
  const snapshot = await db.collection('users').get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
};

// readFromDb()

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
const urlReact = process.env.URL_REACT;
const urlNode = process.env.URL_NODE;
const channelId = process.env.CHANNEL_ID;
// console.log(
//   'check ===>',
//   `https://api.telegram.org/bot${token}/getWebhookInfo`
// );
// console.log(
//   'activate ===>',
//   `https://api.telegram.org/bot${token}/setWebhook?url=${urlNode}`
// );

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log('message bot===>', 'я тут');

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Відправити оголошення', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Заповнити форму', web_app: { url: urlReact } }],
        ],
      },
    });
  }

  // console.log('before check data ===>');

  // if (msg?.web_app_data?.data) {
  //   try {
  //     await bot.sendMessage(chatId, 'Дякуємо');
  //     const data = msg.web_app_data.data;

  //     console.log('data =====>', data);
  //     const formData = JSON.parse(data);
  //     const notify = `${formData?.title}, ${formData?.description}, ${formData?.cost}, ${formData?.contact}`;

  //     await bot.sendMessage(chatId, notify);
  //   } catch (error) {
  //     console.log('msg?.web_app_data?.data ===>', error);
  //   }
  // }
});

bot.on('polling_error', error => {
  console.log('bot_polling_error', error.message);
});

bot.on('webhook_error', error => {
  console.log('bot_webhook_error', error.message);
});

app.post('/check-chat-content', async (req, res) => {
  //
  // 1. записати в базу даних рядок про те що користувач відправив оголошення
  // 2. перевірити в базі даних останняй запис цього користувача
  // 3. сформувати статистичні дані про розміщені оголошеня і намалювати їх у кабінеті адміністратора
  //
  const { queryId } = req.body;
  console.log(queryId);

  const link = `https://api.telegram.org/bot${token}/getUpdates`; //?chat_id=${channelId}
  console.log(link);

  const result = await bot.getUpdates();

  console.log(result);
  res.status(200).send({ queryId, link, result });
});

app.post('/web-data-sale', async (req, res) => {
  const { title, description, cost, contact, queryId, photoURL } = req.body;
  console.log('inside web-data =====>>>>> ', photoURL);
  // console.log('inside web-data =====>>>>> ');

  // await bot.sendMessage(
  //   channelId,
  //   `\*${title}* \n${description} \n${cost}грн \n${contact}`,
  //   { parse_mode: 'MarkdownV2' } // or HTML
  // );

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

    res.status(200).send({ ...req.body, sendToTelegram: arrayPhoto });
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

app.post('/web-data-buy', async (req, res) => {
  const { title, description, contact, queryId } = req.body;

  const myMessage = `\*${parseSymbolsAndNormalize(
    title
  )}*\n\*Опис:* ${parseSymbolsAndNormalize(
    description
  )}\n\*Зв'язок:* ${parseSymbols(contact)}`;

  try {
    await bot.sendMessage(channelId, myMessage, {
      parse_mode: 'MarkdownV2',
    });

    res.status(200).send({ ...req.body, sendToTelegram: myMessage });
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
