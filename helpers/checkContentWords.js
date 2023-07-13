const { forbiddenValues } = require('./forbiddenValues');

const checkContent = arr => {
  if (arr.length <= 0) {
    return;
  }
  const forbWords = forbiddenValues.join('|').toLocaleLowerCase();
  const str = arr.join(' ').toLocaleLowerCase();

  const firstClean = str.replaceAll(/\W/gm, ' ');
  const secondClean = firstClean.replaceAll(/\d+/gm, ' ');
  const thirdClean = secondClean.replaceAll(/\b\w{1,3}\b/gm, ' ');
  const fourthClean = thirdClean.replaceAll(/\s+/gm, ' ');
  const fifthClean = fourthClean.trim();

  const newArr = fifthClean.split(' ');
  const mySet = new Set(newArr);
  const wordsFromImage = [...mySet];

  let triggerWord = null;
  const result = wordsFromImage.some(item => {
    if (item.match(forbWords)) {
      triggerWord = item;
      return true;
    }
  });

  return {
    triggerWord,
    result,
  };
};

module.exports = { checkContent };
