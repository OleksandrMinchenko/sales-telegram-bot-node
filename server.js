const express = require('express');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const { notifyRoutes } = require('./routes/notifyRoute');
const {
  parseSymbols,
  parseSymbolsAndNormalize,
} = require('./middlewares/parseStringMiddleware');

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============== bot
const token = process.env.TOKEN;
const urlReact = process.env.URL_REACT;
const urlNode = process.env.URL_NODE;
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

app.post('/web-data', async (req, res) => {
  const { title, description, cost, contact, queryId } = req.body;
  // console.log('req.body =====> ', req?.body);

  try {
    // await bot.sendMessage(
    //   process.env.CHANNEL_ID,
    //   `\*${title}* \n${description} \n${cost}грн \n${contact}`,
    //   { parse_mode: 'MarkdownV2' } // or HTML
    // );

    const myCaption = `\*${parseSymbolsAndNormalize(title)}*\n\*Опис:* ${parseSymbolsAndNormalize(
      description
    )}\n\*Ціна:* ${cost} грн\n\*Зв'язок:* ${parseSymbols(contact)}`;

    const arrayPhoto = [
      {
        type: 'photo',
        media:
          'https://firebasestorage.googleapis.com/v0/b/rn-imagelibrary.appspot.com/o/girl-2.jpg?alt=media&token=83c9d341-d488-4aaf-b478-2b0dacadd617',
        caption: myCaption,
        parse_mode: 'MarkdownV2',
      },
      {
        type: 'photo',
        media:
          'https://firebasestorage.googleapis.com/v0/b/rn-imagelibrary.appspot.com/o/drags-5.jpg?alt=media&token=4505331d-bc50-4605-b777-04fe0c845dbc',
      },
      {
        type: 'photo',
        media:
          'https://firebasestorage.googleapis.com/v0/b/rn-imagelibrary.appspot.com/o/tiger.jpg?alt=media&token=fdfe21d2-9826-4fd7-a0ab-25d5c6f2e438',
      },
      {
        type: 'photo',
        media:
          'https://rehab-rpc.ru/wp-content/uploads/2020/05/legkiye-narkotiki.jpg',
      },
      {
        type: 'photo',
        media:
          'https://rehab-rpc.ru/wp-content/uploads/2020/05/legkiye-narkotiki.jpg',
      },
    ];

    await bot.sendMediaGroup(process.env.CHANNEL_ID, arrayPhoto);

    res.status(200).send({});
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

  // try {
  //   // await bot.answerWebAppQuery(queryId, {
  //   await bot.answerWebAppQuery(process.env.CHANNEL_ID, {
  //     type: 'article',
  //     id: queryId,
  //     title: 'Дякуємо',
  //     input_message_content: {
  //       message_text: `${title}, ${description}, ${cost}, ${contact}`,
  //     }, //Text of the message to be sent, 1-4096 characters
  //   });

  //   res.status(200).send({});
  // } catch (error) {
  //   console.log('/web-data bot.answerWebAppQuery ===>', error);

  //   await bot.answerWebAppQuery(queryId, {
  //     type: 'article',
  //     id: queryId,
  //     title: 'Не вийшло відправити замовлення',
  //     input_message_content: {
  //       message_text: 'Не вийшло відправити замовлення',
  //     },
  //   });

  //   res.status(500).send({});
  // }
});

// =============== bot

app.use('/', notifyRoutes);

app.use('/', (req, res) => {
  const pathToHomePage = path.join(__dirname, 'index.html');
  res.sendFile(pathToHomePage);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}/`);
});
