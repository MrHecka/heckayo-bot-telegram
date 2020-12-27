console.log('rangkum.js AKTIF!')
const summarizer = require('text-summarisation')
const TeleBot = require('telebot')
const delay = require('delay')
const bot = new TeleBot({
    token: process.env.TOKEN
})


module.exports = bot => {
    bot.on(/^\/rangkum ([\s\S]+)/, async (msg, args) => {
        let arg = args.match[1]
        bot.sendMessage(msg.from.id, 'Sedang merangkum....')

        const result = summarizer(arg)
        summarizer(arg, { sentences: 5 }).then(async result => await bot.sendMessage(msg.from.id, `===[Hasil Rangkuman]===\n\n${result}`))
        .catch((err) => {
            return bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })

    })
}

