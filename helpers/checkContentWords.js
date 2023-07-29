const { forbiddenValues } = require('./forbiddenValues');

const checkContent = arr => {
  if (arr.length === 0) {
    return;
  }
  const str = arr.join(' ').toLocaleLowerCase();
  const firstClean = str.replaceAll(/[^а-яА-Яa-zA-Z]/gm, ' ');
  const secondClean = firstClean.replaceAll(/\d+/gm, ' ');
  const thirdClean = secondClean.replaceAll(/\b\w{1,2}\b/gm, ' ');
  const fourthClean = thirdClean.replaceAll(/\s+/gm, ' ');
  const fifthClean = fourthClean.trim();

  const newArr = fifthClean.split(' ');
  const mySet = new Set(newArr);
  const wordsFromImage = [...mySet];

  let triggerWord = null;
  const result = wordsFromImage.some(item => {
    const resCheck = forbiddenValues.some(regex => {
      if (regex.test(item)) {
        triggerWord = item;
        return true;
      }
    });

    if (resCheck) {
      return true;
    }
  });

  return {
    triggerWord,
    result,
  };
};

module.exports = { checkContent };
