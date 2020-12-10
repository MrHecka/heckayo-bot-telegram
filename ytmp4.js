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
    const video = ytdl(url, {
      quality: "lowestvideo",
    });
    let nama = Math.floor(Math.random() * Math.floor(1000))
    await video.pipe(fs.createWriteStream(`${__dirname}/${nama}.mp4`));
    await bot.sendMessage(
      msg.from.id,
      "Sabar lagi persiapan download ngab...",
      { replyToMessage: msg.message_id }
    );
    await video.on("info", async function (info) {
      bot.sendMessage(msg.chat.id, `Masih loading download...`);
    });
    await video.on("end", async function () {
      bot.sendMessage(msg.from.id, "LOADING...██████████████]99%\nSabar dikit lagi");
      let vid = `${__dirname}/${nama}.mp4`;
      let stats = fs.statSync(vid);
      let fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024).toFixed(2);
      if (Number(fileSizeInMegabytes) >= 50) {
        bot.sendMessage(
          msg.chat.id,
          `File video terlalu besar....gagal mengirim😢`
        );
      } else {
        bot
          .sendVideo(msg.chat.id, vid, { replyToMessage: msg.message_id })
          .catch((error) => console.log(error));
        fs.unlink(vid, (error) => console.log(error));
      }
    });
  });
}






