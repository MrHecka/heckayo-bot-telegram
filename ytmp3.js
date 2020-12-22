console.log('ytmp3.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const fs = require("fs");
const ytdl = require("ytdl-core");
const bot = new TeleBot({
    token: process.env.TOKEN
})

let nama = await Math.floor(Math.random() * Math.floor(1000))

module.exports = bot => {

function sendFile(msg, file){
    msg.reply.file(file)
}

bot.on(/^\/ytmp3 (.+)$/, async (msg, props) => {
  try {
    const text = props.match[1];
    if(!ytdl.validateURL(text)){
        msg.reply.text('Link youtube tidak valid!');
    }
    ytdl.getInfo(text, {filter:"audioonly"}, (err, info) => {
        if (err) throw err;
        msg.reply.text(info);

        // detect kalau file nya udah ada
        if (fs.existsSync(info.title+nama+'.mp3')) {
            sendFile(msg, info.title+nama+'.mp3');
            return;
        }

        msg.reply.text('Starting Download...');
        ytdl(text,{filter:"audioonly"})
        .pipe(fs.createWriteStream(info.title+nama+'.mp3'))
        .on('finish', () => {
            sendFile(msg, info.title+nama+'.mp3');
            fs.unlinkSync(info.title+nama+'.mp3', (error) => console.log(error));
        });
        
        //hapus setelah 24 jam
        setTimeout(fs.unlinkSync, 24*60*60*1000, info.title+'.mp3');
      });
} catch (e) {
    msg.reply.text('Error ngab '+ e);
}
  });
}






