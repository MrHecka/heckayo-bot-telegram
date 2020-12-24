console.log('igtv.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const ig = require('scraper-instagram')
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
    let regexigtv = /(?:(?:(?:(?:https?)(?::\/\/))?(?:www\.))?)instagram\.com\/?(?<username>[a-zA-Z0-9_.]{1,30})?\/tv\/(?<code>[A-Za-z0-9_\-]+)\/?/
    let getid = arg.match(regexigtv)[2]
    await bot.sendMessage(msg.from.id, `Link ID Terdeteksi => ${getid}`)
    InstaClient.getPost(getid)
    .then(async(post) =>{
    let username = post.author.username
    let verified = post.author.verified ? '✅ Verified' : '❎ Tidak Verified'
    let name = post.author.name
    let caption = post.caption
    let link = post.link
    let igtv = post.contents[0].url

    TinyURL.shorten(igtv, async(urligtv) => {
    return await bot.sendMessage(msg.from.id, `👤Berhasil Mendapatkan Konten👤\n\nUsername : ${username} ${verified}\n\nNama : ${name}\n\nDeskripsi : ${caption}\n\nLink Postingan : ${link}\n\nLink Download : ${urligtv}\n\nEnjoy😎👌`)
    

    })

        }).catch(async(err) => {
            return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })

    })

}


