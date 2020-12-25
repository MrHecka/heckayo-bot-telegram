console.log('nulis3.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const needle = require('needle')
const _ = require('lodash')
const { isEmpty } = require('lodash')


const bot = new TeleBot({
    token: process.env.TOKEN

})


module.exports = bot => {
    bot.on(/^\/nulis3 ([\s\S]+)/, async (msg, args) => {
    let arg = args.match[1]
    if(arg.length < 10) {
        return bot.sendMessage(msg.chat.id, 'Masukkan teks minimal 10 huruf!')
    }

    let url = 'https://freerestapi-backend-py.herokuapp.com/nulis?text='
    needle(url + arg, async (err, resp, body) => {
        if (_.isEmpty(body) === true) {
        return bot.sendMessage(msg.chat.id, 'Gagal!, coba lagi pelan-pelan...jangan lupa berdoa juga!')
        }
        if (_.isEmpty(body.result) === true) { 
        return bot.sendMessage(msg.chat.id, 'Gagal!, Masukkan teks terlebih dahulu!')
        }
        bot.sendMessage(msg.from.id, 'Sebentar ya ngab...')
        const file = body.result
        const fileOpts = {
        fileName: 'nulis3.jpg',
        contentType: 'image/jpg',
        };
        await delay(2000)
        await bot.sendPhoto(msg.from.id, Buffer.from(file.substr(23), 'base64'), fileOpts);
        await delay(200)
        return await bot.sendMessage(msg.from.id, 'Sukses!😎')

        })
    
    }) 


}







