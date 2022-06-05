const { DataTypes, UUID } = require('sequelize');
const banco = require('../banco/bd');
const Motorista = require('./Motorista')
const Passageiro = require('./Passageiro')

const Viagem = banco.define('viagem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idMotorista: {
        type: UUID,
        allowNull: true,
        references: {
            model: Motorista,
            key: 'id'
        }
    },
    idPassageiro: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Passageiro,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: '0'
    },
    destino: {
        type: DataTypes.GEOMETRY,
        allowNull: false
    }
}, {
    tableName: 'viagem'
})



module.exports = Viagem