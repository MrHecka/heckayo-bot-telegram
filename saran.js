console.log('saran.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const cooldown = new Set();
const bot = new TeleBot({
    token: process.env.TOKEN
})

// TANGGAL

const options = {
    year: '2-digit', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZone: 'Asia/Jakarta',
    timeZoneName: 'short'
  }
  const formater = new Intl.DateTimeFormat('sv-SE', options)
  const startingDate = new Date()
  
  const dateInNewTimezone = formater.format(startingDate) 
 
// TANGGAL

let idgrup = '-1001256421808'

module.exports = bot => {
    bot.on(/^\/saran ([\s\S]+)/, async (msg, args) => {
    let pesan = `=Saran=\n\nDari :\nNama Depan/Belakang : ${msg.from.first_name} ${msg.from.last_name}\nUsername : ${msg.from.username}\nID : ${msg.from.id}\nDikirim tanggal : ${dateInNewTimezone}\n\nPesan :\n` + args.match[1]

if (cooldown.has(msg.from.id)) {

    return bot.sendMessage(msg.from.id, `Cooldown 1 jam ngab...Tunggu 1 jam lagi baru bisa kirim saran baru🙏`)

    } else {    
        
        await bot.sendMessage(idgrup, pesan)
        await msg.reply.text(`>> Berhasil mengirim saran ke dev (MrHecka)✍️👌\nTerima kasih banyak sudah mengirim saran🙏`)

        cooldown.add(msg.from.id);
        setTimeout(() => {
          cooldown.delete(msg.from.id);
        }, 3600000);
        
        }
        
    })

}



