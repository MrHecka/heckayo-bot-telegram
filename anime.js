console.log('anime.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

const bot = new TeleBot({
    token: process.env.TOKEN
})


module.exports = bot => {

    bot.on(/^\/anime (.+)$/, async (msg, args) => {
    const arg = args.match[1]
    const search = arg
    kitsu.searchAnime(search).then(async result => {
    
    let anime = result[0]
    msg.reply.photo(`${anime.posterImage.original}`)
    await delay(500)
    bot.sendMessage(msg.from.id, `=[${anime.titles.english ? anime.titles.english : search} | ${anime.showType}]=\n\nDeskripsi: *${anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0]}*\n\n_____________________\n>Nama Anime: ${anime.titles.romaji}\n>Rating Umur: ${anime.ageRating}\n>NSFW?: ${anime.nsfw ? 'Iya' : 'Tidak'}\n>Avg Rating: ${anime.averageRating}\n>Rank by rating: ${anime.ratingRank}\n>Rank by popularitas: ${anime.popularityRank}\n>Jumlah Episode: ${anime.episodeCount ? anime.episodeCount : 'N/A'}`)


        })

    })

}


bot.getUpate()
