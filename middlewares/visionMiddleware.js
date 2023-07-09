// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.SafeSearchAnnotation
// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#likelihood

const { forbiddenValues } = require('../services/forbiddenValues');
const { client } = require('../config/vision');

const visionCheck = async imagePath => {
  let safe,
    label,
    isPermitted = false,
    isPermittedSafe,
    isPermittedLabel;

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
    console.log('result', result);

    const arrayLabels = result.labelAnnotations;
    const arrayWebDetection = result.webDetection;
    console.log(arrayWebDetection);
    // const arrayLabels = result.labelAnnotations;

    label = arrayLabels.map(item => item.description);
    isPermittedLabel = forbiddenValues.some(item => label.includes(item));
  } catch (error) {
    return error.message;
  }

  isPermitted = [isPermittedSafe, isPermittedLabel].includes(true);

  return {
    imageURL: imagePath,
    isPermitted: !isPermitted,
    safe,
    label,
  };
};

module.exports = {
  visionCheck,
};
