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
      const video = ytdl(url, { quality: "lowestvideo", format: 'mp4', filter: 'audioandvideo' })
      const pipe = video.pipe(
        fs.createWriteStream(video_file),
      );
            if (pipe.bytesWritten < 52428800) {
          msg.reply.text("Sedang mengirim...");
          msg.reply.video(video_file).then(()=>{
            fs.unlinkSync(video_file);
            msg.reply.text("Berhasil😎👌")   
        
          });
        } else {
          msg.reply.text('Error | Size video melebihi 50mb')
          fs.unlinkSync(video_file);
        }
    }
  })
}





