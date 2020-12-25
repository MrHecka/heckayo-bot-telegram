console.log('monitoring.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
const fs = require('fs')
var o = {"userlist":[]}

const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
    bot.on('text', async (msg, args) => {

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

    let unik = Math.floor(Math.random() * 1000);
    var obj = {
    kodeunik: unik,
    nama: msg.from.username,
    id: msg.from.id,
    tgl: dateInNewTimezone
    };

    o.userlist.push(obj)

    let data = JSON.stringify(o)
    fs.writeFileSync('userlist.json', data)


    })

}







