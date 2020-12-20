console.log('animedl3.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const cheerio = require('cheerio')

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(/^\/animedl3 ([\s\S]+)/, async (msg, args) => {
        let arg = await args.match[1]
        await bot.sendMessage(msg.from.id, 'Tunggu Sebentar....')
        await axios.get('https://kusonime.com/?s=' + arg).then(async res => {

            const $ = await cheerio.load(res.data);
            const linkanime1 = await $('div[class="content"] > h2 > a');
            let link1 = await linkanime1.attr('href');
            
        await axios.get(link1).then(async res => {
            let links = await [];
            const $$ = await cheerio.load(res.data);
            await $$('div[class="dlbod"] > div[class="smokeddl"] > div[class="smokeurl"] > a').each(async (index, value) => {
            let linkall = await $$(value).attr('href');
            await links.push({linkall});
            
        })
            
            let judul = await $$('div[class="post-thumb"] > h1[class="jdlz"]').text();
            let genre = await $$('div[class="info"] > p:nth-child(2)').text();
            let totaleps = await $$('div[class="info"] > p:nth-child(7)').text();
            let durasi = await $$('div[class="info"] > p:nth-child(9)').text();
            let tglrilis = await $$('div[class="info"] > p:nth-child(10)').text();
            let result = await JSON.stringify(links).replace(/,/g, '\n').replace(/"/g, '').replace(/linkall/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '');
            return await bot.sendMessage(msg.from.id, `Judul : ${judul}\n${genre}\n${totaleps}\n${durasi}\n${tglrilis}\n\nBERHASiL MENGAMBIL SEMUA LINK DOWNLOAD [360p/480p/720p] : \n\n${result}`)
                }).catch(async(err)=> {
                    return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
                })
            }).catch(async(err)=> {
                return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
            })
    
    })
}




