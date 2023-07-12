# sales-telegram-bot-node

- [setWebHook](https://github.com/yagop/node-telegram-bot-api/blob/master/examples/webhook/express.js)
- [Telegram only supports HTTPS connections to WebHooks](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#webhooks)
- [Using self-signed certificates](https://core.telegram.org/bots/self-signed/)
- [Marvin's Marvellous Guide to All Things Webhook](https://core.telegram.org/bots/webhooks)
- [listen multiple bot](https://github.com/yagop/node-telegram-bot-api/issues/446)

- [bots/webapps](https://core.telegram.org/api/bots/webapps)
- [bots/payments](https://core.telegram.org/bots/payments)

- перевірити наявність сертифікату у свого бота
- `https://api.telegram.org/bot_____my_token_____/getWebhookInfo`
- [no](https://i.ibb.co/7xfv0gZ/2023-07-01-02-54-50.png)
- [yes](https://i.ibb.co/YhqJGTZ/2023-07-01-02-54-21.png)
- встановити сертифікат на свого бота
- `https://api.telegram.org/bot_____my_token_____/setWebhook?url=_____my_site_deploy_____`
- [set](https://i.ibb.co/QnCKLR3/2023-07-01-02-54-13.png)

- https://www.npmjs.com/package/node-telegram-bot-api
- https://www.npmjs.com/package/cors
- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/nodemon
- https://www.npmjs.com/package/dotenv

# send message

- [fomating text](https://core.telegram.org/bots/api#formatting-options)

# send file

- https://core.telegram.org/bots/api#sendphoto
- https://core.telegram.org/bots/api#sending-files

- https://stackoverflow.com/questions/37860889/sending-message-in-telegram-bot-with-images
- https://telegram-bot-sdk.readme.io/reference/sendphoto
- https://dev.to/rizkyrajitha/sending-images-and-more-with-telegram-bot-4c0h

- `sendMediaGroup`
- https://core.telegram.org/bots/api#sendmediagroup
- https://www.youtube.com/watch?v=Y2vrJrZDBks&ab_channel=CodewithIbrahim
- https://stackoverflow.com/questions/62907838/telegram-bot-sendmediagroup-in-postman-json-serialized-array

# How to send telegram mediaGroup with caption/text

- https://stackoverflow.com/questions/58893142/how-to-send-telegram-mediagroup-with-caption-text

# How deploy to google cloud

- [article](https://levelup.gitconnected.com/how-to-deploy-your-node-js-app-with-google-2cd3771d5b21)
- [video](https://www.youtube.com/watch?v=HgpCjChgjoQ&ab_channel=DavidWeiss)
- [install phyton](https://www.python.org/downloads/macos/)
- [instal google cloud sdk](https://cloud.google.com/sdk/docs/install-sdk)
- [add config file - app.yaml](https://cloud.google.com/appengine/docs/flexible/reference/app-yaml?hl=en&tab=python)
- `runtime: nodejs16`
- send code to google side: `gcloud app deploy`
- check script in package.json: `"start": "node server.js"`

# Vision Api

- [documentation](https://googleapis.dev/nodejs/vision/latest/v1.ImageAnnotatorClient.html)

# multer and google cloud

- [npm](https://github.com/arozar/multer-google-storage)
- [storage-create-bucket-console](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console)

# deploy from github to coogle cloud

- https://stackoverflow.com/questions/41308888/deploy-to-google-app-engine-via-a-github-repo
- https://github.com/marketplace/actions/deploy-to-app-engine
- https://docs.cloudbees.com/docs/cloudbees-codeship/latest/basic-continuous-deployment/deployment-to-google-app-engine

# parse string
- [corse error by special symbols](https://stackoverflow.com/questions/40626896/telegram-does-not-escape-some-markdown-characters)
- [exec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#examples)
- [regex](https://regex101.com/)

# google cloud storage
- [nodejs-storage](https://github.com/googleapis/nodejs-storage)
- [google-cloud-storage-and-node-js](https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876)
- [gsutil](https://cloud.google.com/storage/docs/sliced-object-downloads#gsutil-sod)
- [image-processing](https://cloud.google.com/run/docs/tutorials/image-processing)
- [video](https://www.youtube.com/watch?v=pGSzMfKBV9Q&t=4s&ab_channel=BenAwad)
- [rename file for multer.memoryStorage](https://stackoverflow.com/questions/65529221/how-to-change-a-file-originalname-in-multer)

# other docs and articles
- [react-loader](https://mhnpd.github.io/react-loader-spinner/docs/components/mutating-dots/)
- [express.json() and express.urlencoded()](https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded)
- [number-of-labels](https://stackoverflow.com/questions/45259002/google-cloud-vision-api-detects-different-number-of-labels)
- [Detect Labels, Faces, and Landmarks in Images with the Cloud Vision API](https://www.cloudskillsboost.google/focuses/1841?parent=catalog)