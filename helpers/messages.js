// https://core.telegram.org/bots/api#markdownv2-style
const {
  normalize,
  parseSymbols,
  parseSymbolsAndNormalize,
} = require('../middlewares/parseStringMiddleware');

const myFirstMsg = () => {
  return 'Щоб відкрити додаток треба\n*натиснути на кнопку внизу зліва*';
};

const mySecondMsg = () => {
  return 'Всі мої можливості містяться у веб додатку,\n*який відкривається кнопкою внизу зліва*';
};

// parse_mode: 'Markdown',
const mySuccessMsg = title => {
  return `Оголошення \*${normalize(
    title
  )}* опубліковано у @kypiprodaiukraine\nСподіваємось скоро досягнете своєї мети.\nДякуємо за довіру!`;
};

// parse_mode: 'MarkdownV2',
const myBuyMsg = (title, description, contact) => {
  return `\*${parseSymbolsAndNormalize(
    title
  )}*\n\*Опис:* ${parseSymbolsAndNormalize(
    description
  )}\n\*Зв'язок:* ${parseSymbols(contact)}`;
};

// parse_mode: 'MarkdownV2',
const mySaleMsg = (title, description, cost, contact) => {
  return `\*${parseSymbolsAndNormalize(
    title
  )}*\n\*Опис:* ${parseSymbolsAndNormalize(
    description
  )}\n\*Ціна:* ${cost} грн\n\*Зв'язок:* ${parseSymbols(contact)}`;
};

// parse_mode: 'Markdown',
const myFailMsg = () => {
  return 'Не вийшло відправити оголошення,\n*спробуйте знову*';
};

module.exports = {
  myFirstMsg,
  mySecondMsg,
  mySuccessMsg,
  myBuyMsg,
  mySaleMsg,
  myFailMsg,
};
