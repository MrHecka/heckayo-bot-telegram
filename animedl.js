console.log('animedl.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const link = 'https://st4rz.herokuapp.com/api/kuso?q='

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

    bot.on(/^\/animedl (.+)$/, async (msg, args) => {
        let arg = args.match[1]
        bot.sendMessage(msg.from.id, 'Sedang mencari anime....')
        axios
        .get(link + `${arg}`)
        .then(async (result) => {

                return bot.sendMessage(msg.from.id, `> Link Download Anime : ${result.data.title} <\n\nInfo Tentang Anime : \n${result.data.info}\n\n> ${result.data.link_dl}\n\nGAS LANGSUNG SIKAT NGAB!`)

        }).catch((err) => {
            console.log(`ERROR | ${err}`)
        })

    })

}




