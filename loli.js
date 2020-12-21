console.log('loli.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios')

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(['/loli'], async (msg, args) => {
    const link = await 'https://arugaz.herokuapp.com/api/randomloli'
    await bot.sendMessage(msg.from.id, 'Sedang mencari dan mengarungi loli....')
    await axios.get(link)
    .then(async (res) => {
        let randomloli = await `${res.data.result}`
        await bot.sendPhoto(msg.from.id, `${randomloli}`)
        return await bot.sendMessage(msg.from.id, 'KAWAIIIIII😍😍')

    })
    .catch(async(err) => {
        return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })
    })
}




