console.log('ytmp4.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const links = 'https://yaelahdo.herokuapp.com'
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/ytmp4 (.+)$/, async (msg, args) => {
  const arg = args.match[1]
  bot.sendMessage(msg.from.id, 'Sabar ngab...lagi download...')
  axios.get(`${links}/ytvid?URL=${arg}`)
  .then(async (res) => {
    const vid = `${res.data.getVideo}`
    await bot.sendVideo(msg.chat.id, vid, { replyToMessage: msg.message_id })
    return bot.sendMessage(msg.from.id, `✅Berhasil✅ Mengunduh Video Youtube Dengan Judul : ${res.data.titleInfo}`)
  })
  .catch((err) => {
      bot.sendMessage(msg.from.id, `ERROR | ${err}`)
    })
  })
}






