/**
 * Arquivo: product.js
 * Autor: Ryan
 * Descrição: Arquivo modelo da classe produto
 */


    const mongoose = require('mongoose')
    const schema = mongoose.Schema

    /**
     * Corpo da classe
     * -> id: int
     * -> Nome: String
     * -> Preço: number
     * -> Description: String
     * */


    const ProductSchema = new mongoose.Schema({
        nome: String,
        preco: Number,
        descricao: String
    })

    module.exports = mongoose.model('Product',ProductSchema)