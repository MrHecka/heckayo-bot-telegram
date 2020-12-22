const TeleBot = require('telebot');
const delay = require('delay');
const fetch = require('node-fetch')
const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
bot.on(/^\/cekresi (.+)$/, async (msg, args) => {
    const kurir = args.match[1].split(' ')[0]
    const resi = args.match[1].split(' ')[1]
    if(!args.match[0,1]) {
        return bot.sendMessage(msg.from.id,'Masukkan nama ekspedisi dan nomor resi terlebih dahulu! | [Contoh : /cekresi jnt JB00xxxxxxxx]')
    }
    
    bot.sendMessage(msg.from.id, 'Loading ngab...Sabar!')
    let url = 'https://api.terhambar.com/resi'

    const fetchJson = (url, options) =>
    new Promise((resolve, reject) =>
        fetch(url, options)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => {
                console.error(err)
                reject(err)
            })
    )

 // _________________________________CEK RESI_________________________________ 
                    
    fetchJson(url + `?resi=${resi}&kurir=${kurir}`)
        .then((result) => {

          if (result.status.code != 200 && result.status.description != 'OK') return bot.sendMessage(msg.from.id, result.status.description + "\n___________________\n" + "\nMasukkan nama kurir/ekspedisi dengan benar!\nList :\n\n•jnt\n•jne\n•sicepat\n•lion\n•wahana\n•tiki\n•pos\n•ninja\n")

            const { result: { courier, summary, details, delivery_status, manifest } } = result
            const manifestText = manifest.map(x => `⏰ ${x.manifest_date} ${x.manifest_time}\n └ ${x.manifest_description}`)
            const resultText = `

📦 Data Ekspedisi
├ ${summary.courier_name}
├ Resi: ${summary.waybill_number || '-'}
├ Service: ${summary.service_code || '-'}
└ Dikirim Pada: ${details.waybill_date} ${details.waybill_time || '-'}
├      
💁🏼‍♂️ Data Pengirim
├ Nama: ${details.shippper_name || '-'} 
├ Alamat: ${details.shipper_address1} ${details.shipper_city || '-'}
├     
🎯 Data Penerima
├ Nama: ${details.receiver_name || '-'}
├ Alamat: ${details.receiver_address1} ${details.receiver_city || '-'}
├     
📮 Status Pengiriman
├ ${delivery_status.status || '-'}
├                 
🚧 POD Detail\n
├
${manifestText.join('\n')}`


                

return bot.sendMessage(msg.from.id, resultText)
    
        })

    })
}





