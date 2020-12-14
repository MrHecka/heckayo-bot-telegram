console.log('ytdl.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const TinyURL = require('tinyurl')
const bot = new TeleBot({
    token: process.env.TOKEN
})
const url = 'https://api.i-tech.id/dl/'
const api = process.env.apitech

module.exports = bot => {

bot.on(/^\/ytdl (.+)$/, async (msg, args) => {
  const arg = args.match[1]
  bot.sendMessage(msg.from.id, 'Sabar ngab...lagi download...')
  axios
  .get(url + 'yt?key=' + api + '&link=' + arg)
  .then((result) => {
    if (result.data.code != 200 && result.data.status != 'success') return bot.sendMessage(msg.from.id, `${result.data.pesan} | ERROR (Mungkin karena website API down/MT)`)
    TinyURL.shorten(result.data.url_video, async(urlvideo) => {
    TinyURL.shorten(result.data.url_audio, async(urlaudio) => {
    return bot.sendMessage(msg.from.id, `✅BERHASIL MEMBUAT LINK DOWNLOAD✅ | ${result.data.title}\n\nJudul : ${result.data.title}\n\nDeskripsi : ${result.data.desc}\n\nTotal Durasi : ${result.data.duration} | Menit|Detik\n\nLink Download MP4 (Video) : ${urlvideo}\nLink Download MP3 (Musik) : ${urlaudio}`)
  
    })

  })
}).catch((err) => {
  return bot.sendMessage(msg.from.id, `ERROR | ${err}`)
      
})

})
}






