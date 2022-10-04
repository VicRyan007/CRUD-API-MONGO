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
     * */


    const AlunoSchema = new mongoose.Schema({
        nome: String,
        matricula: Number,
        descricao: String,
    })

    module.exports = mongoose.model('Aluno',AlunoSchema)