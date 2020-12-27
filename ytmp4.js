console.log('ytmp4.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const fs = require("fs");
const ytdl = require("ytdl-core");
const youtubedl = require('youtube-dl')
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/ytmp4 (.+)$/, async (msg, props) => {
    const url = await props.match[1];
    if(ytdl.validateURL(url)){
      let video_file = await './ytdl/' + 'video' + ytdl.getURLVideoID(url) + '.mp4';
      let videos = await youtubedl(url)
      await videos.on('info', async info => {
        if(info.size > 50000000) {
          return await bot.sendMessage(msg.from.id, 'ERROR | File melebihi 50mb!')
        }
      })
      await msg.reply.text("Sedang mendownload...sabar ngab...");
      await ytdl(url, { quality: "lowestvideo", format: 'mp4', filter: 'audioandvideo' })
        .pipe(fs.createWriteStream(video_file).on('finish', async()=>{
          await msg.reply.text("Sedang mengirim...");
          await msg.reply.video(video_file).then(async()=>{
            await fs.unlinkSync(video_file);
            await msg.reply.text("Berhasil😎👌")
            
          });
          
        }));  
    }
  })
}





