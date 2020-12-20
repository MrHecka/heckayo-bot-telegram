console.log('bot.js aktif!')

const TeleBot = require('telebot')
const delay = require('delay')


const bot = new TeleBot({
    token: process.env.TOKEN
})


bot.on(['/start', '/halo'], async (msg) => {
    msg.reply.photo('https://avatars0.githubusercontent.com/u/71875420?s=400&u=5c417305130d96788de7e5add2627c32c236cfd9&v=4')
    await delay (100)
    bot.sendMessage(msg.from.id, `Halo Selamat Datang, ${msg.from.username}! ^_^`);
    await delay (500)
    return bot.sendMessage (
    msg.from.id, 'Halo ini adalah BOT Heckayo Versi Telegram😄!\n\n____________\n\nGunakan perintah /menu untuk melihat semua fitur yang ada di Bot Heckayo, dan gunakan perintah /infomenu untuk melihat informasi dan semua contoh perintah fitur yang ada di Bot Heckayo, terima kasih😉\n\n____________\n\n🤖VERSI BOT HECKAYO : v1.8🤖\n\nAdded /animedl2✅')
})

bot.on(['/menu'], async (msg) => {
    return bot.sendMessage
(msg.from.id, `_______________\n\n🤖LIST FITUR BOT HECKAYO🤖!\n\n
=====[DAFTAR MENU]=====\n> /nulis [teks]\n> /anime [nama anime]\n> /animedl [nama anime]\n> /animedl2 [nama anime]\n> /filmtrend\n> /filmdetail [angka 1-20]\n> /ytmp4 [link yt]\n> /ytmp3 [link yt]\n> /twtdl [link twitter]\n> /cekresi [kurir] [resi]\n> /brainly [pertanyaan]\n> /lirik [nama artis - judul lagu]\n> /tiktokdl [link tiktok]\n> /fbdl [link video facebook]\n> /qrcode [teks]\n> /pasangan [namamu] [nama pasanganmu]\n> /translate [teks]\n> /terjemahan [teks]\n> /rangkum [teks]\n> /loli\n> /wallpaper\n> /slots\n========================\n\n
=====[CATATAN]=====\n> Tolong bot nya jangan di spam😣\n> Cintai bot nya seperti kamu mencintai dia🤗\n> Semua perintah yang membutuhkan teks tidak perlu menggunakan tanda []👈\n> Masih bingung dengan fitur heckayo🤨? gunakan perintah /infomenu\n> Bot masih dalam tahap pengembangan🔧\n> Terima kasih sudah menggunakan Bot Heckayo😍\n===================\n\n
> Beritahu pembuat bot jika saya mati atau jika kamu menemukan bug dan perintah yang malfungsi :\n> https://t.me/MrHecka\n\n
> Support bot ini dengan cara donasi ke :\n> https://saweria.co/heckayo\n> https://paypal.me/mrplo/\n\n
> BOT Dibuat Oleh :\n> @MrHecka\n\n> Info Sosial Media : \n> Facebook : https://www.facebook.com/MrHecka/\n> Instagram : https://www.instagram.com/anone14_/\n\n_______________`)
})



bot.on(['/infomenu'], async (msg) => {

return bot.sendMessage
(msg.from.id, `_______________\n\n🤖INFO MENU🤖!\n\n===[Info Menu Fitur Heckayo]===\n\n    
/nulis = Untuk menulis tanpa membutuhkan pulpen atau kertas \n(Contoh Perintah : /nulis Halo nama saya ucup)\n\n
/anime = Untuk mencari info seputar anime, jumlah episode, sinopsis, rating, dan lainnya \n(Contoh Perintah : /anime death note)\n\n
/ytmp4 = Untuk mendownload video dari youtube berformat mp4 \n(Contoh Perintah : /ytmp4 https://youtu.be/dQw4w9WgXcQ)\n\n
/ytmp3 = Untuk mendownload video dari youtube berformat mp4 \n(Contoh Perintah : /ytmp3 https://youtu.be/dQw4w9WgXcQ)\n\n
/cekresi = Untuk mengecek resi atau tracking paket lewat kurir dan resi yang di tulis \n(Contoh Perintah : /cekresi jne 4105xxxxxxxx320)\n\n
/brainly = Untuk mencari jawaban dari brainly \n(Contoh Perintah : /brainly kenapa bumi bulat)\n\n
/lirik = Untuk mencari lirik musik \n(Contoh Perintah : /lirik vierra seandainya)\n\n
/tiktokdl = Untuk mendownload video dari tiktok tanpa watermark \n(Contoh Perintah : /tiktokdl https://www.tiktok.com/@mrhecka/video/6888202589897248001)\n\n
/loli = Untuk mencari gambar loli secara random atau acak \n(Contoh Perintah : /loli)\n\n
/wallpaper = Untuk mencari gambar wallpaper kece secara random atau acak \n(Contoh Perintah : /wallpaper)\n\n
/animedl = Untuk mencari link download anime dengan berbagai resolusi \n(Contoh Perintah : /animedl death note < Sama dengan /animedl2)\n\n
/pasangan = Untuk mengukur dan mencari sisi positif/negatif kamu dengan pasanganmu \n(Contoh Perintah : /pasangan udin aurel)\n\n
/fbdl = Untuk mendownload video dari facebook \n(Contoh Perintah : /fbdl https://www.facebook.com/tahilalats/videos/438923400430514)\n\n
/translate = Untuk menerjemahkan dari bahasa inggris ke bahasa indonesia\n(Contoh Perintah : /translate you so beautiful)\n\n
/terjemahan = Untuk menerjemahkan dari bahasa indonesia ke bahasa inggris\n(Contoh Perintah : /terjemahan kamu sangat cantik)\n\n
/rangkum = Untuk merangkum teks, *harap gabung semua kata dan jangan sampai ada garis baru atau shift+enter\n(Contoh Perintah : /rangkum Dulu, penelitian tentang sejarah terbatas pada penelitian...........dst)\n\n
/twtdl = Untuk mendownload video dari twitter \n(Contoh : /twtdl https://twitter.com/i/status/1338407494339624962)\n\n
/qrcode = Untuk merubah teks atau link yang kamu tulis menjadi sebuah kode QR \n(Contoh Perintah : /qrcode https://google.com)\n\n
/filmtrend = Untuk melihat film trending di minggu ini \n(Contoh Perintah : /filmtrend)\n\n
/filmdetail = Untuk melihat detail filmtrend lebih lengkap \n(Contoh Perintah : /filmdetail 1)\n\n
/slots = Untuk bermain game slots casino \n(Contoh Perintah : /slots)\n\n

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
require('./cekresi.js')(bot)
require('./brainly.js')(bot)
require('./lirik.js')(bot)
require('./tiktokdl.js')(bot)
require('./wallpaper.js')(bot)
require('./animedl.js')(bot)
require('./animedl2.js')(bot)
require('./pasangan.js')(bot)
require('./fbdl.js')(bot)
require('./translate.js')(bot)
require('./terjemahan.js')(bot)
require('./rangkum.js')(bot)
require('./twtdl.js')(bot)
require('./qrcode.js')(bot)
require('./slots.js')(bot)
require('./filmtrend.js')(bot)
require('./filmtrenddetail.js')(bot)

// require disini!




bot.start()






