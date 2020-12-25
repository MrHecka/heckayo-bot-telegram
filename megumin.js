console.log('megumin.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios')

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(['/megumin'], async (msg, args) => {
    const link = await 'https://waifu.pics/api/sfw/megumin'
    await bot.sendMessage(msg.from.id, 'Sabar ngab...')
    await axios.get(link)
    .then(async (res) => {
        let randommegumin = await `${res.data.url}`
        await bot.sendPhoto(msg.from.id, `${randommegumin}`)
        return await bot.sendMessage(msg.from.id, 'KAWAIIIIII😍😍')

    })
    .catch(async(err) => {
        return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })
    })
}




