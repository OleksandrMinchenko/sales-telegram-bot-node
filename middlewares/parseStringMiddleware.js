const parseDashes = string => {
  return string.replaceAll(/-/gm, '\\-');
};

const parseDashesAndNormalize = string => {
  const REGEX = /\.\s\w/gm;

  let newString = string.toLowerCase();
  newString.replaceAll(/-/gm, '\\-');

  let mutationString = newString;

  const resultSearch = REGEX.exec(mutationString);
  console.log(resultSearch?.length > 0);

  // while (resultSearch?.length > 0) {
    // console.log('index', resultSearch);
    // console.log('string', newString);

    // console.log(resultSearch[0].toLocaleUpperCase());
    // mutationString = mutationString.replace(
    //   resultSearch[0],
    //   resultSearch[0].toLocaleUpperCase()
    // );
    // console.log(mutationString);
  //   mutationString = 'sdsd'
  // }

  return;
};

module.exports = {
  parseDashes,
  parseDashesAndNormalize,
};
