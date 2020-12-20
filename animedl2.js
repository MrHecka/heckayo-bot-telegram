console.log('animedl2.js AKTIF!');

const TeleBot = require('telebot');
const delay = require('delay');
const axios = require('axios');
const cheerio = require('cheerio');
var links360 = [];
var links480 = [];
var links720 = [];

const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
    bot.on(/^\/animedl2 ([\s\S]+)/, async (msg, args) => {
        let arg = args.match[1]
        bot.sendMessage(msg.from.id, 'Sedang mencari anime...')
        axios.get('https://nimegami.com/?s=' + arg).then(async res => {

            const $ = await cheerio.load(res.data);
            const linkanime1 = await $('div[class="archive"] > div[class="archive-a"] > article > div[class="thumbnail"] > a');
            var link1 = linkanime1.attr('href');
    
                
        axios.get(link1).then(async res => {
    
            const $$ = await cheerio.load(res.data);
            await $$('div[class="download_box"] > div[class="download"] > div[class="batch-dlcuy"] > ul > li:nth-child(1) > a').each(async (index, value) => {
            var linkall360 = await $$(value).attr('href');
            links360.push({linkall360});
            })
            await $$('div[class="download_box"] > div[class="download"] > div[class="batch-dlcuy"] > ul > li:nth-child(2) > a').each(async (index, value) => {
            var linkall480 = await $$(value).attr('href');
            links480.push({linkall480})
            })
            await $$('div[class="download_box"] > div[class="download"] > div[class="batch-dlcuy"] > ul > li:nth-child(3) > a').each(async (index, value) => {
            var linkall720 = await $$(value).attr('href');
            links720.push({linkall720})
            })
            let judul = await $$('div[class="single"] > article[class="single"] > h1[class="title"]').text()
            var result360 = JSON.stringify(links360).replace(/,/g, '\n').replace(/"/g, '').replace(/linkall360/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '');
            var result480 = JSON.stringify(links480).replace(/,/g, '\n').replace(/"/g, '').replace(/linkall480/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '');
            var result720 = JSON.stringify(links720).replace(/,/g, '\n').replace(/"/g, '').replace(/linkall720/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '');
            return bot.sendMessage(msg.from.id, `Judul Anime : ${judul}\nLink : ${link1}\n\n⬇️360p⬇️\n${result360}\n\n⬇️480p⬇️\n${result480}\n\n⬇️720p⬇️\n${result720}\n\nNote : Jika link tidak muncul atau gagal, gunakan /animedl [nama anime]`)
                })
            })

    })
}







