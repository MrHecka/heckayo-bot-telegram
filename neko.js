console.log('neko.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios')

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(['/neko'], async (msg, args) => {
    const link = 'https://waifu.pics/api/sfw/neko'
    bot.sendMessage(msg.from.id, 'Sedang mencari kucing poi :v....')
    axios.get(link)
    .then(async (res) => {
        let randomneko = `${res.data.url}`
        await msg.reply.photo(randomneko)
        return await bot.sendMessage(msg.from.id, 'KAWAIIIIII😍😍')

    })
    .catch((err) => {
        return bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })
    })
}





