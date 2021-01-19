console.log('tebak.js AKTIF!')
let mulai = false
let jawaban = 'kucing oren'
let sedangmain = 1
let sedangmain2 = 1
const delay = require('delay')
const TeleBot = require('telebot')
const bot = new TeleBot({
    token: process.env.TOKEN
})





module.exports = bot => {
    bot.on(/^\/tebak ([\s\S]+)/, async (msg, args) => {
        let arg = args.match[1]
        let jawabancek = false
        if(arg === 'mulai' && sedangmain === 1) {
            var timercool = 60
            jawabancek = false
            mulai = true
            sedangmain++
            bot.sendMessage(msg.from.id, 'Permainan Dimulai, Kamu Diberikan Waktu 1 Menit Untuk Menjawab...')
        } else if(mulai === true && arg === 'mulai' && sedangmain > 1) {
            bot.sendMessage(msg.from.id, 'Mohon Maaf, Saat Ini Permainan Sedang Dimulai...Selesaikan Terlebih Dahulu!')
        }

        if(arg === jawaban && mulai === true) {
            jawabancek = true
            mulai = false
            sedangmain = 1
            sedangmain2 = 1
            timercool = 60
            await bot.sendMessage(msg.from.id, 'Selamat! Jawaban Kamu Benar...')
            } else if (arg !== jawaban && mulai === true && arg !== 'mulai'){
                await bot.sendMessage(msg.from.id, 'SALAH BLOK!')
            }

            
            if (jawabancek === false && mulai === true && sedangmain2 === 1) {
                sedangmain2++
                var myVar = setInterval(myTimer, 1000);
                async function myTimer() {
                    timercool--
                    if (timercool === 30 && mulai === true && jawabancek === false) await bot.sendMessage(msg.from.id, `SISA WAKTU > ${timercool--}`)
                    if (timercool === 10 && mulai === true && jawabancek === false) await bot.sendMessage(msg.from.id, `SISA WAKTU > ${timercool--}`)
                    if (timercool === 3 && mulai === true && jawabancek === false) await bot.sendMessage(msg.from.id, `SISA WAKTU > ${timercool--}`)
                    if (timercool === 2 && mulai === true && jawabancek === false) await bot.sendMessage(msg.from.id, `SISA WAKTU > ${timercool--}`)
                    if (timercool === 1 && mulai === true && jawabancek === false) await bot.sendMessage(msg.from.id, `SISA WAKTU > ${timercool--}`)
                    if (timercool === 0 || jawabancek === true || mulai === false) {
                        await myStopFunction()
                        jawabancek = true
                        mulai = false
                        sedangmain = 1
                        sedangmain2 = 1
                        timercool = 60
                        return await bot.sendMessage(msg.from.id, 'GAME OVER!')
                }
            }
            async function myStopFunction() {
                await clearInterval(myVar);
              }

        }
        
    })
    
}





