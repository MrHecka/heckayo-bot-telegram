console.log('igstory.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')
const ig = require('scraper-instagram')

const InstaClient = new ig()
const bot = new TeleBot({
    token: process.env.TOKEN
})

module.exports = bot => {

bot.on(/^\/igstory (.+)$/, async (msg, args) => {

    let username = await args.match[1]
    let usernamefix = await username.replace(/@/g, '')
    let session = await process.env.sesiidig

    await InstaClient.authBySessionId(session)
    await bot.sendMessage(msg.from.id, `Sedang mengambil story dari username => ${usernamefix}`)

    await InstaClient.getProfileStory(usernamefix)
    .then(async(story) => {

    async function igstoryscraper() {
        
        try {

        if(story.items[0] === undefined) {
            return await msg.reply.text('USERNAME TIDAK MEMILIKI STORY!')
        } else if(story.items[0].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[0].url)
        }
        if(story.items[1] === undefined) {
            return await msg.reply.text('1/100 Konten Ditemukan!')
        } else if(story.items[1].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[1].url)
        }
        if(story.items[2] === undefined) {
            return await msg.reply.text('2/100 Konten Ditemukan!')
        } else if(story.items[2].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[2].url)
        }
        if(story.items[3] === undefined) {
            return await msg.reply.text('3/100 Konten Ditemukan!')
        } else if(story.items[3].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[3].url)
        }
        if(story.items[4] === undefined) {
            return await msg.reply.text('4/100 Konten Ditemukan!')
        } else if(story.items[4].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[4].url)
        }
        if(story.items[5] === undefined) {
            return await msg.reply.text('5/100 Konten Ditemukan!')
        } else if(story.items[5].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[5].url)
        }
        if(story.items[6] === undefined) {
            return msg.reply.text('6/100 Konten Ditemukan!')
        } else if(story.items[6].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[6].url)
        }
        if(story.items[7] === undefined) {
            return await msg.reply.text('7/100 Konten Ditemukan!')
        } else if(story.items[7].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[7].url)
        }
        if(story.items[8] === undefined) {
            return await msg.reply.text('8/100 Konten Ditemukan!')
        } else if(story.items[8].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[8].url)
        }
        if(story.items[9] === undefined) {
            return await msg.reply.text('9/100 Konten Ditemukan!')
        } else if(story.items[9].url != undefined) {
            await bot.sendDocument(msg.from.id, story.items[9].url)
        }
        if(story.items[10] === undefined) {
            return await msg.reply.text('10/100 Konten Ditemukan!')
        } else if(story.items[10].url != undefined) {
            await bot.sendDocument(msg.from.id, story.items[10].url)
        }
        if(story.items[11] === undefined) {
            return await msg.reply.text('11/100 Konten Ditemukan!')
        } else if(story.items[11].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[11].url)
        }
        if(story.items[12] === undefined) {
            return await msg.reply.text('12/100 Konten Ditemukan!')
        } else if(story.items[12].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[12].url)
        }
        if(story.items[13] === undefined) {
            return await msg.reply.text('13/100 Konten Ditemukan!')
        } else if(story.items[13].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[13].url)
        }
        if(story.items[14] === undefined) {
            return await msg.reply.text('14/100 Konten Ditemukan!')
        } else if(story.items[14].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[14].url)
        }
        if(story.items[15] === undefined) {
            return await msg.reply.text('15/100 Konten Ditemukan!')
        } else if(story.items[15].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[15].url)
        }
        if(story.items[16] === undefined) {
            return await msg.reply.text('16/100 Konten Ditemukan!')
        } else if(story.items[16].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[16].url)
        }
        if(story.items[17] === undefined) {
            return await msg.reply.text('17/100 Konten Ditemukan!')
        } else if(story.items[17].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[17].url)
        }
        if(story.items[18] === undefined) {
            return await msg.reply.text('18/100 Konten Ditemukan!')
        } else if(story.items[18].url != undefined){
            await bot.sendDocument(msg.from.id, story.items[18].url)
        }
        if(story.items[19] === undefined) {
            return await msg.reply.text('19/100 Konten Ditemukan!')
        } else if(story.items[19].url != undefined) {
            await bot.sendDocument(msg.from.id, story.items[19].url)
        }
        if(story.items[20] === undefined) {
            return await msg.reply.text('20/100 Konten Ditemukan!')
        } else if(story.items[20].url != undefined) {
            await bot.sendDocument(msg.from.id, story.items[20].url)
        }
        if(story.items[21] === undefined) {
            return await msg.reply.text('21/100 Konten Ditemukan!')
        } else if(story.items[21].url != undefined){
            await bot.sendDocument(story.items[21].url)
        }
        if(story.items[22] === undefined) {
            return await msg.reply.text('22/100 Konten Ditemukan!')
        } else if(story.items[22].url != undefined){
            await bot.sendDocument(story.items[22].url)
        }
        if(story.items[23] === undefined) {
            return await msg.reply.text('23/100 Konten Ditemukan!')
        } else if(story.items[23].url != undefined){
            await bot.sendDocument(story.items[23].url)
        }
        if(story.items[24] === undefined) {
            return await msg.reply.text('24/100 Konten Ditemukan!')
        } else if(story.items[24].url != undefined){
            await bot.sendDocument(story.items[24].url)
        }
        if(story.items[25] === undefined) {
            return await msg.reply.text('25/100 Konten Ditemukan!')
        } else if(story.items[25].url != undefined){
            await bot.sendDocument(story.items[25].url)
        }
        if(story.items[26] === undefined) {
            return await msg.reply.text('26/100 Konten Ditemukan!')
        } else if(story.items[26].url != undefined){
            await bot.sendDocument(story.items[26].url)
        }
        if(story.items[27] === undefined) {
            return await msg.reply.text('27/100 Konten Ditemukan!')
        } else if(story.items[27].url != undefined){
            await bot.sendDocument(story.items[27].url)
        }
        if(story.items[28] === undefined) {
            return await msg.reply.text('28/100 Konten Ditemukan!')
        } else if(story.items[28].url != undefined){
            await bot.sendDocument(story.items[28].url)
        }
        if(story.items[29] === undefined) {
            return await msg.reply.text('29/100 Konten Ditemukan!')
        } else if(story.items[29].url != undefined) {
            await bot.sendDocument(story.items[29].url)
        }
        if(story.items[30] === undefined) {
            return await msg.reply.text('30/100 Konten Ditemukan!')
        } else if(story.items[30].url != undefined) {
            await bot.sendDocument(story.items[30].url)
        }
        if(story.items[31] === undefined) {
            return await msg.reply.text('31/100 Konten Ditemukan!')
        } else if(story.items[31].url != undefined){
            await bot.sendDocument(story.items[31].url)
        }
        if(story.items[32] === undefined) {
            return await msg.reply.text('32/100 Konten Ditemukan!')
        } else if(story.items[32].url != undefined){
            await bot.sendDocument(story.items[32].url)
        }
        if(story.items[33] === undefined) {
            return await msg.reply.text('33/100 Konten Ditemukan!')
        } else if(story.items[33].url != undefined){
            await bot.sendDocument(story.items[33].url)
        }
        if(story.items[34] === undefined) {
            return await msg.reply.text('34/100 Konten Ditemukan!')
        } else if(story.items[34].url != undefined){
            await bot.sendDocument(story.items[34].url)
        }
        if(story.items[35] === undefined) {
            return await msg.reply.text('35/100 Konten Ditemukan!')
        } else if(story.items[35].url != undefined){
            await bot.sendDocument(story.items[35].url)
        }
        if(story.items[36] === undefined) {
            return await msg.reply.text('36/100 Konten Ditemukan!')
        } else if(story.items[36].url != undefined){
            await bot.sendDocument(story.items[36].url)
        }
        if(story.items[37] === undefined) {
            return await msg.reply.text('37/100 Konten Ditemukan!')
        } else if(story.items[37].url != undefined){
            await bot.sendDocument(story.items[37].url)
        }
        if(story.items[38] === undefined) {
            return await msg.reply.text('38/100 Konten Ditemukan!')
        } else if(story.items[38].url != undefined){
            await bot.sendDocument(story.items[38].url)
        }
        if(story.items[39] === undefined) {
            return await msg.reply.text('39/100 Konten Ditemukan!')
        } else if(story.items[39].url != undefined) {
            await bot.sendDocument(story.items[39].url)
        }
        if(story.items[40] === undefined) {
            return await msg.reply.text('40/100 Konten Ditemukan!')
        } else if(story.items[40].url != undefined) {
            await bot.sendDocument(story.items[40].url)
        }
        if(story.items[41] === undefined) {
            return await msg.reply.text('41/100 Konten Ditemukan!')
        } else if(story.items[41].url != undefined){
            await bot.sendDocument(story.items[41].url)
        }
        if(story.items[42] === undefined) {
            return await msg.reply.text('42/100 Konten Ditemukan!')
        } else if(story.items[42].url != undefined){
            await bot.sendDocument(story.items[42].url)
        }
        if(story.items[43] === undefined) {
            return await msg.reply.text('43/100 Konten Ditemukan!')
        } else if(story.items[43].url != undefined){
            await bot.sendDocument(story.items[43].url)
        }
        if(story.items[44] === undefined) {
            return await msg.reply.text('44/100 Konten Ditemukan!')
        } else if(story.items[44].url != undefined){
            await bot.sendDocument(story.items[44].url)
        }
        if(story.items[45] === undefined) {
            return await msg.reply.text('45/100 Konten Ditemukan!')
        } else if(story.items[45].url != undefined){
            await bot.sendDocument(story.items[45].url)
        }
        if(story.items[46] === undefined) {
            return await msg.reply.text('46/100 Konten Ditemukan!')
        } else if(story.items[46].url != undefined){
            await bot.sendDocument(story.items[46].url)
        }
        if(story.items[47] === undefined) {
            return await msg.reply.text('47/100 Konten Ditemukan!')
        } else if(story.items[47].url != undefined){
            await bot.sendDocument(story.items[47].url)
        }
        if(story.items[48] === undefined) {
            return await msg.reply.text('48/100 Konten Ditemukan!')
        } else if(story.items[48].url != undefined){
            await bot.sendDocument(story.items[48].url)
        }
        if(story.items[49] === undefined) {
            return await msg.reply.text('49/100 Konten Ditemukan!')
        } else if(story.items[49].url != undefined) {
            await bot.sendDocument(story.items[49].url)
        }
        if(story.items[50] === undefined) {
            return await msg.reply.text('50/100 Konten Ditemukan!')
        } else if(story.items[50].url != undefined) {
            await bot.sendDocument(story.items[50].url)
        }
        if(story.items[51] === undefined) {
            return await msg.reply.text('51/100 Konten Ditemukan!')
        } else if(story.items[51].url != undefined){
            await bot.sendDocument(story.items[51].url)
        }
        if(story.items[52] === undefined) {
            return await msg.reply.text('52/100 Konten Ditemukan!')
        } else if(story.items[52].url != undefined){
            await bot.sendDocument(story.items[52].url)
        }
        if(story.items[53] === undefined) {
            return await msg.reply.text('53/100 Konten Ditemukan!')
        } else if(story.items[53].url != undefined){
            await bot.sendDocument(story.items[53].url)
        }
        if(story.items[54] === undefined) {
            return await msg.reply.text('54/100 Konten Ditemukan!')
        } else if(story.items[54].url != undefined){
            await bot.sendDocument(story.items[54].url)
        }
        if(story.items[55] === undefined) {
            return await msg.reply.text('55/100 Konten Ditemukan!')
        } else if(story.items[55].url != undefined){
            await bot.sendDocument(story.items[55].url)
        }
        if(story.items[56] === undefined) {
            return await msg.reply.text('56/100 Konten Ditemukan!')
        } else if(story.items[56].url != undefined){
            await bot.sendDocument(story.items[56].url)
        }
        if(story.items[57] === undefined) {
            return await msg.reply.text('57/100 Konten Ditemukan!')
        } else if(story.items[57].url != undefined){
            await bot.sendDocument(story.items[57].url)
        }
        if(story.items[58] === undefined) {
            return await msg.reply.text('58/100 Konten Ditemukan!')
        } else if(story.items[58].url != undefined){
            await bot.sendDocument(story.items[58].url)
        }
        if(story.items[59] === undefined) {
            return await msg.reply.text('59/100 Konten Ditemukan!')
        } else if(story.items[59].url != undefined) {
            await bot.sendDocument(story.items[59].url)
        }
        if(story.items[60] === undefined) {
            return await msg.reply.text('60/100 Konten Ditemukan!')
        } else if(story.items[60].url != undefined) {
            await bot.sendDocument(story.items[60].url)
        }
        if(story.items[61] === undefined) {
            return await msg.reply.text('61/100 Konten Ditemukan!')
        } else if(story.items[61].url != undefined){
            await bot.sendDocument(story.items[61].url)
        }
        if(story.items[62] === undefined) {
            return await msg.reply.text('62/100 Konten Ditemukan!')
        } else if(story.items[62].url != undefined){
            await bot.sendDocument(story.items[62].url)
        }
        if(story.items[63] === undefined) {
            return await msg.reply.text('63/100 Konten Ditemukan!')
        } else if(story.items[63].url != undefined){
            await bot.sendDocument(story.items[63].url)
        }
        if(story.items[64] === undefined) {
            return await msg.reply.text('64/100 Konten Ditemukan!')
        } else if(story.items[64].url != undefined){
            await bot.sendDocument(story.items[64].url)
        }
        if(story.items[65] === undefined) {
            return await msg.reply.text('65/100 Konten Ditemukan!')
        } else if(story.items[65].url != undefined){
            await bot.sendDocument(story.items[65].url)
        }
        if(story.items[66] === undefined) {
            return await msg.reply.text('66/100 Konten Ditemukan!')
        } else if(story.items[66].url != undefined){
            await bot.sendDocument(story.items[66].url)
        }
        if(story.items[67] === undefined) {
            return await msg.reply.text('67/100 Konten Ditemukan!')
        } else if(story.items[67].url != undefined){
            await bot.sendDocument(story.items[67].url)
        }
        if(story.items[68] === undefined) {
            return await msg.reply.text('68/100 Konten Ditemukan!')
        } else if(story.items[68].url != undefined){
            await bot.sendDocument(story.items[68].url)
        }
        if(story.items[69] === undefined) {
            return await msg.reply.text('69/100 Konten Ditemukan!')
        } else if(story.items[69].url != undefined) {
            await bot.sendDocument(story.items[69].url)
        }
        if(story.items[70] === undefined) {
            return await msg.reply.text('70/100 Konten Ditemukan!')
        } else if(story.items[70].url != undefined) {
            await bot.sendDocument(story.items[70].url)
        }
        if(story.items[71] === undefined) {
            return await msg.reply.text('71/100 Konten Ditemukan!')
        } else if(story.items[71].url != undefined){
            await bot.sendDocument(story.items[71].url)
        }
        if(story.items[72] === undefined) {
            return await msg.reply.text('72/100 Konten Ditemukan!')
        } else if(story.items[72].url != undefined){
            await bot.sendDocument(story.items[72].url)
        }
        if(story.items[73] === undefined) {
            return await msg.reply.text('73/100 Konten Ditemukan!')
        } else if(story.items[73].url != undefined){
            await bot.sendDocument(story.items[73].url)
        }
        if(story.items[74] === undefined) {
            return await msg.reply.text('74/100 Konten Ditemukan!')
        } else if(story.items[74].url != undefined){
            await bot.sendDocument(story.items[74].url)
        }
        if(story.items[75] === undefined) {
            return await msg.reply.text('75/100 Konten Ditemukan!')
        } else if(story.items[75].url != undefined){
            await bot.sendDocument(story.items[75].url)
        }
        if(story.items[76] === undefined) {
            return await msg.reply.text('76/100 Konten Ditemukan!')
        } else if(story.items[76].url != undefined){
            await bot.sendDocument(story.items[76].url)
        }
        if(story.items[77] === undefined) {
            return await msg.reply.text('77/100 Konten Ditemukan!')
        } else if(story.items[77].url != undefined){
            await bot.sendDocument(story.items[77].url)
        }
        if(story.items[78] === undefined) {
            return await msg.reply.text('78/100 Konten Ditemukan!')
        } else if(story.items[78].url != undefined){
            await bot.sendDocument(story.items[78].url)
        }
        if(story.items[79] === undefined) {
            return await msg.reply.text('79/100 Konten Ditemukan!')
        } else if(story.items[79].url != undefined) {
            await bot.sendDocument(story.items[79].url)
        }
        if(story.items[80] === undefined) {
            return await msg.reply.text('80/100 Konten Ditemukan!')
        } else if(story.items[80].url != undefined) {
            await bot.sendDocument(story.items[80].url)
        }
        if(story.items[81] === undefined) {
            return await msg.reply.text('81/100 Konten Ditemukan!')
        } else if(story.items[81].url != undefined){
            await bot.sendDocument(story.items[81].url)
        }
        if(story.items[82] === undefined) {
            return await msg.reply.text('82/100 Konten Ditemukan!')
        } else if(story.items[82].url != undefined){
            await bot.sendDocument(story.items[82].url)
        }
        if(story.items[83] === undefined) {
            return await msg.reply.text('83/100 Konten Ditemukan!')
        } else if(story.items[83].url != undefined){
            await bot.sendDocument(story.items[83].url)
        }
        if(story.items[84] === undefined) {
            return await msg.reply.text('84/100 Konten Ditemukan!')
        } else if(story.items[84].url != undefined){
            await bot.sendDocument(story.items[84].url)
        }
        if(story.items[85] === undefined) {
            return await msg.reply.text('85/100 Konten Ditemukan!')
        } else if(story.items[85].url != undefined){
            await bot.sendDocument(story.items[85].url)
        }
        if(story.items[86] === undefined) {
            return await msg.reply.text('86/100 Konten Ditemukan!')
        } else if(story.items[86].url != undefined){
            await bot.sendDocument(story.items[86].url)
        }
        if(story.items[87] === undefined) {
            return await msg.reply.text('87/100 Konten Ditemukan!')
        } else if(story.items[87].url != undefined){
            await bot.sendDocument(story.items[87].url)
        }
        if(story.items[88] === undefined) {
            return await msg.reply.text('88/100 Konten Ditemukan!')
        } else if(story.items[88].url != undefined){
            await bot.sendDocument(story.items[88].url)
        }
        if(story.items[89] === undefined) {
            return await msg.reply.text('89/100 Konten Ditemukan!')
        } else if(story.items[89].url != undefined) {
            await bot.sendDocument(story.items[89].url)
        }
        if(story.items[90] === undefined) {
            return await msg.reply.text('90/100 Konten Ditemukan!')
        } else if(story.items[90].url != undefined) {
            await bot.sendDocument(story.items[90].url)
        }
        if(story.items[91] === undefined) {
            return await msg.reply.text('91/100 Konten Ditemukan!')
        } else if(story.items[91].url != undefined){
            await bot.sendDocument(story.items[91].url)
        }
        if(story.items[92] === undefined) {
            return await msg.reply.text('92/100 Konten Ditemukan!')
        } else if(story.items[92].url != undefined){
            await bot.sendDocument(story.items[92].url)
        }
        if(story.items[93] === undefined) {
            return await msg.reply.text('93/100 Konten Ditemukan!')
        } else if(story.items[93].url != undefined){
            await bot.sendDocument(story.items[93].url)
        }
        if(story.items[94] === undefined) {
            return await msg.reply.text('94/100 Konten Ditemukan!')
        } else if(story.items[94].url != undefined){
            await bot.sendDocument(story.items[94].url)
        }
        if(story.items[95] === undefined) {
            return await msg.reply.text('95/100 Konten Ditemukan!')
        } else if(story.items[95].url != undefined){
            await bot.sendDocument(story.items[95].url)
        }
        if(story.items[96] === undefined) {
            return await msg.reply.text('96/100 Konten Ditemukan!')
        } else if(story.items[96].url != undefined){
            await bot.sendDocument(story.items[96].url)
        }
        if(story.items[97] === undefined) {
            return await msg.reply.text('97/100 Konten Ditemukan!')
        } else if(story.items[97].url != undefined){
            await bot.sendDocument(story.items[97].url)
        }
        if(story.items[98] === undefined) {
            return await msg.reply.text('98/100 Konten Ditemukan!')
        } else if(story.items[98].url != undefined){
            await bot.sendDocument(story.items[98].url)
        }
        if(story.items[99] === undefined) {
            return await msg.reply.text('99/100 Konten Ditemukan!')
        } else if(story.items[99].url != undefined) {
            bot.sendDocument(story.items[99].url)
            await msg.reply.text('100/100 Konten Ditemukan!')
        }
        
    
    }catch(err) {
        return bot.sendMessage(msg.from.id, `ERROR | ${err}`)
    }
    
} 

    igstoryscraper()
    .catch(async(err)=>{
        return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
    })

    }).catch(async(err) => {
        return await bot.sendMessage(msg.from.id, `ERROR | ${err}`)
}) 

   
        })
}







