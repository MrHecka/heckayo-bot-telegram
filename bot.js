console.log('bot.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')


const bot = new TeleBot({
    token: process.env.TOKEN,
    polling: { 
        interval: 1000,
        timeout: 20000, 
        limit: 100,
        retryTimeout: 5000
    },
})


bot.on(['/start', '/halo'], async (msg) => {
    msg.reply.photo('https://avatars0.githubusercontent.com/u/71875420?s=400&u=5c417305130d96788de7e5add2627c32c236cfd9&v=4')
    await delay (100)
    bot.sendMessage(msg.from.id, `Halo Selamat Datang, ${msg.from.username}! ^_^`);
    await delay (500)
    return bot.sendMessage (
    msg.from.id, 'Halo ini adalah BOT Heckayo Versi Telegram😄!\n\n____________\n\nGunakan perintah /menu untuk melihat semua fitur yang ada di Bot Heckayo, dan gunakan perintah /infomenu untuk melihat informasi dan semua contoh perintah fitur yang ada di Bot Heckayo, terima kasih😉\n\n____________\n\n🤖VERSI BOT HECKAYO : v1.4🤖\n\nAdded /wallpaper✅\nAdded /pasangan✅\nAdded /fbdl✅')
})

bot.on(['/menu'], async (msg) => {
    return bot.sendMessage
(msg.from.id, `_______________\n\n🤖LIST FITUR BOT HECKAYO🤖!\n\n
=====[DAFTAR MENU]=====\n> /nulis [baris1;baris2;baris3]\n> /anime [nama anime]\n> /animedl [nama anime]\n> /ytmp4 [link yt]\n> /ytmp3 [link yt]\n> /cekresi [kurir] [resi]\n> /brainly [pertanyaan]\n> /lirik [nama artis - judul lagu]\n> /tiktokdl [link tiktok]\n> /fbdl [link video facebook]\n> /loli\n> /wallpaper\n> /pasangan [namamu] [nama pasanganmu]\n========================\n\n
=====[CATATAN]=====\n> Tolong bot nya jangan di spam😣\n> Cintai bot nya seperti kamu mencintai dia🤗\n> Semua perintah yang membutuhkan teks tidak perlu menggunakan tanda []👈\n> Masih bingung dengan fitur heckayo🤨? gunakan perintah /infomenu\n> Bot masih dalam tahap pengembangan🔧\n> Terima kasih sudah menggunakan Bot Heckayo😍\n===================\n\n
> Beritahu pembuat bot jika saya mati atau jika kamu menemukan bug :\n> https://t.me/MrHecka\n\n
> Support bot ini dengan cara donasi ke :\n> https://saweria.co/heckayo\n> https://paypal.me/mrplo/\n\n
> BOT Dibuat Oleh :\n> @MrHecka\n\n> Info Sosial Media : \n> Facebook : https://www.facebook.com/MrHecka/\n> Instagram : https://www.instagram.com/anone14_/\n\n_______________`)
})



bot.on(['/infomenu'], async (msg) => {

return bot.sendMessage
(msg.from.id, `_______________\n\n🤖INFO MENU🤖!\n\n===[Info Menu Fitur Heckayo]===\n\n    
/nulis = Untuk menulis tanpa membutuhkan pulpen atau kertas \n(Contoh Perintah : /nulis Nama : Ucup;Kelas : 3 SD;Absen : 28) Gunakan titik koma untuk mengganti baris!\n\n
/anime = Untuk mencari info seputar anime, jumlah episode, sinopsis, rating, dan lainnya \n(Contoh Perintah : /anime death note)\n\n
/ytmp4 = Untuk mendownload video dari youtube berformat mp4 \n(Contoh Perintah : /ytmp4 https://youtu.be/dQw4w9WgXcQ)\n\n
/ytmp3 = Untuk mendownload video dari youtube berformat mp3 \n(Contoh Perintah : /ytmp3 https://youtu.be/dQw4w9WgXcQ)\n\n
/cekresi = Untuk mengecek resi atau tracking paket lewat kurir dan resi yang di tulis \n(Contoh Perintah : /cekresi jne 4105xxxxxxxx320)\n\n
/brainly = Untuk mencari jawaban dari brainly \n(Contoh Perintah : /brainly kenapa bumi bulat)\n\n
/lirik = Untuk mencari lirik musik \n(Contoh Perintah : /lirik vierra seandainya)\n\n
/tiktokdl = Untuk mendownload video dari tiktok tanpa watermark \n(Contoh Perintah : /tiktokdl https://www.tiktok.com/@mrhecka/video/6888202589897248001)\n\n
/loli = Untuk mencari gambar loli secara random atau acak \n(Contoh Perintah : /loli)\n\n
/wallpaper = Untuk mencari gambar wallpaper kece secara random atau acak \n(Contoh Perintah : /wallpaper)\n\n
/animedl = Untuk mencari link download anime dengan berbagai resolusi \n(Contoh Perintah : /animedl death note)\n\n
/pasangan = Untuk mengukur dan mencari sisi positif/negatif kamu dengan pasanganmu \n(Contoh Perintah : /pasangan udin aurel)\n\n
/fbdl = Untuk mendownload video dari facebook \n(Contoh Perintah : /fbdl https://www.facebook.com/tahilalats/videos/438923400430514)
=====================\n\n
Nantikan fitur-fitur unik heckayo lainnya, stay tuned terus ya 🦾🤖\n
_______________
`)

})



// require disini!

require('./nulis.js')(bot)
require('./loli.js')(bot)
require('./anime.js')(bot)
require('./ytmp4.js')(bot)
require('./ytmp3.js')(bot)
require('./online.js')
require('./cekresi.js')(bot)
require('./brainly.js')(bot)
require('./lirik.js')(bot)
require('./tiktokdl.js')(bot)
require('./wallpaper.js')(bot)
require('./animedl.js')(bot)
require('./pasangan.js')(bot)
require('./fbdl.js')(bot)

// require disini!



bot.start()








