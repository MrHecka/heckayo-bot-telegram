console.log('igdl.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const userInstagram = require('user-instagram');
const isUrl = require('is-url')

const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {

bot.on(/^\/igdl (.+)$/, async (msg, args) => {

    let arg = await args.match[1]
    if (!isUrl(arg)) {
        return bot.sendMessage(msg.from.id, 'Masukkin link ngab....')
    }

    let regexpicture = await /(?:(?:(?:(?:https?)(?::\/\/))?(?:www\.))?)instagram\.com\/?(?<username>[a-zA-Z0-9_.]{1,30})?\/p\/(?<code>[A-Za-z0-9_\-]+)\/?/
    let getid = await arg.match(regexpicture)[2]
    await bot.sendMessage(msg.from.id, `Link ID Terdeteksi => ${getid}`)

    await userInstagram.getPostData(getid)
    .then(async(res) =>{
    let username = await res.owner.username
    let isverified = await res.owner.isVerified ? '✅ Verified' : '❎ Tidak Verified'
    let name = await res.owner.full_name
    let caption = await res.caption
    let link = await res.link
   
    await bot.sendMessage(msg.from.id, `👤Berhasil Mendapatkan Konten👤\n\nUsername : ${username} ${isverified}\nNama : ${name}\nDeskripsi : ${caption}\n\nLink Postingan : ${link}\n\nEnjoy😎👌`)
    async function igscraper() {

        if(res.childrenPictures[0].displayUrl === undefined) {
            return msg.reply.text('KOSONG TIDAK ADA KONTEN YANG DITEMUKAN!')
        } else if((res.childrenPictures[0].displayUrl) != undefined){
            bot.sendDocument(msg.from.id, (res.childrenPictures[0].displayUrl))
        }
        if(res.childrenPictures[1].displayUrl === undefined) {
            return msg.reply.text('1/10 Konten Ditemukan!')
        } else if(res.childrenPictures[1] != undefined){
            bot.sendDocument(msg.from.id, res.childrenPictures[1].displayUrl)
        }
        if(res.childrenPictures[2] === undefined) {
            return msg.reply.text('2/10 Konten Ditemukan!')
        } else if(res.childrenPictures[2].displayUrl != undefined){
             bot.sendDocument(msg.from.id, res.childrenPictures[2].displayUrl)
        }
        if(res.childrenPictures[3] === undefined) {
            return msg.reply.text('3/10 Konten Ditemukan!')
        } else if(res.childrenPictures[3].displayUrl != undefined){
             bot.sendDocument(msg.from.id, res.childrenPictures[3].displayUrl)
        }
        if(res.childrenPictures[4] === undefined) {
            return msg.reply.text('4/10 Konten Ditemukan!')
        } else if(res.childrenPictures[4].displayUrl != undefined){
             bot.sendDocument(msg.from.id, res.childrenPictures[4].displayUrl)
        }
        if(res.childrenPictures[5] === undefined) {
            return msg.reply.text('5/10 Konten Ditemukan!')
        } else if(res.childrenPictures[5].displayUrl != undefined){
             bot.sendDocument(msg.from.id, res.childrenPictures[5].displayUrl)
        }
        if(res.childrenPictures[6] === undefined) {
            return msg.reply.text('6/10 Konten Ditemukan!')
        } else if(res.childrenPictures[6].displayUrl != undefined){
             bot.sendDocument(msg.from.id, res.childrenPictures[6].displayUrl)
        }
        if(res.childrenPictures[7] === undefined) {
            return msg.reply.text('7/10 Konten Ditemukan!')
        } else if(res.childrenPictures[7].displayUrl != undefined){
             bot.sendDocument(msg.from.id, res.childrenPictures[7].displayUrl)
        }
        if(res.childrenPictures[8] === undefined) {
            return msg.reply.text('8/10 Konten Ditemukan!')
        } else if(res.childrenPictures[8].displayUrl != undefined){
             bot.sendDocument(msg.from.id, res.childrenPictures[8].displayUrl)
        }
        if(res.childrenPictures[9] === undefined) {
            return msg.reply.text('9/10 Konten Ditemukan!')
        } else if(res.childrenPictures[9].displayUrl != undefined) {
             bot.sendDocument(msg.from.id, res.childrenPictures[9].displayUrl)
             msg.reply.text('10/10 Konten Ditemukan!')
        }
    
    }
    
    igscraper()


        }).catch(async(err) => {
            return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)

        })
    
        
  })
}




