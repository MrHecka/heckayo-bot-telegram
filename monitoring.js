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

if(msg.from.username != undefined) {
  logger.write(`[${dateInNewTimezone}] - [${msg.from.username} | ${msg.from.id}] > ${msg.text}\n`)
} else if(msg.from.username === undefined) {
  logger.write(`[${dateInNewTimezone}] - [${msg.from.first_name} ${msg.from.last_name} | ${msg.from.id}] > ${msg.text}\n`)
}


    })

}







