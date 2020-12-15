console.log('twtdl.js aktif!')
const TeleBot = require('telebot')
const delay = require('delay')
const videoUrlLink = require('video-url-link')
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
bot.on(/^\/twtdl ([\s\S]+)/, async (msg, args) => {
    const arg = args.match[1]
    bot.sendMessage(msg.from.id, 'Sebentar ngab....sabar...')
    videoUrlLink.twitter.getInfo(arg, async(error, info) => {
    if(error){
        bot.sendMessage(msg.from.id, `ERROR | ${error}`)
    }else{
        const url = info.variants[0].url
        await bot.sendVideo(msg.from.id, `${url}`)
        return bot.sendMessage(msg.from.id, 'BERHASIL NGAB😎')
    }
        }).catch ((err) => {
            return bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })
    })
}

