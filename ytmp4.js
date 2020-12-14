console.log('ytmp4.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const TinyURL = require('tinyurl')
const bot = new TeleBot({
    token: process.env.TOKEN
})
const url = 'https://st4rz.herokuapp.com/api/ytv2?url='

module.exports = bot => {

bot.on(/^\/ytmp4 (.+)$/, async (msg, args) => {
  const arg = args.match[1]
  bot.sendMessage(msg.from.id, 'Sabar ngab...lagi download...')
  axios
  .get(url + arg)
  .then((res) => {
    TinyURL.shorten(res.data.result, async(urlvideo) => {
    return bot.sendMessage(msg.from.id, `✅Berhasil✅\n\nJudul : ${res.data.title}\n\nLink Download MP4 : ${urlvideo}`)
    
    })
    }).catch((err) => {
      return bot.sendMessage(msg.from.id, `ERROR | ${err}`)

  })
})
}







