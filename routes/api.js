// Dependecies
var express = require('express');
var router = express.Router();

// Models
var Autor = require('../models/autor');
var Livro = require('../models/livro');

// Routes
Livro.methods(['put', 'delete']);
Livro.route('get', function (req, res, next) {
    var params = {};
    if (req.params.id)
        params = { _id: req.params.id };

    Livro.find(params).populate('autor').exec()
        .then(livros => {
            res.send(livros);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

Livro.route('post', function (req, res, next) {
    var livro = new Livro(req.body);
    livro.save()
        .then(a => {
            Livro.find({}).populate('autor').exec()
                .then(livros => {
                    res.send(livros);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

Livro.register(router, '/livro');

Autor.methods(['get', 'put', 'delete']);
Autor.route('post', function (req, res, next) {
    var autor = new Autor(req.body);
    autor.save()
        .then(a => {
            Autor.find({}).exec()
                .then(autores => {
                    res.send(autores);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

Autor.register(router, '/autor');

// Return router
module.exports = router;
