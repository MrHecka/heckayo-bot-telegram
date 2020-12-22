console.log('ytmp3.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const fs = require("fs");
const ytdl = require("ytdl-core");
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/ytmp3 ([\s\S]+)/, async (msg, props) => {
    const url = await props.match[1];
    const video = await ytdl(url, {
      quality: "lowestaudio"
    });
    let nama = await Math.floor(Math.random() * Math.floor(1000))
    await video.pipe(fs.createWriteStream(`${__dirname}/ytmp3${nama}.mp3`));
    await bot.sendMessage(
      msg.from.id,
      "Sabar lagi persiapan download ngab...",
      { replyToMessage: msg.message_id }
    );
    await video.on("info", async function (info) {
      await bot.sendMessage(msg.from.id, 'Sabar ngab...lagi download...')
    });
    await video.on("end", async function () {
      await bot.sendMessage(msg.from.id, "LOADING...██████████████]99%\nSabar dikit lagi");
      let vid = await `${__dirname}/ytmp3${nama}.mp3`;
      let stats = await fs.statSync(vid);
      let fileSizeInBytes = await stats.size;
      var fileSizeInMegabytes = await fileSizeInBytes / (1024 * 1024).toFixed(2);
      if (Number(fileSizeInMegabytes) >= 50) {
        bot.sendMessage(
          msg.chat.id,
          `File video terlalu besar untuk di convert ke mp3....gagal mengirim😢`
        );
      } else {
        bot
          .sendAudio(msg.chat.id, vid, { replyToMessage: msg.message_id })
          .catch((error) => console.log(error));
        fs.unlink(vid, (error) => console.log(error));
      }
    });
  });
}






