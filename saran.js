console.log('saran.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const cooldown = new Set();
const bot = new TeleBot({
    token: process.env.TOKEN
})

let url = `https://api.telegram.org/bot` + process.env.TOKEN + `/sendMessage?chat_id=-1001256421808&text=`

module.exports = bot => {
    bot.on(/^\/saran ([\s\S]+)/, async (msg, args) => {
    let arg = args.match[1]

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

if (cooldown.has(msg.from.id)) {

    return bot.sendMessage(msg.from.id, `Cooldown 1 jam ngab...Tunggu 1 jam lagi baru bisa kirim saran baru🙏`)

    } else {

        axios
        .post(url + `=Saran=\n\nDari : ${msg.from.username}\nID : ${msg.from.id}\nDikirim tanggal : ${dateInNewTimezone}\n\nPesan :\n` + arg)
        .then(async(res)=>{
            await msg.reply.text(`>> Berhasil mengirim saran ke dev (MrHecka)✍️👌\nTerima kasih banyak sudah mengirim saran🙏`)
        }).catch(async(err)=> {
            return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })

        cooldown.add(msg.from.id);
        setTimeout(() => {
          cooldown.delete(msg.from.id);
        }, 3600000);
    }
        
    })

}



