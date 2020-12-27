console.log('ytmp4.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const ytdl = require("ytdl-core");
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/ytmp4 (.+)$/, async (msg, props) => {
    let url = await props.match[1];
    await msg.reply.text('Sabar ngab....')
    await ytdl(url)
    .on('info', async (info) => {
      let judul = await info.videoDetails.title
      let videoid = await info.videoDetails.videoId
      let views = await info.videoDetails.viewCount + ' Views'
      let tglupload = await info.videoDetails.uploadDate
      let like = await info.videoDetails.likes
      let disilike = await info.videoDetails.dislikes
      let linkdownload = await 'https://www.y2mate.com/youtube/' + videoid

      return await bot.sendMessage(msg.from.id, `🗒Berhasil✅\n\nJudul🔤 : ${judul}\nVideo ID🔢 : ${videoid}\nTotal Views👀 : ${views}\nTanggal Upload🗓 : ${tglupload}\nTotal Likes👍 : ${like}\nTotal Dislikes👎 : ${disilike}\n\n⬇️Link Download⬇️ : ${linkdownload}`)

    });
      
  })
}





