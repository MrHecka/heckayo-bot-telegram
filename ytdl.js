console.log('ytdl.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const fs = require("fs");
const ytdl = require("ytdl-core");
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/ytdl (.+)$/, async (msg, props) => {
    const url = props.match[1];
    const video = ytdl(url, {
      quality: "lowestvideo",
    });
    video.pipe(fs.createWriteStream(`${__dirname}/.ytdl/video.mp4`));
    bot.sendMessage(
      msg.from.id,
      "Sabar lagi persiapan download ngab...",
      { replyToMessage: msg.message_id }
    );
    video.on("info", function (info) {
      bot.sendMessage(msg.chat.id, `Masih loading download...`);
    });
    video.on("end", function () {
      bot.sendMessage(msg.from.id, "LOADING...██████████████]99%\nSabar dikit lagi");
      let vid = `${__dirname}/.ytdl/video.mp4`;
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



bot.getUpate()

