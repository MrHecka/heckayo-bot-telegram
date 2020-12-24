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


await client.get(`statuses/show/${urlregex}`, async function(error, tweets, response) {
  if (!error) {
    let nama = await tweets.user.screen_name
    let deskripsi = await tweets.text
    if(!tweets.toString().includes(`${tweets.extended_entities}`)) {
        return await bot.sendMessage(msg.from.id, `Error | Video tidak ditemukan!`)
    } else if(!tweets.toString().includes(`${tweets.extended_entities.media[0].video_info}`)){
        return await bot.sendMessage(msg.from.id, `Error | Video tidak ditemukan!`)
    } else if (tweets.toString().includes(`${tweets.extended_entities}`)) {
        let media = await tweets.extended_entities.media[0].video_info.variants[0].url
    }
    
    await bot.sendMessage(msg.from.id, `ID Twitter Terdeteksi => ${urlregex}`)
    await bot.sendMessage(msg.from.id, `😎Berhasil Mendapatkan Data Tweet👌\n\nUsername : ${nama}\n\nDeskripsi : ${deskripsi}`)
    return await bot.sendVideo(msg.from.id, `${media}`)

  }else if (error){
    return await bot.sendMessage(msg.from.id, `ERROR | ${error}`)
  }

    }).catch(async(err)=> {
        return await bot.sendMessage(msg.from.id, `ERROR NGAB | ${err}`)
    })
})

}


