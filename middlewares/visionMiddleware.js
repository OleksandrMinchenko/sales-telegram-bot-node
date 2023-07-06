// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.SafeSearchAnnotation
// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#likelihood

const { forbiddenValues } = require('../services/forbiddenValues');
const { client } = require('../config/vision');

const visionCheck = async (
  imagePath,
  { safe: safety, label: description, langSafe }
) => {
  console.log('imagePath', imagePath);

  let safe,
    label,
    isPermitted = false,
    isPermittedSafe,
    isPermittedLabel;

  try {
    if (description) {
      const [labels] = await client.labelDetection(imagePath);
      const arrayLabels = labels.labelAnnotations;

      label = arrayLabels.map(item => item.description);
      isPermittedLabel = forbiddenValues.some(item => label.includes(item));
    }
  } catch (error) {
    return error.message;
  }

  try {
    if (safety) {
      const [result] = await client.safeSearchDetection(
        imagePath
        //   'https://firebasestorage.googleapis.com/v0/b/telegram-bot-d339c.appspot.com/o/photo%2Fjune%2F1687848306874-girl-avatar.jpg?alt=media&token=01ee4688-cb50-406b-be07-282c9cb6eef2'
        // '../node/uploads/1687845345797 - girl-avatar.jpg'
        // '../node/uploads/porno.png'
      );

      const detections = result.safeSearchAnnotation;

      const safeValues = Object.values(detections);
      isPermittedSafe = forbiddenValues.some(item => safeValues.includes(item));

      if (langSafe === 'ua') {
        safe = {
          'Для дорослих': translate(detections.adult),
          'Медичне зображення': translate(detections.medical),
          'Насильницький вміст': translate(detections.violence),
          'Непристойний вміст': translate(detections.racy),
        };
      }

      if (langSafe !== 'ua') {
        safe = {
          adult: detections.adult,
          medical: detections.medical,
          violence: detections.violence,
          racy: detections.racy,
        };
      }
    }
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

const translate = value => {
  let ua;

  switch (value) {
    case 'UNLIKELY':
      ua = 'Малоймовірно';
      break;

    case 'POSSIBLE':
      ua = 'Можливо';
      break;

    case 'LIKELY':
      ua = 'Ймовірно';
      break;

    case 'VERY_LIKELY':
      ua = 'Дуже ймовірно';
      break;

    case 'VERY_UNLIKELY':
      ua = 'Дуже малоймовірно';
      break;

    case 'UNKNOWN':
      ua = 'Невідома ймовірність';
  }

  return ua;
};

module.exports = {
  visionCheck,
};
