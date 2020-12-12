console.log('nulis.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const needle = require('needle')
const _ = require('lodash')
const { isEmpty } = require('lodash')


const bot = new TeleBot({
    token: process.env.TOKEN

})




module.exports = bot => {
    bot.on(/^\/nulis (.+)$/, async (msg, args) => {
    let arg = args.match[1].replace(/;/g, '%0a')
    if(arg.length < 10) {
        return bot.sendMessage(msg.chat.id, 'Masukkan teks minimal 10 huruf!')
    }

    let url = 'http://salism3.pythonanywhere.com/write?text='
    needle(url + arg, async (err, resp, body) => {
        if (_.isEmpty(body) === true) {
        return bot.sendMessage(msg.chat.id, 'Gagal!, coba lagi pelan-pelan...jangan lupa berdoa juga!')
        }
        if (_.isEmpty(body.images) === true) { 
        return bot.sendMessage(msg.chat.id, 'Gagal!, Masukkan teks terlebih dahulu!')
        }
        bot.sendMessage(msg.from.id, 'Sebentar ya ngab...')
        await delay(3000)
        msg.reply.photo(`${body.images}`)
        await delay(200)
        return bot.sendMessage(msg.from.id, 'Sukses!😎')

        })
    
    }) 


}







