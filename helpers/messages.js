const {
  parseSymbols,
  parseSymbolsAndNormalize,
} = require('../middlewares/parseStringMiddleware');

const myFirstMsg = () => {
  return 'Щоб відкрити додаток треба\n*натиснути на кнопку внизу зліва*';
};

const mySuccessMsg = title => {
  return `Оголошення \*${parseSymbolsAndNormalize(
    title
  )}* опубліковано.\nСподіваємось скоро досягнете своєї мети.\nДякуємо за довіру!`;
};

const myBuyMsg = (title, description, contact) => {
  return `\*${parseSymbolsAndNormalize(
    title
  )}*\n\*Опис:* ${parseSymbolsAndNormalize(
    description
  )}\n\*Зв'язок:* ${parseSymbols(contact)}`;
};

const mySaleMsg = (title, description, cost, contact) => {
  return `\*${parseSymbolsAndNormalize(
    title
  )}*\n\*Опис:* ${parseSymbolsAndNormalize(
    description
  )}\n\*Ціна:* ${cost} грн\n\*Зв'язок:* ${parseSymbols(contact)}`;
};

const myFailMsg = () => {
  return 'Не вийшло відправити оголошення,\n*спробуйте знову*';
};

module.exports = {
  myFirstMsg,
  mySuccessMsg,
  myBuyMsg,
  mySaleMsg,
  myFailMsg,
};
