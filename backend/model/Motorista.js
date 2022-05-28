const { DataTypes } = require('sequelize');
const banco = require('../banco/bd');


const Motorista = banco.define('Motorista', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    localizacaoAtual: {
        type: DataTypes.GEOMETRY,
        allowNull: false
    }
}, {
    tableName: 'motorista'
})

module.exports = Motorista;