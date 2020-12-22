console.log('ytmp3.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const fs = require("fs");
const ytdl = require("ytdl-core");
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/ytmp3 (.+)$/, async (msg, props) => {
    const url = props.match[1];
    if(ytdl.validateURL(url)){
      let aac_file = ytdl.getURLVideoID(url) + ".mp3";
      msg.reply.text("Sedang mendownload...sabar ngab...");
      ytdl(url, {quality: "highestaudio", filter: "audioonly"})
        .pipe(fs.createWriteStream(aac_file).on('finish',()=>{
          msg.reply.text("Sedang mengirim...");
          msg.reply.audio(aac_file).then(()=>{
            fs.unlinkSync(aac_file);
            msg.reply.text("Berhasil😎👌")
          });
        }));
    }else{
      msg.reply.text("Video tidak ditemukan...");
    }
  })
}


