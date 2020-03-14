const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//Iniciando o App
const app = express();
app.use(express.json()); //Permite o envio de dados para a aplicação no formato de Json
app.use(cors());

//Iniciando o DB
mongoose.connect(
	//'mongodb://localhost:27017/social_me',
	//'mongodb+srv://mangai:Jaqueira623@mundodata-nflb6.mongodb.net/test?retryWrites=true&w=majority',
	'mongodb+srv://mangai:Jaqueira623@mundo-data-testes-dmhji.mongodb.net/test?retryWrites=true&w=majority',
	{ useNewUrlParser: true }
);
//Testando DB
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded")
});

requireDir('./src/models');

//"use" aceita todos os tipos de requisição
app.use('/api', require("./src/routes"));

let port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});