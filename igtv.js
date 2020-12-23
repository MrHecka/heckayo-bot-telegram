console.log('igtv.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const userInstagram = require('user-instagram');
const isUrl = require('is-url')
const TinyURL = require('tinyurl')
const InstaClient = new ig()
const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {

bot.on(/^\/igtv (.+)$/, async (msg, args) => {
    
    let arg = await args.match[1]
    if (!isUrl(arg)) {
         return await bot.sendMessage(msg.from.id, 'Masukkin link ngab...')
    }
    let session = await process.env.sesiidig
    await InstaClient.authBySessionId(session)
    let regexigtv = await /(?:(?:(?:(?:https?)(?::\/\/))?(?:www\.))?)instagram\.com\/?(?<username>[a-zA-Z0-9_.]{1,30})?\/tv\/(?<code>[A-Za-z0-9_\-]+)\/?/
    let getid = await arg.match(regexigtv)[2]
    await bot.sendMessage(msg.from.id, `Link ID Terdeteksi => ${getid}`)
    await userInstagram.getPostData(getid)
    .then(async(res) =>{
    let username = await res.owner.username
    let isverified = await res.owner.isVerified ? '✅ Verified' : '❎ Tidak Verified'
    let name = await res.owner.full_name
    let caption = await res.caption
    let link = await res.link
    let igtv = await post.contents[0].url

    await TinyURL.shorten(igtv, async(urligtv) => {
    return await bot.sendMessage(msg.from.id, `👤Berhasil Mendapatkan Konten👤\n\nUsername : ${username} ${isverified}\nNama : ${name}\nDeskripsi : ${caption}\n\nLink Postingan : ${link}\n\nLink Download : ${urligtv}\n\nEnjoy😎👌`)
    

    })

        }).catch(async(err) => {
            return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })

    })

}


