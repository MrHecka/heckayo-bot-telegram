console.log('animedl.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const bot = new TeleBot({
    token: process.env.TOKEN
})




module.exports = bot => {

    bot.on(/^\/pasangan (.+)$/, async (msg, args) => {

        const arg1 = args.match[1].split(' ')[0]
        const arg2 = args.match[1].split(' ')[1]
        const link = `https://arugaz.herokuapp.com/api/jodohku?nama=${arg1}&pasangan=${arg2}`
        bot.sendMessage(msg.from.id, `Tunggu sebentar....sedang mengukur kesetiaanmu dan mencari sisi negatif/positif kamu berpasangan dengan ${arg2}`)
        axios
        .get(link)
        .then (async(result) => {
            await delay(200)
            await bot.sendPhoto(msg.from.id, result.data.gambar)
            return bot.sendMessage(msg.from.id, `Namamu : ${result.data.nama}\nNama Pasanganmu : ${result.data.pasangan}\n\nSisi Positif Kamu Berpasangan Dengan ${result.data.pasangan} : ${result.data.positif}\n\nSisi Negatif Kamu Berpasangan Dengan ${result.data.pasangan} : ${result.data.negatif}\n\n😍😍🥰🥰😘😘`)
        }).catch ((err) => {
            return bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })

    })

}



