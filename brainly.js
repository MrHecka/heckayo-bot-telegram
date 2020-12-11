console.log('brainly.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios');

const bot = new TeleBot({
    token: process.env.TOKEN
})


module.exports = bot => {
    bot.on(/^\/brainly (.+)$/, async (msg, args) => {
        let arg = args.match[1]
        const url = 'http://api.farzain.com/brainly.php?id='
        const api = process.env.apibrainly

        bot.sendMessage(msg.from.id, 'Tunggu sebentar...Heckayo sedang mengambil data....')
        await delay(1000)
        
        axios
		.get(url + arg + '&apikey=' + api)
		.then((result) => {

return bot.sendMessage(
msg.from.id, 
`===[Brainly Scrapper - Heckayo]===\n\nPertanyaan : ${arg}\n\nJawaban :\n
\n1.) [${result.data[0].title}]\n(${result.data[0].url})\n
\n2.) [${result.data[1].title}]\n(${result.data[1].url})\n\n
\n3.) [${result.data[2].title}]\n(${result.data[2].url})\n\n            
\n4.) [${result.data[3].title}]\n(${result.data[3].url})\n\n
\n5.) [${result.data[4].title}]\n(${result.data[4].url})\n\n
\n6.) [${result.data[5].title}]\n(${result.data[5].url})\n\n
\n7.) [${result.data[6].title}]\n(${result.data[6].url})\n\n
\n8.) [${result.data[7].title}]\n(${result.data[7].url})\n\n
\n9.) [${result.data[8].title}]\n(${result.data[8].url})\n\n
\n10.) [${result.data[9].title}]\n(${result.data[9].url})\n\n
===[Brainly Scrapper - Heckayo]===
`)


        })
    
    
    })

}




