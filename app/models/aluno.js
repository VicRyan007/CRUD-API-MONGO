/**
 * Arquivo: aluno.js
 * Autor: Ryan, Gabriel Aquino e Alfredo
 * Descrição: Arquivo modelo da classe produto
 */


    const mongoose = require('mongoose')
    const schema = mongoose.Schema

    /**
     * Corpo da classe
     * -> id: int
     * -> Nome: String
     * -> Matricula: number
     * -> Descrição: String
     * -> turma: 
     * */


    const AlunoSchema = new mongoose.Schema({
        id: String,
        nome: String,
        matricula: Number,
        idade: Number,
        turma: {
            nomeTurma: String
        }
    })

    module.exports = mongoose.model('Aluno',AlunoSchema)