const express = require('express');
const router = express.Router();

// tratamento autenticação

const Pessoa = require("../models/pessoa"); // importar coleção

router.post('/signup', (req, res) => {
    Pessoa.findOne({ email: req.body.email })
        .then(doc_pessoa => {
            if (doc_pessoa) {
                //já existe um documento com aquele email
                return res.status(400).json({ emailerror: "Email já registrado" });
            } else {
                //registrar (inserir a informação no bd)
                const novo_registro_pessoa = Pessoa({
                    name: req.body.name,
                    email: req.body.email,
                    senha: req.body.senha,
                    username: req.body.username,
                });


                //salva no bd
                novo_registro_pessoa
                    .save()
                    .then(p => res.json(p))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
});

router.get("/", (req, res) => res.json({ status: "Acesso permitido" }));

module.exports = router;