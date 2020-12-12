console.log('loli.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios')

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(['/loli'], async (msg, args) => {
    const link = 'https://arugaz.herokuapp.com/api/randomloli'
    bot.sendMessage(msg.from.id, 'Sedang mencari dan mengarungi loli....')
    axios.get(link)
    .then(async (res) => {
        let randomloli = `${res.data.result}`
        await msg.reply.photo(randomloli)
        return bot.sendMessage(msg.from.id, 'KAWAIIIIII😍😍')

    })
    .catch((err) => {
        bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })
    })
}





