console.log('igstory.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const ig = require('scraper-instagram')
const { isInteger } = require('lodash')

const InstaClient = new ig()
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/igstory ([\s\S]+)/, async (msg, args) => {

    let nomor = await args.match[1].split(' ')[0]
    let username = await args.match[1].split(' ')[1]
    let usernamefix = await username.replace(/@/g, '')
    let session = await process.env.sesiidig
    
    if(nomor > 100) {
        return bot.sendMessage(msg.from.id, 'Kelebihan ngab...Maksimal = 100')
    }

    if(nomor < 1) {
        return bot.sendMessage(msg.from.id, 'Error ngab...Masukkin angka urutan story nya!')
    }

    if(isNaN(nomor)) {
        return bot.sendMessage(msg.from.id, 'Masukkin urutan nomor ig story nya ngab! [Contoh : /igstory 1 anone14_]')
    }

    await InstaClient.authBySessionId(session)
    await bot.sendMessage(msg.from.id, `Sedang mengambil story urutan ke ${nomor} dari username => ${usernamefix}`)

    await InstaClient.getProfileStory(usernamefix)
    .then(async(story) => {

    await bot.sendDocument(msg.from.id, story.items[nomor - 1].url)
    return await bot.sendMessage(msg.from.id, `Berhasil Mengambil Story Urutan Ke ${nomor} Dari IG Story => ${usernamefix} 😎👌`)    
        

    }).catch(async(err) => {
        return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
}) 

   
        })
}







