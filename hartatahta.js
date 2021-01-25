console.log('hartatahta.js aktif!')

const { spawn, exec } = require('child_process')
const fs = require('fs')
const { stdout } = require('process')
const TeleBot = require('telebot')

const bot = new TeleBot({
    token: process.env.TOKEN

})

module.exports = bot => {
    bot.on(/^\/hartatahta ([\s\S]+)/, async (msg, args) => {
    let textnyauy = await args.match[1].trim()
    await bot.sendMessage(msg.from.id, `Sabar ngab lagi diproses....`)
    const parel = await textnyauy.replace(/(\S+\s*){1,10}/g, '$&\n')
    const jarot = await 'HARTA\nTAHTA\n' + parel.toUpperCase()
    await spawn('convert', [
                '-gravity',
                'Center',
                '-size',
                '1280x1280',
                'xc:black',
                '-font',
                './nulis/hartatahta.ttf',
                '-pointsize',
                '200',
                '-tile',
                './nulis/gradient.jpg',
                '-annotate',
                '+20+80',
                jarot,
                '-wave',
                '10x175',
                `./nulis/harta${msg.from.id}.jpg`
    ])
    .on('error', async () => bot.sendMessage(msg.from.id, 'Error ngab, tolong hubungi dev @MrHecka!'))
    .on('exit', async () => {
    await bot.sendPhoto(msg.from.id, `./nulis/harta${msg.from.id}.jpg`, { caption: 'Sukses😎✍️' })
    return await fs.unlinkSync(`./nulis/harta${msg.from.id}.jpg`)
        })

    })
    
} 



