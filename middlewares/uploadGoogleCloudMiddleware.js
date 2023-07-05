// const multer = require('multer');
// const { VISION_PROJECT_KEY } = require('../middlewares/visionMiddleware');
// require('dotenv').config();

// const BUCKET_PROJECT_KEY = {
//   type: process.env.TYPE,
//   project_id: process.env.PROJECT_ID,
//   private_key_id: process.env.PRIVATE_KEY_ID_BUCKET,
//   private_key: process.env.PRIVATE_KEY_BUCKET,
//   client_email: process.env.CLIENT_MAIL,
//   client_id: process.env.CLIENT_ID,
//   auth_uri: process.env.AUTH_URI,
//   token_uri: process.env.TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
//   client_x509_cert_url: process.env.CLIENT_URL,
//   universe_domain: process.env.UNIVERSE_DOMAIN,
// };

// const credentials = {
//   type: 'service_account',
//   project_id: 'telegram-bot-d339c',
//   private_key_id: '72b57ed755aae3f16344429e42cf30e5d38cb5b0',
//   private_key:
//     '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDN025Kzx3uz5H2\n5NokiclYUkh18+OaQbXBzWlHcyvhHTUlpGJ8vUBgMSmEU3ZRF4ZAJI9RMCvQCyxR\nqxsh99L8voXVPRJbUSZz84UMzL4O21p1AY4ti8xBpR5htsgxaHrOEoFjIIb+KRHV\nvdVraaWXZpbN0pUxzPl33auSRzAk/2OtfIoPDqNgeVs/VY1ByTwJn1jZexyPbqOP\nIf4lTDl9FE3vgnlqJdpkDyS46IDgcHdM1xs2T4pt3r9t5EKukz5wvD6LHcNFzSKA\nefF5r2brJBnLeO+2/9iD3eL+Kkhq1l3FC35FIRePlRZnuCqSyiWOvHstijqz6WYT\nTf7GJHU7AgMBAAECggEAYtiKq6ea/vC1byYJsyluxhlCDk9xu0eaU7fjuvoPFR2z\nQ+AVokU68Nc7Un7In/oVsaE9KKbjK5bqElCDh8UeEN4opLcfJTasKlxFRdff4H+s\nieuUzb/I+K+lDxU6QCwmaefONn5NBitQEt+Han3ClhqhCrh6iP+gwNV2i5nff6w/\nD6xPEzVzKYs9AoMmLa29GzGMXa6pIzbJyPUxNuNsNGtmiUtFpo3baDqjp66VkjVM\n7Ieaj+X2oilnW4PnVDca31ySs2ZgjzGQYb7L5GMYfeF0iPTbrcBrBrGmwxZX+oiC\n7/H3xV/MpNCXfl7kyw9D9eH7HjOP85u+6Pwmy0adEQKBgQD+8El2V9w5HLt0wYsf\n5wJLiT66pzZWv9lSVRTByHIyObmoNjLWQjmU8DJCYURaNIXJtth59T0D6GLG4j7S\n5TMJkeBCZ6/F+rtmM1CLHsiJgQLWCK1gpuQVRrzUPPka3L5jltpNa+nLWyCyvxGv\nV7mUOSqnoN92kyOTC9KUK6726wKBgQDOrsy063b2xspvJEXJjIIMNbxws7XMObS2\nwE4FM9b9WF3yLBCOTmmCFeNmeUfg/aFTfjLr6RarXdwqWX2uBpROmihKukdqQvRs\nuLrpsc7LOCoN0W7OxjhQbtd1hQFG/ZNy8ZeDOaE3Wlga/+cdkOaILKL5/hZ19/vs\nGZExRc2G8QKBgQDqS17YWirUeil1RiJcMWwUi4+Q7verhilt1y96YINC0XZkt1rF\nOpu823r1MnslA7wpA9ezTcTDgKC281qVa3saQmx92tjZ9HKhnGtbT/ExHdXDaroc\nZ4SaYSZNT7QIEfMPh6YdHR4CfD9yxtKz+MVfCaK/58M3MEazb1waPINR/QKBgQCE\npaER2DEwrmLLs97qPLhWN8KqHlxmJv75bzBjnGK1lBovS+KQQnjqmTupz9q25nC8\nkjkCOUVoVEPyFh9YKjbSv5NuamFdLH2MrX6gb5KF0JUE604PfR41WP4FGYi5VBNm\n6PDRspHqYZw8L9LXoeCisusiQNWPfsl7POl3UxJWMQKBgEzIq9AycvWqBiuSswRP\nEU9Hd6fAXVwmtq+ls6pVkbqy4dEuZa6cPbLES2scM7/eGJ5u2I4AvT/J/XjVzj53\n9xsNz22O4CklJmN5LPNAJ/xHp9svm9Sbq60XytBK8QQ7KkQtC7NGyskfne0lt9V7\n/eFc8myW/sVR9jhkinH3//H7\n-----END PRIVATE KEY-----\n',
//   client_email: 'photo-bucket@telegram-bot-d339c.iam.gserviceaccount.com',
//   client_id: '102351075345527440769',
//   auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//   token_uri: 'https://oauth2.googleapis.com/token',
//   auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//   client_x509_cert_url:
//     'https://www.googleapis.com/robot/v1/metadata/x509/photo-bucket%40telegram-bot-d339c.iam.gserviceaccount.com',
//   universe_domain: 'googleapis.com',
// };

// const config = {
//   //   autoRetry: true,
//   //   bucket: process.env.BUCKET_NAME,
//   //   projectId: process.env.PROJECT_ID,
//   //   credentials,
//   // node/middlewares/telegram-bot-d339c-72b57ed755aa.json
//   projectId: 'telegram-bot-d339c',
//   bucket: 'photo-for-sales',
//   keyFilename: './telegram-bot-d339c-72b57ed755aa.json',
//   filename: (req, file, cb) => {
//     cb(null, `./uploads/${Date.now()} - ${file.originalname}`);
//   },
// };

// const uploudGoogleCloud = multer({
//   // storage: multerGoogleStorage.storageEngine(config),
// });

// module.exports = { uploudGoogleCloud };
