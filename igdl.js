console.log('igdl.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const ig = require('scraper-instagram')
const isUrl = require('is-url')
const InstaClient = new ig()
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/igdl (.+)$/, async (msg, args) => {

    let arg = await args.match[1]
    if (!isUrl(arg)) {
        return bot.sendMessage(msg.from.id, 'Masukkin link ngab....')
    }
    let session = await process.env.sesiidig
    await InstaClient.authBySessionId(session)
    let regexpicture = await /(?:(?:(?:(?:https?)(?::\/\/))?(?:www\.))?)instagram\.com\/?(?<username>[a-zA-Z0-9_.]{1,30})?\/p\/(?<code>[A-Za-z0-9_\-]+)\/?/
    let getid = await arg.match(regexpicture)[2]
    await bot.sendMessage(msg.from.id, `Link ID Terdeteksi => ${getid}`)

    await InstaClient.getPost(getid)
    .then(async(post) =>{
    let username = await post.author.username
    let verified = await post.author.verified ? '✅ Verified' : '❎ Tidak Verified'
    let name = await post.author.name
    let caption = await post.caption
    let link = await post.link
   
    await bot.sendMessage(msg.from.id, `👤Berhasil Mendapatkan Konten👤\n\nUsername : ${username} ${verified}\nNama : ${name}\nDeskripsi : ${caption}\n\nLink Postingan : ${link}\n\nEnjoy😎👌`)
    async function igscraper() {

        if(post.contents[0] === undefined) {
            return msg.reply.text('KOSONG TIDAK ADA KONTEN YANG DITEMUKAN!')
        } else if(post.contents[0].url != undefined){
            bot.sendDocument(msg.from.id, post.contents[0].url)
        }
        if(post.contents[1] === undefined) {
            return msg.reply.text('1/10 Konten Ditemukan!')
        } else if(post.contents[1].url != undefined){
            bot.sendDocument(msg.from.id, post.contents[1].url)
        }
        if(post.contents[2] === undefined) {
            return msg.reply.text('2/10 Konten Ditemukan!')
        } else if(post.contents[2].url != undefined){
             bot.sendDocument(msg.from.id, post.contents[2].url)
        }
        if(post.contents[3] === undefined) {
            return msg.reply.text('3/10 Konten Ditemukan!')
        } else if(post.contents[3].url != undefined){
             bot.sendDocument(msg.from.id, post.contents[3].url)
        }
        if(post.contents[4] === undefined) {
            return msg.reply.text('4/10 Konten Ditemukan!')
        } else if(post.contents[4].url != undefined){
             bot.sendDocument(msg.from.id, post.contents[4].url)
        }
        if(post.contents[5] === undefined) {
            return msg.reply.text('5/10 Konten Ditemukan!')
        } else if(post.contents[5].url != undefined){
             bot.sendDocument(msg.from.id, post.contents[5].url)
        }
        if(post.contents[6] === undefined) {
            return msg.reply.text('6/10 Konten Ditemukan!')
        } else if(post.contents[6].url != undefined){
             bot.sendDocument(msg.from.id, post.contents[6].url)
        }
        if(post.contents[7] === undefined) {
            return msg.reply.text('7/10 Konten Ditemukan!')
        } else if(post.contents[7].url != undefined){
             bot.sendDocument(msg.from.id, post.contents[7].url)
        }
        if(post.contents[8] === undefined) {
            return msg.reply.text('8/10 Konten Ditemukan!')
        } else if(post.contents[8].url != undefined){
             bot.sendDocument(msg.from.id, post.contents[8].url)
        }
        if(post.contents[9] === undefined) {
            return msg.reply.text('9/10 Konten Ditemukan!')
        } else if(post.contents[9].url != undefined) {
             bot.sendDocument(msg.from.id, post.contents[9].url)
             msg.reply.text('10/10 Konten Ditemukan!')
        }
    
    }
    
    igscraper()


        }).catch(async(err) => {
            return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)

        })
    
        
  })
}