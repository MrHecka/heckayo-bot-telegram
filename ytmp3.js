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
    const url = await props.match[1];
    if(ytdl.validateURL(url)){
      let audio_file = await './ytdl/' + ytdl.getURLVideoID(url) + '.mp4';
      await msg.reply.text("Sedang mendownload...sabar ngab...");
      await ytdl(url, {quality: "highestaudio", filter: "audioonly"})
        .pipe(fs.createWriteStream(audio_file).on('finish', async ()=>{
          await msg.reply.text("Sedang mengirim...");
          await msg.reply.audio(audio_file).then(async ()=>{
            await fs.unlinkSync(audio_file);
            await msg.reply.text("Berhasil😎👌")
          });
        }));
    }else{
      await msg.reply.text("Error | Video tidak ditemukan...");
    }
  })
}


