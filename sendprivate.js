console.log('sendprivate.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
let dev = '854756142'
const axios = require('axios')


const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(/^\/sendprivate ([\s\S]+)/, async (msg, args) => {
        if (msg.from.id.toString().includes(dev)) {
            let id = args.match[1].split(' ')[0]
            let argz = args.match[1]
            let pesan = argz.slice(id.length + 1)
            let url = `https://api.telegram.org/bot` + process.env.TOKEN + `/sendMessage?chat_id=${id}&text=${pesan}`
            axios
            .post(url)
            .then(async(res)=>{
                await msg.reply.text(`>> Berhasil Mengirim Pesan Ke ID > ${id}\nPesan :\n${pesan}`)
            }).catch(async(err)=> {
                return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
            })
            
        } else {
            return bot.sendMessage(msg.from.id, `Maaf kamu bukan dev, aku tidak mengenal mu 🙁`)
        }
    })

}



