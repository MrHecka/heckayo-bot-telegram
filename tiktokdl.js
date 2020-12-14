console.log('tiktokdl.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios')
const links = 'https://yaelahdo.herokuapp.com'

const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
bot.on(/^\/tiktokdl (.+)$/, async (msg, args) => {
    bot.sendMessage(msg.from.id, 'Sedang mendownload....Harap sabar....')
    let arg = args.match[1]
    axios.get(`${links}/tiktok?URL=${arg}`)
    .then(async (res) => {
	    const vid = `${res.data.mp4direct}`
        await bot.sendVideo(msg.chat.id, vid, { replyToMessage: msg.message_id })
        return bot.sendMessage(msg.from.id, `✅Berhasil✅ Mengunduh Video Tiktok Dengan\n\nUsername : ${res.data.nameInfo}\n\nDeskripsi : ${res.data.textInfo}\n\nTanggal Upload : ${res.data.timeInfo}`)
    })
    .catch((err) => {
        bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })
    })

}