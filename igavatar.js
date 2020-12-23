
console.log('igavatar.js aktif!')
const TeleBot = require('telebot')
const delay = require('delay')
const userInstagram = require("user-instagram");

const bot = new TeleBot({
    token: process.env.TOKEN
})



module.exports = bot => {
bot.on(/^\/igavatar (.+)$/, async (msg, args) => {
    let username = await args.match[1]
    let usernamefix = await username.replace(/@/g, '')
    await bot.sendMessage(msg.from.id, `Sedang mengambil avatar dari username ${usernamefix}`)

await userInstagram(usernamefix)
	.then(async(profile) => {
        await bot.sendDocument(msg.from.id, `${profile.profilePicHD}`)
        return await bot.sendMessage(msg.from.id, `Berhasil mengambil avatar => ${profile.fullName} 😎👌`)
    }).catch(async(err) => {

        return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)

    })


    })

}




