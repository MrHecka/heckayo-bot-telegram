console.log('monitoring.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
var fs = require('fs')
var logger = fs.createWriteStream('userlogs.txt', {
  flags: 'a'
})


const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
    bot.on('text', async (msg) => {

let read = await fs.readFileSync('userlist.json', {encoding:'utf-8'})

if(read.toString().includes(`${msg.from.id}`)) {
    return
}

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

logger.write(`[${dateInNewTimezone}] - [${msg.from.username} | ${msg.from.id}] > ${msg}\n`)



    })

}







