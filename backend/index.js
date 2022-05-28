const passageiroController = require('./controller/PassageiroController')
const motoristaController = require('./controller/MotoristaController')
const viagemController = require('./controller/ViagemController')
const bd = require('./banco/bd')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const porta = 3000

app.listen(porta,
    () => {
        bd.authenticate()
            .then(() => console.log('Connetado ao banco de dados'))
            .catch(err => console.error(err))

        bd.sync()
            .then(() => console.log('Modelos sincronizados'))
            .catch(err => console.log(err))
    }
)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//endpoints
app.get('/passageiros', passageiroController.getPassageirosPaginado)
app.get('/passageiro', passageiroController.getPassageiroPorEmail)
app.post('/passageiro', passageiroController.novoPassageiro)
app.delete('/passageiro', passageiroController.deletaPassageiro)

app.get('/motoristas', motoristaController.getMotoristasPaginado)
app.get('/motorista', motoristaController.getMotoristaPorEmail)
app.post('/motorista', motoristaController.novoMotorista)
app.delete('/motorista', motoristaController.deletaMotorista)

app.get('/viagens', viagemController.getViagensPaginado)
app.get('/viagem', viagemController.getViagem)
app.put('/viagem', viagemController.encerrarViagem)
app.post('/viagem', viagemController.novaViagem)
app.delete('/viagem', viagemController.deletaViagem)
