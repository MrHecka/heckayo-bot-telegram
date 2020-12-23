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
    let regexigtv = await /(?:(?:(?:(?:https?)(?::\/\/))?(?:www\.))?)instagram\.com\/?(?<username>[a-zA-Z0-9_.]{1,30})?\/tv\/(?<code>[A-Za-z0-9_\-]+)\/?/
    let getid = await arg.match(regexigtv)[2]
    await bot.sendMessage(msg.from.id, `Link ID Terdeteksi => ${getid}`)
    await InstaClient.getPost(getid)
    .then(async(post) =>{
    let username = await post.author.username
    let verified = await post.author.verified ? '✅ Verified' : '❎ Tidak Verified'
    let name = await post.author.name
    let caption = await post.caption
    let link = await post.link
    let igtv = await post.contents[0].url

    await TinyURL.shorten(igtv, async(urligtv) => {
    return await bot.sendMessage(msg.from.id, `👤Berhasil Mendapatkan Konten👤\n\nUsername : ${username} ${verified}\nNama : ${name}\nDeskripsi : ${caption}\n\nLink Postingan : ${link}\n\nLink Download : ${urligtv}\n\nEnjoy😎👌`)
    

    })

        }).catch(async(err) => {
            return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })

    })

}


