// Dependecies
var express = require('express');
var router = express.Router();

// Models
var Autor = require('../models/autor');
var Livro = require('../models/livro');
var Usuario = require('../models/usuario');
var Todo = require('../models/todo');

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


Usuario.methods(['get', 'put', 'delete']);
Usuario.route('post', function (req, res, next) {

    if (!validaCampos(req.body, Usuario)) {
        res.status(406).json({ erro: "Todos os campos devem ser preenchidos!" });
        return;
    }

    Usuario.find({ nome: req.body.nome }).exec()
        .then(usuarios => {
            if (usuarios.length > 0) {
                res.status(403).json({ error: "Já existe um usuário cadastrado com esse nome!" });
                return;
            }
            var usuario = new Usuario(req.body);
            usuario.save()
                .then(a => {
                    Usuario.find({}).exec()
                        .then(usuarios => {
                            res.send(usuarios);
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
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
Usuario.register(router, '/usuario');

Todo.methods(['put', 'delete']);
Todo.route('get', function (req, res, next) {
    if (!req.params.id) {
        res.status(406).json({ error: "É necessário passar o id do usuário Ex.: todo/[id_do_usuario]" });
        return;
    }

    var params = { usuario: req.params.id };

    Todo.find(params).populate('usuario').exec()
        .then(todos => {
            res.send(todos);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

Todo.route('post', function (req, res, next) {

    if (!validaCampos(req.body, Todo)) {
        res.status(406).json({ erro: "Todos os campos devem ser preenchidos!" });
        return;
    }

    var todo = new Todo(req.body);
    todo.save()
        .then(a => {
            Todo.find({}).populate('usuario').exec()
                .then(todos => {
                    res.send(todos);
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

Todo.register(router, '/todo');

var validaCampos = function (campos, model) {

    var modelfields = model.schema.paths;
    if (!Object.keys(campos).length)
        return false;

    for (var prop in modelfields) {
        if (prop.search("_") !== 0) {
            if (campos[prop]) {
                if (campos[prop] === "") {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }

    return true
};



// Return router
module.exports = router;
