// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.SafeSearchAnnotation
// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#likelihood

const { forbiddenValues } = require('../services/forbiddenValues');
const { client } = require('../config/vision');

const visionCheck = async imagePath => {
  let safe,
    label,
    webDesc,
    webMatch,
    attentionWordFirst,
    attentionWordSecond,
    attentionWordThird,
    isPermitted = false,
    isPermittedSafe,
    isPermittedLabel,
    isPermittedWeb,
    isPermittedMatch;

  try {
    const [result] = await client.safeSearchDetection(imagePath);

    safe = result.safeSearchAnnotation;

    const safeValues = Object.values(safe);
    isPermittedSafe = forbiddenValues.some(item => safeValues.includes(item));
  } catch (error) {
    return error.message;
  }

  try {
    // const [labels] = await client.labelDetection(imagePath);
    const requests = {
      image: {
        source: {
          imageUri: imagePath,
        },
      },
      features: [
        {
          maxResults: 100,
          type: 'LABEL_DETECTION',
        },
        {
          maxResults: 100,
          type: 'WEB_DETECTION',
        },
        // {
        //   maxResults: 100,
        //   type: 'SAFE_SEARCH',
        // },
      ],
    };
    const [result] = await client.annotateImage(requests);
    const forbWords = forbiddenValues.join(' | ');
    const regex = new RegExp(forbWords);

    const arrayLabels = result.labelAnnotations;
    label = arrayLabels.map(item => item.description);
    const checkLabel = label.join(', ');
    const findLabel = checkLabel.match(regex);
    attentionWordFirst = findLabel ? findLabel[0] : null;
    isPermittedLabel = findLabel ? true : false;
    console.log('isPermittedLabel', isPermittedLabel);

    const { webEntities, pagesWithMatchingImages } = result.webDetection;
    webDesc = webEntities.map(item => item.description);
    const checkWebDesc = webDesc.join(', ');
    // console.log(checkWebDesc);
    const findWebDesc = checkWebDesc.match(regex);
    // console.log(findWebDesc);

    attentionWordSecond = findWebDesc ? findWebDesc[0] : null;
    isPermittedWeb = findWebDesc ? true : false;
    console.log('isPermittedWeb', isPermittedWeb);

    webMatch = pagesWithMatchingImages.map(item => item.pageTitle);
    const checkWeb = webMatch.join(', ');
    const findMatch = checkWeb.match(regex);
    attentionWordThird = findMatch ? findMatch[0] : null;
    isPermittedMatch = findMatch ? true : false;
    console.log('isPermittedMatch', isPermittedMatch);
  } catch (error) {
    return error.message;
  }

  isPermitted = [
    isPermittedSafe,
    isPermittedLabel,
    isPermittedWeb,
    isPermittedMatch,
  ].includes(true);

  return {
    imageURL: imagePath,
    isPermitted: !isPermitted,
    safe,
    label: attentionWordFirst
      ? [`=========> not correct word =======> ${attentionWordFirst}`, ...label]
      : label,
    webDesc: attentionWordSecond
      ? [
          `=========> not correct word =======> ${attentionWordSecond}`,
          ...webDesc,
        ]
      : webDesc,

    webMatch: attentionWordThird
      ? [
          `=========> not correct word =======> ${attentionWordThird}`,
          ...webMatch,
        ]
      : webMatch,
  };
};

module.exports = {
  visionCheck,
};
