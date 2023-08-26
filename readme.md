
# Server side for telegram bot

This is a project that includes a frontend written on React and a backend written on Node.

**Purpose of the service:**
- accept the advertisement data (purchase or sale of goods) from the client and place them in the Telegram channel
- check the text content for the content of prohibited words
- check photo content for the content of prohibited topics
- take money for placing an ad in the channel (not implemented)


## Demo
- [telegram bot](https://t.me/dev_test_july_bot)
- [telegram test channel](https://t.me/dev_test_july_bot)



## Screenshots from channel

![App Screenshot](https://i.ibb.co/KwqTfXF/2023-08-03-23-44-25.png)

![App Screenshot](https://i.ibb.co/SrchJDH/2023-08-03-23-45-39.png)

## Installation

My project runs on two servers:
- the first for development and tests [Render](https://dashboard.render.com/)
- the second for production [Engine App - Google Cloud](https://cloud.google.com/appengine)

1. To start the Render server, a docker file has already been added to the project, so all that remains is to create a new application on the site:

- ![App Screenshot](https://i.ibb.co/Qmrhxbv/2023-08-03-23-54-50.png)

connect the repository so that the code is automatically updated:
- ![App Screenshot](https://i.ibb.co/20zH1JD/2023-08-03-23-55-34.png)

and add secret keys:
- ![App Screenshot](https://i.ibb.co/Qp7RyVH/2023-08-03-23-59-07.png)


```bash
######## bot
TOKEN=******

######## telegram
CHANNEL_ID=******

######## firebase
COLLECTION=testUsers

######## cloud server
PORT=8080

######### vision, cloud server, cloud storage, firebase
BUCKET_NAME=******
TYPE=service_account
PROJECT_ID=******
PRIVATE_KEY_ID=******
PRIVATE_KEY= "******"
CLIENT_EMAIL=******
CLIENT_ID=******
AUTH_URI=https://accounts.google.com/o/oauth2/auth
TOKEN_URI=https://oauth2.googleapis.com/token
AUTH_PROVIDER=https://www.googleapis.com/oauth2/v1/certs
CLIENT_URL=******
UNIVERSE_DOMAIN=googleapis.com
```

**TELEGRAM**
- To get the bot token, you need to register it in the [bot phaser](https://t.me/BotFather)
![App Screenshot](https://i.ibb.co/XJKSB6n/2023-08-04-00-25-06.png)
- You need to add the bot to the channel with administrator rights.
- [To get the channel ID](https://github.com/GabrielRF/telegram-id#web-channel-id), you need to create a link `https://api.telegram.org/bot<token>/sendMessage?chat_id=<channel_name>&text=helo_my_friends` from the bot token and name channel then send it in the browser. Information will be returned:
- ![App Screenshot](https://i.ibb.co/9t1JRYK/2023-08-04-00-28-27.png)


**GOOGLE SERVICES**
- vision api
- bucket
- firebase
First, you need to create a project and add a payment card to it, otherwise there is no way.

- Then we go to the search for services and look for a `vision`:
![App Screenshot](https://i.ibb.co/b7f4c73/2023-08-04-00-35-16.png)

- activate it:
![App Screenshot](https://i.ibb.co/gWTvCWd/2023-08-04-00-34-59.png)

- сreate a set of keys for future connections to Google Cloud:

- ![App Screenshot](https://i.ibb.co/J2wB04Y/2023-08-04-00-40-45.png)

- ![App Screenshot](https://i.ibb.co/r4xDT6G/2023-08-04-00-43-06.png)

- ![App Screenshot](https://i.ibb.co/frbMcqj/2023-08-04-00-46-30.png)

- ![App Screenshot](https://i.ibb.co/XFT0ntx/2023-08-04-00-48-28.png)

- ![App Screenshot](https://i.ibb.co/zrSZrSh/2023-08-04-00-52-52.png)

- Then create a bucket for storing photos. We only need it for a couple of minutes as a transit point.

- ![App Screenshot](https://i.ibb.co/DVqTd6f/2023-08-04-00-55-21.png)

- fill out the creation form (payment card must be attached):
```bash
.env

BUCKET_NAME=photo-for-sales-chanel

```
- ![App Screenshot](https://i.ibb.co/yQJQkXn/2023-08-04-00-58-53.png)

- make public access:
- ![App Screenshot](https://i.ibb.co/gTHp0nB/2023-08-05-18-12-37.png)
- ![App Screenshot](https://i.ibb.co/gw2t3bx/2023-08-05-18-15-50.png)



- add a rule to automatically delete photos:
![App Screenshot](https://i.ibb.co/n7vtCfK/2023-08-04-01-05-18.png)

**Errors**
- if an error appears in the console related to the permission to view the bucket, then it must be created in manual mode
- ![App Screenshot](https://i.ibb.co/hFHFpKL/2023-08-05-20-30-29.png)
- ![App Screenshot](https://i.ibb.co/mqprVnK/2023-08-05-20-31-18.png)


- Firebase is needed to store announcements from clients in the database for further analysis by the administrator. Choose a plan and server location. Then the database will be connected to the previous keys
- ![App Screenshot](https://i.ibb.co/wKCbz1x/2023-08-04-01-19-13.png)

2. To deploy on the [APP Engine](https://levelup.gitconnected.com/how-to-deploy-your-node-js-app-with-google-2cd3771d5b21), you need to create another file `app.yaml` with secret keys and add the Google Cloud package manager

```bash
runtime: nodejs16

env_variables:
######## bot
 TOKEN: '*********'

######## telegram
 CHANNEL_ID: '*********'

######## firebase
 COLLECTION: 'users'

######## cloud server
 PORT: '8080'

######## vision, cloud server, cloud storage, firebase
 BUCKET_NAME: '*********'
 TYPE: 'service_account'
 PROJECT_ID: '*********'
 PRIVATE_KEY_ID: '*********'
 PRIVATE_KEY: "*********"
 CLIENT_EMAIL: '*********'
 CLIENT_ID: '*********'
 AUTH_URI: 'https://accounts.google.com/o/oauth2/auth'
 TOKEN_URI: 'https://oauth2.googleapis.com/token'
 AUTH_PROVIDER: 'https://www.googleapis.com/oauth2/v1/certs'
 CLIENT_URL: '*********'
 UNIVERSE_DOMAIN: 'googleapis.com'
 ```

- create project on APP Engine, choose server:

- ![App Screenshot](https://i.ibb.co/KLgLsjF/2023-08-04-01-34-21.png)

- [video manual](https://www.youtube.com/watch?v=HgpCjChgjoQ&ab_channel=DavidWeiss)

- [install python on PC](https://www.python.org/downloads/macos/)

- [instal google cloud sdk](https://cloud.google.com/sdk/docs/install-sdk)

- check script in package.json: `"start": "node server.js"`
- send code to google side: `gcloud app deploy`
## Documentation and articles about telegram

- [setWebHook](https://github.com/yagop/node-telegram-bot-api/blob/master/examples/webhook/express.js)
- [Telegram only supports HTTPS connections to WebHooks](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#webhooks)
- [Using self-signed certificates](https://core.telegram.org/bots/self-signed/)
- [Marvin's Marvellous Guide to All Things Webhook](https://core.telegram.org/bots/webhooks)
- [listen multiple bot](https://github.com/yagop/node-telegram-bot-api/issues/446)
- [getUpdates](https://core.telegram.org/bots/api#getupdates)

- [bots/webapps](https://core.telegram.org/api/bots/webapps)
- [bots/payments](https://core.telegram.org/bots/payments)

- check if your bot has a certificate: `https://api.telegram.org/bot_____my_token_____/getWebhookInfo`
no:
![no](https://i.ibb.co/7xfv0gZ/2023-07-01-02-54-50.png)
yes:
![yes](https://i.ibb.co/YhqJGTZ/2023-07-01-02-54-21.png)
- install a certificate on your bot: `https://api.telegram.org/bot_____my_token_____/setWebhook?url=_____my_site_deploy_____`
set:
![set](https://i.ibb.co/QnCKLR3/2023-07-01-02-54-13.png)

remove a certificate on your bot: `https://api.telegram.org/bot${token}/setWebhook`

**send message**

- [Formatting options text (MarkdownV2 style)](https://core.telegram.org/bots/api#formatting-options)

**send file**

- [send photo](https://core.telegram.org/bots/api#sendphoto)
- [sending files](https://core.telegram.org/bots/api#sending-files)

- [sending message in telegram bot with images](https://stackoverflow.com/questions/37860889/sending-message-in-telegram-bot-with-images)
- [send photo](https://telegram-bot-sdk.readme.io/reference/sendphoto)
- [sending images and more with Telegram bot](https://dev.to/rizkyrajitha/sending-images-and-more-with-telegram-bot-4c0h)

**sendMediaGroup**
- [sendmediagroup](https://core.telegram.org/bots/api#sendmediagroup)
- [sending Photos and Photo Album in a Telegram Bot](https://www.youtube.com/watch?v=Y2vrJrZDBks&ab_channel=CodewithIbrahim)
- [sendmediagroup in postman](https://stackoverflow.com/questions/62907838/telegram-bot-sendmediagroup-in-postman-json-serialized-array)

- [how to send telegram mediaGroup with caption/text](https://stackoverflow.com/questions/58893142/how-to-send-telegram-mediagroup-with-caption-text)

- [cache_time](https://core.telegram.org/bots/api#answercallbackquery)
## Documentation and articles about google services

**Vision Api**

- [documentation](https://googleapis.dev/nodejs/vision/latest/v1.ImageAnnotatorClient.html)

**multer and google cloud**

- [npm](https://github.com/arozar/multer-google-storage)
- [storage-create-bucket-console](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console)

**deploy from github to coogle cloud**

- https://stackoverflow.com/questions/41308888/deploy-to-google-app-engine-via-a-github-repo
- https://github.com/marketplace/actions/deploy-to-app-engine
- https://docs.cloudbees.com/docs/cloudbees-codeship/latest/basic-continuous-deployment/deployment-to-google-app-engine

**google cloud storage**
- [nodejs-storage](https://github.com/googleapis/nodejs-storage)
- [google-cloud-storage-and-node-js](https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876)
- [gsutil](https://cloud.google.com/storage/docs/sliced-object-downloads#gsutil-sod)
- [image-processing](https://cloud.google.com/run/docs/tutorials/image-processing)
- [How to Upload a File to Google Cloud Storage in Node.js](https://www.youtube.com/watch?v=pGSzMfKBV9Q&t=4s&ab_channel=BenAwad)
- [rename file for multer.memoryStorage](https://stackoverflow.com/questions/65529221/how-to-change-a-file-originalname-in-multer)

**other docs and articles**

- [express.json() and express.urlencoded()](https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded)
- [number-of-labels](https://stackoverflow.com/questions/45259002/google-cloud-vision-api-detects-different-number-of-labels)
- [Detect Labels, Faces, and Landmarks in Images with the Cloud Vision API](https://www.cloudskillsboost.google/focuses/1841?parent=catalog)
- [node-lemmatizer](https://www.npmjs.com/package/node-lemmatizer)
- [Password hashing in Node.js with bcrypt](https://blog.logrocket.com/password-hashing-node-js-bcrypt/)
- [listener 'new_chat_members'](https://github.com/telegraf/telegraf/discussions/1488)
- [listener events](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#events)

**parse string**
- [corse error by special symbols](https://stackoverflow.com/questions/40626896/telegram-does-not-escape-some-markdown-characters)
- [exec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#examples)
- [regex](https://regex101.com/)

- https://www.npmjs.com/package/node-telegram-bot-api
- https://www.npmjs.com/package/cors
- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/nodemon
- https://www.npmjs.com/package/dotenv