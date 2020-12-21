console.log('waifu.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios')

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(['/waifu'], async (msg, args) => {
    const link = await 'https://waifu.pics/api/sfw/waifu'
    await bot.sendMessage(msg.from.id, 'Sedang mencari waifu....')
    await axios.get(link)
    .then(async (res) => {
        let randomwaifu = await `${res.data.url}`
        await bot.sendPhoto(msg.from.id, `${randomwaifu}`)
        return await bot.sendMessage(msg.from.id, 'KAWAIIIIII😍😍')

    })
    .catch(async(err) => {
        return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })
    })
}





