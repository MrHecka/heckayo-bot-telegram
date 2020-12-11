console.log('lirik.js aktif!');

const TeleBot = require('telebot');
const Genius = new (require("genius-lyrics")).Client(process.env.geniusapi);
const delay = require('delay');
const bot = new TeleBot({
    token: process.env.TOKEN
})


module.exports = bot => {
    bot.on(/^\/lirik (.+)$/, async (msg, args) => {
    
    bot.sendMessage(msg.from.id, 'Tunggu sebentar....')

try {
    let arg = args.match[1]
    const songs = await Genius.songs.search(arg);
    const lyrics = await songs[0].lyrics();
    
    if (lyrics.length > 4095) {
        return bot.sendMessage(msg.from.id, `=====[Lirik Lagu - ${arg}]=====\n\nERROR | LIRIK TERLALU PENJANG!\n\n================`)
} else {
    bot.sendMessage(msg.from.id, `=====[Lirik Lagu - ${arg}]=====\n\n${lyrics.slice(0, 4096)}\n\n=================`)
    return
}

} catch(e) {
       
    return bot.sendMessage(msg.from.id, `Lirik salah atau tidak ditemukan! | ${e}`)
}

    }) 
}





