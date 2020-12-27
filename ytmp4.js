console.log('ytmp4.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const fs = require("fs");
const ytdl = require("ytdl-core");
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/ytmp4 (.+)$/, async (msg, props) => {
    const url = props.match[1];
    if(ytdl.validateURL(url)){
      let video_file = ytdl.getURLVideoID(url) + '.mp4';
      msg.reply.text("Sedang mendownload...sabar ngab...");
      ytdl(url, { quality: "lowestvideo", format: 'mp4', filter: 'audioandvideo' })
        .pipe(fs.createWriteStream(video_file).on('finish',()=>{
          msg.reply.text("Sedang mengirim...");
          msg.reply.video(video_file).then(()=>{
            fs.unlinkSync(video_file);
            msg.reply.text("Berhasil😎👌")
          });
        }));
    }else{
      msg.reply.text("Error | Video tidak ditemukan...");
    }
  })
}


