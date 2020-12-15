console.log('brainly1.js aktif!');

const TeleBot = require('telebot');
const delay = require('delay');
const brainly = require('brainly-scraper');


const bot = new TeleBot({
    token: process.env.TOKEN
});


module.exports = bot => {
    bot.on(/^\/brainly2 ([\s\S]+)/, async (msg, args) => {
        let arg = args.match[1];
        bot.sendMessage(msg.from.id, 'Sedang mencari jawaban...');
        brainly(arg).then((res) => {
            let brainlyResult = [];
            res.data.forEach((ask) => {
                let opt = {
                    pertanyaan: ask.pertanyaan,
                    fotoPertanyaan: ask.questionMedia
                };
                ask.jawaban.forEach(answer => {
                    opt.jawaban = {
                        judulJawaban: answer.text,
                        fotoJawaban: answer.media
                    };
                });
          
                brainlyResult.push(opt);
                });

let brainly1 = `${brainlyResult[0].fotoPertanyaan.toString().replace(/,/g, ' \n')}`;
let brainly11 = `${brainlyResult[0].jawaban.fotoJawaban.toString().replace(/,/g, ' \n')}`;
let brainly2 = `${brainlyResult[1].fotoPertanyaan.toString().replace(/,/g, ' \n')}`;
let brainly22 = `${brainlyResult[1].jawaban.fotoJawaban.toString().replace(/,/g, ' \n')}`;
let brainly3 = `${brainlyResult[2].fotoPertanyaan.toString().replace(/,/g, ' \n')}`;
let brainly33 = `${brainlyResult[2].jawaban.fotoJawaban.toString().replace(/,/g, ' \n')}`;
let brainly4 = `${brainlyResult[3].fotoPertanyaan.toString().replace(/,/g, ' \n')}`;
let brainly44 = `${brainlyResult[3].jawaban.fotoJawaban.toString().replace(/,/g, ' \n')}`;
let brainly5 = `${brainlyResult[4].fotoPertanyaan.toString().replace(/,/g, ' \n')}`;
let brainly55 = `${brainlyResult[4].jawaban.fotoJawaban.toString().replace(/,/g, ' \n')}`;


return bot.sendMessage
(msg.from.id, `
===[Brainly]===\n\n
1.) Pertanyaan : \n${brainlyResult[0].pertanyaan}\n
Jawaban : \n${brainlyResult[0].jawaban.judulJawaban}\n
Foto Pertanyaan : ${brainly1}\n
Foto Jawaban : ${brainly11}\n\n

2.) Pertanyaan : \n${brainlyResult[1].pertanyaan}\n
Jawaban : \n${brainlyResult[1].jawaban.judulJawaban}\n
Foto Pertanyaan : ${brainly2}\n
Foto Jawaban : ${brainly22}\n\n

3.) Pertanyaan : \n${brainlyResult[2].pertanyaan}\n
Jawaban : \n${brainlyResult[2].jawaban.judulJawaban}\n
Foto Pertanyaan : ${brainly3}\n
Foto Jawaban : ${brainly33}\n\n

4.) Pertanyaan : \n${brainlyResult[3].pertanyaan}\n
Jawaban : \n${brainlyResult[3].jawaban.judulJawaban}\n
Foto Pertanyaan : ${brainly4}\n
Foto Jawaban : ${brainly44}\n\n

5.) Pertanyaan : \n${brainlyResult[4].pertanyaan}\n
Jawaban : \n${brainlyResult[4].jawaban.judulJawaban}\n
Foto Pertanyaan : ${brainly5}\n
Foto Jawaban : ${brainly55}\n\n

=====================

`);
          }).catch((err)=> {
              return bot.sendMessage(msg.from.id, `ERROR | ${err}`);
          });
          
    
    
    });

};




