const TeleBot = require('telebot')


const bot = new TeleBot({
    token: process.env.TOKEN
})



bot.on(['/start', '/halo'], (msg) => {
    return bot.sendMessage(msg.from.id, `Hello, ${msg.from.first_name}${msg.from.last_name}!`);
})



bot.start()


