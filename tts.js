console.log('tts.js aktif!');
const TeleBot = require('telebot');
const delay = require('delay');
const googleTTS = require('google-tts-api');
const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
bot.on(/^\/tts ([\s\S]+)/, async (msg, args) => {
    const arg = args.match[1]

    googleTTS
  .getAudioBase64(arg, {
    lang: 'id',
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000,
  })
  .then(async(res) => {

    const tts = res
    const fileOpts = {
    filename: 'tts',
    contentType: 'audio/mp3',
    };

    await bot.sendAudio(msg.from.id, Buffer.from(tts, 'base64'), fileOpts);

  })
  .catch(async(err) => {
      return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
  })
        })
}





