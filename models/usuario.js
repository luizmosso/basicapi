// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var Usuario = new mongoose.Schema({
    nome: String
});

// Return model
module.exports = restful.model('Usuario', Usuario);