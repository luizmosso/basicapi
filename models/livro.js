var Autor = require('./autor');

// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var livroSchema = new mongoose.Schema({
    titulo: String,
    preco: Number,
    autor: {type: mongoose.Schema.Types.ObjectId,  ref: 'Autor'}
});

// Return model
module.exports = restful.model('Livro', livroSchema);