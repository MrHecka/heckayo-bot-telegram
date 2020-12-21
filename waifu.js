console.log('waifu.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios')

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(['/waifu'], async (msg, args) => {
    const link = 'https://waifu.pics/api/sfw/waifu'
    bot.sendMessage(msg.from.id, 'Sedang mencari waifu....')
    axios.get(link)
    .then(async (res) => {
        let randomwaifu = `${res.data.url}`
        await msg.reply.photo(randomwaifu)
        return await bot.sendMessage(msg.from.id, 'KAWAIIIIII😍😍')

    })
    .catch((err) => {
        return bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })
    })
}





