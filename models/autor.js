// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var Autor = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
});

// Return model
module.exports = restful.model('Autor', Autor);