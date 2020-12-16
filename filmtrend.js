console.log('filmtrend.js AKTIF!')
const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(['/filmtrend'], async (msg, args) => {
	const url = 'https://api.themoviedb.org'	
	const apitmdb = process.env.apikeytmdb	
	
	axios
	.get(url + `/3/trending/movie/week?api_key=${apitmdb}`)
	.then(async(res) => {


return await bot.sendMessage
(msg.from.id, `
===[[List 20 Film Trending Minggu Ini]]===\n\n
TRENDING #1\n
Judul : *${res.data.results[0].title}*
Ketik /filmdetail 1 *(Untuk lebih detail)*\n\n

TRENDING #2\n
Judul : *${res.data.results[1].title}*
Ketik /filmdetail 2 *(Untuk lebih detail)*\n\n

TRENDING #3\n
Judul : *${res.data.results[2].title}*
Ketik /filmdetail 3 *(Untuk lebih detail)*\n\n

TRENDING #4\n
Judul : *${res.data.results[3].title}*
Ketik /filmdetail 4 *(Untuk lebih detail)*\n\n

TRENDING #5\n
Judul : *${res.data.results[4].title}*
Ketik /filmdetail 5 *(Untuk lebih detail)*\n\n

TRENDING #6\n
Judul : *${res.data.results[5].title}*
Ketik /filmdetail 6 *(Untuk lebih detail)*\n\n

TRENDING #7\n
Judul : *${res.data.results[6].title}*
Ketik /filmdetail 7 *(Untuk lebih detail)*\n\n

TRENDING #8\n
Judul : *${res.data.results[7].title}*
Ketik /filmdetail 8 *(Untuk lebih detail)*\n\n

TRENDING #9\n
Judul : *${res.data.results[8].title}*
Ketik /filmdetail 9 *(Untuk lebih detail)*\n\n

TRENDING #10\n
Judul : *${res.data.results[9].title}*
Ketik /filmdetail 10 *(Untuk lebih detail)*\n\n

TRENDING #11\n
Judul : *${res.data.results[10].title}*
Ketik /filmdetail 11 *(Untuk lebih detail)*\n\n

TRENDING #12\n
Judul : *${res.data.results[11].title}*
Ketik /filmdetail 12 *(Untuk lebih detail)*\n\n

TRENDING #13\n
Judul : *${res.data.results[12].title}*
Ketik /filmdetail 13 *(Untuk lebih detail)*\n\n

TRENDING #14\n
Judul : *${res.data.results[13].title}*
Ketik /filmdetail 14 *(Untuk lebih detail)*\n\n

TRENDING #15\n
Judul : *${res.data.results[14].title}*
Ketik /filmdetail 15 *(Untuk lebih detail)*\n\n

TRENDING #16\n
Judul : *${res.data.results[15].title}*
Ketik /filmdetail 16 (Untuk lebih detail)\n\n

TRENDING #17\n
Judul : *${res.data.results[16].title}*
Ketik /filmdetail 17 *(Untuk lebih detail)*\n\n

TRENDING #18\n
Judul : *${res.data.results[17].title}*
Ketik /filmdetail 18 *(Untuk lebih detail)*\n\n

TRENDING #19\n
Judul : *${res.data.results[18].title}*
Ketik /filmdetail 19 *(Untuk lebih detail)*\n\n

TRENDING #20\n
Judul : *${res.data.results[19].title}*
Ketik /filmdetail 20 *(Untuk lebih detail)*\n\n

=======================
`, { parseMode: 'Markdown' })


        })
    })
}

