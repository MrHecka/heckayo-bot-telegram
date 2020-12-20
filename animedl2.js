console.log('animedl2.js AKTIF!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios');
const cheerio = require('cheerio');


const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
    bot.on(/^\/animedl2 ([\s\S]+)/, async (msg, args) => {
        let arg = await args.match[1]
        await bot.sendMessage(msg.from.id, 'Sedang mencari anime...')
        await axios.get('https://nimegami.com/?s=' + arg).then(async res => {

            const $ = await cheerio.load(res.data);
            const linkanime1 = await $('div[class="archive"] > div[class="archive-a"] > article > div[class="thumbnail"] > a');
            let link1 = await linkanime1.attr('href');
    
                
        await axios.get(link1).then(async res => {
            let links360 = await [];
            let links480 = await [];
            let links720 = await [];
            const $$ = await cheerio.load(res.data);
            await $$('div[class="download_box"] > div[class="download"] > div[class="batch-dlcuy"] > ul > li:nth-child(1) > a').each(async (index, value) => {
            let linkall360 = await $$(value).attr('href');
            await links360.push({linkall360});
            })
            await $$('div[class="download_box"] > div[class="download"] > div[class="batch-dlcuy"] > ul > li:nth-child(2) > a').each(async (index, value) => {
            let linkall480 = await $$(value).attr('href');
            await links480.push({linkall480})
            })
            await $$('div[class="download_box"] > div[class="download"] > div[class="batch-dlcuy"] > ul > li:nth-child(3) > a').each(async (index, value) => {
            let linkall720 = await $$(value).attr('href');
            await links720.push({linkall720})
            })
            let judul = await $$('div[class="single"] > article[class="single"] > h1[class="title"]').text()
            let result360 = await JSON.stringify(links360).replace(/,/g, '\n').replace(/"/g, '').replace(/linkall360/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '').toString();
            let result480 = await JSON.stringify(links480).replace(/,/g, '\n').replace(/"/g, '').replace(/linkall480/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '').toString();
            let result720 = await JSON.stringify(links720).replace(/,/g, '\n').replace(/"/g, '').replace(/linkall720/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '').toString();
            return await bot.sendMessage(msg.from.id, `Judul Anime : ${judul}\nLink : ${link1}\n\n⬇️360p⬇️\n${result360}\n\n⬇️480p⬇️\n${result480}\n\n⬇️720p⬇️\n${result720}\n\nNote : Jika link tidak muncul atau gagal, gunakan /animedl [nama anime]`)
                }).catch(async(err)=> {
                    return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
                })
            }).catch(async(err)=> {
                return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
            })

    })
}







