console.log('logs.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
let fs = require('fs')
let dev = '854756142'

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

    bot.on(['/monitorjsonlogsheckayo00101001'], async (msg, args) => {
        if (msg.from.id.toString().includes(dev)) {
           let readlogs = fs.readFileSync('userlist.json', {encoding:'utf-8'})
           return await bot.sendMessage(msg.from.id, `${readlogs}`)
        } else {
            return bot.sendMessage(msg.from.id, `Maaf kamu bukan dev, aku tidak mengenal mu 🙁`)
        }
    })

}



