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
    const [labels] = await client.labelDetection(imagePath);
    const arrayLabels = labels.labelAnnotations;

    label = arrayLabels.map(item => item.description);
    isPermittedLabel = forbiddenValues.some(item => label.includes(item));
  } catch (error) {
    return error.message;
  }

  try {
    const [result] = await client.safeSearchDetection(imagePath);

    const detections = result.safeSearchAnnotation;

    const safeValues = Object.values(detections);
    isPermittedSafe = forbiddenValues.some(item => safeValues.includes(item));
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
