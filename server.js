const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors');
// const multer = require('multer');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();

app.use(
  fileupload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

const PORT = process.env.PORT || 3000;
const token = process.env.TOKEN;
const url = 'https://smisyuk4.github.io/sales-telegram-bot-react/';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Заповни форму', {
      reply_markup: {
        inline_keyboard: [[{ text: 'order', web_app: { url } }]],
      },
    });
  }
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/onefile', function (req, res) {
  console.log('req.files ===== >>>> ', req.files);
  try {
    if (!req.files) {
      return res.json({
        status: 'failed',
        message: 'No file',
      });
    }

    let file = req.files.file;
    console.log('req.files', req.files);
    file.mv('./uploads/' + file.name);

    res.send({
      status: 'success',
      message: 'File successfully uploaded',
      data: {
        name: file.name,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// const uploadMultiple = upload.fields([{ name: 'file1' }]);

// app.post('/files', uploadMultiple, function (req, res, next) {
//   if (req.files) {
//     console.log(req.files);
//     console.log('files uploaded');
//   }
// });

app.listen(PORT, function () {
  console.log(`Server running. Use http://localhost:${PORT}/`);
});
