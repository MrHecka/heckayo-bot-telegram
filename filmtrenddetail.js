console.log('filmtrend.js AKTIF!')
const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
    bot.on(/^\/filmdetail ([\d\D]+)/, async (msg, args) => {
    let arg = args.match[1]
	const url = 'https://api.themoviedb.org'	
	const apitmdb = process.env.apikeytmdb	
    
    if(isNaN(arg)) {
        return bot.sendMessage(msg.from.id, 'ERROR | Masukkan angka filmdetail 1-20 ngab...')
    }

    if(arg < 1) {
        return bot.sendMessage(msg.from.id, 'ERROR | Masukkan angka filmdetail 1-20 ngab...')
    }

    if(arg > 20) {
        return bot.sendMessage(msg.from.id, 'ERROR | Masukkan angka filmdetail 1-20 ngab...')
    }

	axios
	.get(url + `/3/trending/movie/week?api_key=${apitmdb}`)
	.then(async(res) => {
        var linkfilm = 'https://dutafilm.today/search/' + res.data.results[`${arg}` - 1].title
        var linkfilm2 = 'https://www.google.com/search?q=Nonton+Film+' + `${res.data.results[arg - 1].title}` + '+Subtitle+Indonesia&oq=Nonton+Film+}' + `${res.data.results[arg - 1].title}` + '+Subtitle+Indonesia'

await bot.sendPhoto(msg.from.id, `https://image.tmdb.org/t/p/w500` + res.data.results[arg - 1].poster_path)
return await bot.sendMessage
(msg.from.id, `
*| TRENDING #${arg} |* ` + `${res.data.results[`${arg}` - 1].title}` + `\n
=======================\n
•*Deskripsi*•\n
` + `${res.data.results[`${arg}` - 1].overview}`.replace(/<[^>]*>/g, '').split('\n') + `\n
=======================\n
•*Informasi Film*•\n
*Judul Film* :` + ` *${res.data.results[arg - 1].title}*` + `\n
*Tanggal Rilis :*` + ` *${res.data.results[arg - 1].release_date}*` + `\n
*Film Dewasa ? :*` + ` *${res.data.results[arg - 1].adult ? 'Iya' : 'Tidak'}*` + `\n
*Bahasa :*` + ` *${res.data.results[arg - 1].original_language}*` + `\n
=======================\n
•*Rating*•\n
*Total Vote :*` + ` *${res.data.results[arg - 1].vote_count}*` + `\n
*Vote Average :*` + ` *${res.data.results[arg - 1].vote_average}*` + `\n
=======================\n
•*Link Nonton Film*•\n
[DutaFilm](${linkfilm.replace(/\s/g, '')}) \n[Google Search](${linkfilm2.replace(/\s/g, '')})` + `\n

=======================
`, { parseMode: 'Markdown' })


        }).catch((err)=> {
            return bot.sendMessage(msg.from.id, `ERROR | ${err}`)
        })
    })
}



