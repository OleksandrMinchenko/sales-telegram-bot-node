// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.SafeSearchAnnotation
// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#likelihood

const { safeDesc } = require('../helpers/forbiddenValues');
const { checkContent } = require('../helpers/checkContentWords');
const { client } = require('../config/vision');

const visionCheck = async imagePath => {
  let safe,
    label,
    webDesc,
    webMatch,
    triggerWordLabel,
    triggerWordWeb,
    triggerWordMatch,
    isPermitted = false,
    isPermittedSafe,
    isPermittedLabel,
    isPermittedWeb,
    isPermittedMatch;

  try {
    const [result] = await client.safeSearchDetection(imagePath);

    safe = result.safeSearchAnnotation;

    const safeValues = Object.values(safe);
    isPermittedSafe = safeDesc.some(item => safeValues.includes(item));
  } catch (error) {
    return error.message;
  }

  try {
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
    const arrayLabels = result.labelAnnotations;

    if (arrayLabels.length !== 0) {
      label = arrayLabels.map(item => item.description);
      const resultLabel = checkContent(label);
      isPermittedLabel = resultLabel.result;
      triggerWordLabel = resultLabel.triggerWord;
    }

    const { webEntities, pagesWithMatchingImages } = result.webDetection;
    
    if (webEntities.length !== 0) {
      webDesc = webEntities.map(item => item.description);
      const resultWebDesc = checkContent(webDesc);
      isPermittedWeb = resultWebDesc.result;
      triggerWordWeb = resultWebDesc.triggerWord;
    }

    if (pagesWithMatchingImages.length !== 0) {
      webMatch = pagesWithMatchingImages.map(item => item.pageTitle);
      const resultWebMatch = checkContent(webMatch);
      isPermittedMatch = resultWebMatch.result;
      triggerWordMatch = resultWebMatch.triggerWord;
    }
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
    label: triggerWordLabel
      ? [`=========> trigger word =======> ${triggerWordLabel}`, ...label]
      : label,
    webDesc: triggerWordWeb
      ? [`=========> trigger word =======> ${triggerWordWeb}`, ...webDesc]
      : webDesc,

    webMatch: triggerWordMatch
      ? [`=========> trigger word =======> ${triggerWordMatch}`, ...webMatch]
      : webMatch,
  };
};

module.exports = {
  visionCheck,
};
