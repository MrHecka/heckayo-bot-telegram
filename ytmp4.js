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
      let aac_file = ytdl.getURLVideoID(url) + ".mp4";
      msg.reply.text("Sedang mendownload...sabar ngab...");
      ytdl(url, {quality: "lowestvideo", filter: format => format.container === 'mp4'})
        .pipe(fs.createWriteStream(aac_file).on('finish',()=>{
          msg.reply.text("Sedang mengirim...");
          msg.reply.video(aac_file).then(()=>{
            fs.unlinkSync(aac_file);
            msg.reply.text("Berhasil😎👌")
          });
        }));
    }else{
      msg.reply.text("Video tidak ditemukan...");
    }
  })
}


