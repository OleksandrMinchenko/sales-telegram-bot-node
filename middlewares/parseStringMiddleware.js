const parseSymbolsAndNormalize = string => {
  const newString = string.toLowerCase();
  const sentenceArr = newString.split('.');

  const goodArr = sentenceArr.filter(value => {
    if (value?.length > 0 && value !== ' ' && value !== '') {
      return true;
    }
  });

  const newStr = goodArr.reduce((previousValue, element, index, array) => {
    const sentence = element.trim();

    const mutationSentence = sentence.replace(
      sentence[0],
      sentence[0]?.toLocaleUpperCase()
    );
    return previousValue + `${mutationSentence}. `;
  }, '');

  return parseSymbols(newStr);
};

const parseSymbols = string => {
  return string
    .replace(/\_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\~/g, '\\~')
    .replace(/\`/g, '\\`')
    .replace(/\>/g, '\\>')
    .replace(/\#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/\!/g, '\\!');
};

module.exports = {
  parseSymbolsAndNormalize,
  parseSymbols,
};
