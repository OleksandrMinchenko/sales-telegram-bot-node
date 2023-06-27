// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.SafeSearchAnnotation
// https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#likelihood

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyFilename: '../node/routes/vision-project-key.json',
});

const visionCheck = async (
  imagePath,
  { safe: safety, label: description, langSafe }
) => {
  let safe, label;

  try {
    if (description) {
      const [labels] = await client.labelDetection(imagePath);
      const arrayLabels = labels.labelAnnotations;
      label = arrayLabels.map(item => item.description);
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

  return {
    imagePath,
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

// UNLIKELY	Це малоймовірно.
// POSSIBLE	Можливо.
// LIKELY	Це ймовірно.
// VERY_LIKELY	Це дуже ймовірно.
// VERY_UNLIKELY	Це дуже малоймовірно.
// UNKNOWN	Невідома ймовірність.

// "Grass": «Трава»
// "Herb": "Трава"
// "Plant": "Рослина"
// "Hemp family": «Конопельна родина»

// "Chemical compound": «Хімічна сполука»
// "Bread flour": «Хлібне борошно»
// "All-purpose flour" : «Борошно універсальне»
// "Sea salt" : "Морська сіль"
