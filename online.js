const { get } = require("snekfetch");
const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log("Pinging");
  response.sendStatus(200);
})

const listener = app.listen(process.env.PORT, () => {
	console.log('Your app is listening on port ' + listener.address().port);
})

setInterval(() => {
http.get('http://heckayo-bot-telegram.herokuapp.com');
}, 280000);





