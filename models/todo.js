var Usuario = require('./usuario');


// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var Todo = new mongoose.Schema({
    titulo: String,
    data: { type: Date, default: Date.now },
    usuario: {type: mongoose.Schema.Types.ObjectId,  ref: 'Usuario'}
});

// Return model
module.exports = restful.model('Todo', Todo);