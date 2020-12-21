console.log('cewecans.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios')
const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
    bot.on(['/cewecans'], async (msg, args) => {
        bot.sendMessage(msg.from.id, 'Sabar ngab...')
        var items = await ["ullzang girl", "cewe cantik", "hijab cantik", "korean girl", "remaja cantik", "cewek korea", "cewek jepang", "russian girl"]
        var cewe = await items[Math.floor(Math.random() * items.length)];
        var url = await 'https://api.fdci.se/rep.php?gambar=' + cewe
        await axios.get(url)
        .then(async(res) => {
            let acakcecan = await res.data[Math.floor(Math.random() * res.data.length )]
            await bot.sendPhoto(msg.from.id, `${acakcecan}`)
            return await bot.sendMessage(msg.from.id, `🥺Haloo ${msg.from.username}👋, 🤝Salam Kenal😘🥰😍`)
        }).catch(async(err)=> {
            return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })

    })
}

