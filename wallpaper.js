console.log('wallpaper.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

    bot.on(['/wallpaper'], async (msg, args) => {
        const link = 'https://source.unsplash.com/random'
        bot.sendMessage(msg.from.id, 'Tunggu sebentar...')
        axios
        .get(link)
        .then(async (result) => {
            await bot.sendPhoto(msg.from.id, result.request.res.responseUrl)
            return await bot.sendMessage(msg.from.id, '😍Enjoy Dengan Wallpaper Barunya!😍')
        })

    })

}


