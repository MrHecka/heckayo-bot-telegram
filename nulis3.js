console.log('nulis3.js aktif!')

const { spawn, exec } = require('child_process')
const fs = require('fs')
const { stdout } = require('process')
const TeleBot = require('telebot')

const bot = new TeleBot({
    token: process.env.TOKEN

})

module.exports = bot => {
    bot.on(/^\/nulis3 ([\s\S]+)/, async (msg, args) => {
    let tulisan = await args.match[1].trim()
    await bot.sendMessage(msg.from.id, `Sabar ngab lagi nulis....`)
    const splitText = await tulisan.replace(/(\S+\s*){1,8}/g, '$&\n')
    const fixHeight = await splitText.split('\n').slice(0, 31).join('\n')
    await spawn('convert', [
        './nulis/sebelum.jpg',
        '-font',
        './nulis/Indie-Flower.ttf',
        '-size',
        '960x1280',
        '-pointsize',
        '27',
        '-interline-spacing',
        '-6',
        '-annotate',
        '+140+148',
        fixHeight,
        `./nulis/setelah${msg.from.id}.jpg`
    ])
    .on('error', async () => bot.sendMessage(msg.from.id, 'Error ngab, tolong hubungi dev @MrHecka!'))
    .on('exit', async () => {
    await bot.sendPhoto(msg.from.id, `./nulis/setelah${msg.from.id}.jpg`, { caption: 'Sukses😎✍️' })
    return await fs.unlinkSync(`./nulis/setelah${msg.from.id}.jpg`)
        })

    })
    
} 





