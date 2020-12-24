console.log('twtdl.js aktif!')
const TeleBot = require('telebot')
const delay = require('delay')
var Twitter = require('twitter');
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
bot.on(/^\/twtdl ([\s\S]+)/, async (msg, args) => {
    const arg = await args.match[1]
    await bot.sendMessage(msg.from.id, 'Sebentar ngab....sabar...')


var client = await new Twitter({
  consumer_key: process.env.apitwt,
  consumer_secret: process.env.apisecrettwt,
  access_token_key: process.env.tokentwt,
  access_token_secret: process.env.secrettokentwt
});


let regexid = await /https?:\/\/twitter.com\/[0-9-a-zA-Z_]{1,20}\/status\/([0-9]*)/;
let urlregex = await arg.match(regexid)[1]


await client.get(`statuses/show/${urlregex}`, function(error, tweets, response) {
  if (!error) {
    let nama = tweets.user.screen_name
    let deskripsi = tweets.text
    if(!tweets.toString().includes(`${tweets.extended_entities}`)) {
        return bot.sendMessage(msg.from.id, `Error | Video tidak ditemukan!`)
    } else if(!tweets.toString().includes(`${tweets.extended_entities.media[0].video_info}`)){
        return bot.sendMessage(msg.from.id, `Error | Video tidak ditemukan!`)
    } 
    let media = tweets.extended_entities.media[0].video_info.variants[0].url
    bot.sendMessage(msg.from.id, `ID Twitter Terdeteksi => ${urlregex}`)
    bot.sendMessage(msg.from.id, `😎Berhasil Mendapatkan Data Tweet👌\n\nUsername : ${nama}\n\nDeskripsi : ${deskripsi}`)
    return bot.sendVideo(msg.from.id, `${media}`)
  
    }else if (error){
        return bot.sendMessage(msg.from.id, `ERROR | ${error}`)
  }

        })
    })

}




