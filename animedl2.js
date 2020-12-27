console.log('animedl2.js AKTIF!')

const TeleBot = require('telebot')
const delay = require('delay')
const axios = require('axios')
const cheerio = require('cheerio')

const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {
    bot.on(/^\/animedl2 ([\s\S]+)/, async (msg, args) => {
        let arg = await args.match[1]
        await bot.sendMessage(msg.from.id, 'Tunggu Sebentar....')
        await axios.get('https://kusonime.com/?s=' + arg).then(async res => {

            const $ = await cheerio.load(res.data);
            const linkanime1 = await $('div[class="content"] > h2 > a');
            let link1 = await linkanime1.attr('href');
            
        await axios.get(link1).then(async res => {
            let links360 = await [];
            let links480 = await [];
            let links720 = await [];
            let links1080 = await [];
            const $$ = await cheerio.load(res.data);
            await $$('.dlbod > .smokeddl > .smokeurl > a').slice(0, 3).each(async (index, value) => {
                let link360 = await $$(value).attr('href');
                await links360.push({link360});
                
            });
        
            await $$('.dlbod > .smokeddl > .smokeurl + .smokeurl > a').slice(0, 3).each(async (index, value) => {
                let link480 = await $$(value).attr('href');
                await links480.push({link480});
                
            });
        
            await $$('.dlbod > .smokeddl > .smokeurl + .smokeurl + .smokeurl > a').slice(0, 3).each(async (index, value) => {
                let link720 = await $$(value).attr('href');
                await links720.push({link720});
                
            });
        
            await $$('.dlbod > .smokeddl > .smokeurl + .smokeurl + .smokeurl + .smokeurl > a').each(async (index, value) => {
                let link1080 = await $$(value).attr('href');
                await links1080.push({link1080});
                
            });
            
            let judul = await $$('div[class="post-thumb"] > h1[class="jdlz"]').text();
            let genre = await $$('div[class="info"] > p:nth-child(2)').text();
            let totaleps = await $$('div[class="info"] > p:nth-child(7)').text();
            let durasi = await $$('div[class="info"] > p:nth-child(9)').text();
            let tglrilis = await $$('div[class="info"] > p:nth-child(10)').text();
            let result360 = await JSON.stringify(links360).replace(/,/g, '\n').replace(/"/g, '').replace(/link360/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '');
            let result480 = await JSON.stringify(links480).replace(/,/g, '\n').replace(/"/g, '').replace(/link480/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '');
            let result720 = await JSON.stringify(links720).replace(/,/g, '\n').replace(/"/g, '').replace(/link720/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '');
            let result1080 = await JSON.stringify(links1080).replace(/,/g, '\n').replace(/"/g, '').replace(/link1080/g, '').replace(/{/g, '').replace(/}/g, '').replace(/\[/g, '').replace(/\]/g, '');
            return await bot.sendMessage(msg.from.id, `Judul : ${judul}\n${genre}\n${totaleps}\n${durasi}\n${tglrilis}\n\nResolusi 360p : \n${result360}\n\nResolusi 480p : \n${result480}\n\nResolusi 720p : \n${result720}\n\nResolusi 1080p : \n${result1080}`)
                }).catch(async(err)=> {
                    return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
                })
            }).catch(async(err)=> {
                return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
            })
    
    })
}






