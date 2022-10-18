/**
 * Arquivo: server.js
 * Descrição: Responsável pelo funcionamento do servidor 
 * Autor: Ryan, Gabriel Aquino e Alfredo
 */

//Chamadas de pacotes
const express = require('express')
const app = express()
const bodyparser = require("body-parser")
const mongoose = require('mongoose')
const Aluno = require('./app/models/aluno')
const  {Router}  = require('express')

//URI do mongodb
mongoose.connect('mongodb://127.0.0.1:27017/crud_rest_mongo')

//Configuração da variável app para usar o body-parser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

//Porta onde será executada a API
const port =  8000;

//===============================
//Rotas



//=================================

// Criando instância das rotas via Express
const router = express.Router()

router.use(function (req, res, next) {
    console.log('Something happening over here...')
    next()
})

// Rota de exemplo
router.get('/', function (req, res) {
    res.json({ msg: "hello" })
})

// Definindo padrão das rotas prefixadas: '/api'
app.use('/api', router)

//API´s:
//==============================================

//Rotas que terminarem com '/alunos' (servir: GET ALL & POST)
router.route('/alunos')
 /* 1) Método: Criar Aluno (acessar em: POST http://localhost:8000/api/alunos)  */
 .post(function(req, res) {
    var aluno = new Aluno();

    //Aqui vamos setar os campos do aluno (via request):
    aluno.nome = req.body.nome;
    aluno.matricula = req.body.matricula;
    aluno.idade = req.body.idade;
    aluno.turma.nomeTurma = req.body.nomeTurma;

    aluno.save(function(error) {
        if(error)
            res.send('Erro ao tentar salvar o Aluno....: ' + error);
        
        res.json({ message: 'Aluno Cadastrado com Sucesso!' });
    });
})

/* 2) Método: Selecionar Todos Alunos (acessar em: GET http://localhost:8000/api/alunos)  */
.get(function(req, res) {
    Aluno.find(function(error, alunos) {
        if(error) 
            res.send('Erro ao tentar Selecionar Todos os alunos...: ' + error);

        res.json(alunos);
    });
});

//Rotas que irão terminar em '/alunos/:aluno_id' (servir tanto para: GET, PUT & DELETE: id):
router.route('/alunos/:aluno_id')

/* 3) Método: Selecionar por Id: (acessar em: GET http://localhost:8000/api/alunos/:aluno_id) */
.get(function (req, res) {
    
    //Função para poder Selecionar um determinado aluno por ID - irá verificar se caso não encontrar um detemrinado
    //aluno pelo id... retorna uma mensagem de error:
    Aluno.findById(req.params.aluno_id, function(error, aluno) {
        if(error)
            res.send('Id do Aluno não encontrado....: ' + error);

        res.json(aluno);
    });
})

/* 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:8000/api/alunos/:aluno_id) */
.put(function(req, res) {

    //Primeiro: para atualizarmos, precisamos primeiro achar 'Id' do 'Aluno':
    Aluno.findById(req.params.aluno_id, function(error, aluno) {
        if (error) 
            res.send("Id do Aluno não encontrado....: " + error);

            var nomedb = aluno.nome
            var matriculadb = aluno.matricula
            var idadedb = aluno.idade
            var nomeTurma = aluno.turma.nomeTurma

            //Segundo: 
            aluno.nome =  req.body.nome ? req.body.nome : nomedb ;
            aluno.matricula = req.body.matricula ? req.body.matricula : matriculadb;
            aluno.idade = req.body.idade ? req.body.idade : idadedb;
            aluno.turma.nomeTurma = req.body.nomeTurma ? req.body.nomeTurma : nomeTurma;

            //Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
            aluno.save(function(error) {
                if(error)
                    res.send('Erro ao atualizar o aluno....: ' + error);

                res.json({ message: 'Aluno atualizado com sucesso!' });
            });
        });
    })

    /* 5) Método: Excluir por Id (acessar: http://localhost:8000/api/alunos/:aluno_id) */
    .delete(function(req, res) {
        
        Aluno.remove({
            _id: req.params.aluno_id
            }, function(error) {
                if (error) 
                    res.send("Id do Aluno não encontrado....: " + error);

                res.json({ message: 'Aluno Excluído com Sucesso!' });
            });
        });


// Iniciando aplicação (server)
app.listen(port)
console.log("Run on port 8000 !!!")

