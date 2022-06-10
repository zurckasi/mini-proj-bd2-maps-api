const { DataTypes } = require('sequelize');
const banco = require('../banco/bd');

const Passageiro = banco.define('Passageiro'
    , {
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
    tableName: 'passageiro'
});



module.exports = Passageiro;