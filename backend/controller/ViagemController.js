const Viagem = require('../model/Viagem')
const Passageiro = require('../model/Passageiro')

const viagemController = {
    getViagensPaginado: async (req, res) => {
        const pagina = req.query.pagina > 0 ? req.query.pagina : 1
        const itensPorPagina = req.query.itens || 10

        const { rows, count } = await Viagem.findAndCountAll({
            offset: (pagina - 1) * itensPorPagina,
            limit: itensPorPagina
        })

        if (count) {
            res.status(200)
            res.json({
                "viagens": rows,
                "totalDeItems": `${count}`,
                pagina,
                itensPorPagina
            })
        }
        else {
            res.status(404)
            res.send('Nenhuma viagem cadastrada')
        }
    },
    getViagem: async (req, res) => {
        const id = req.body.id
        if (id) {
            const viagem = await Viagem.findByPk(id)

            if (viagem) {
                res.status(200)
                res.send(viagem)
            }
            else {
                res.status(404)
                res.send('Viagem não encontrada')
            }
        }
        else {
            res.status(400)
            res.send('Bad request')
        }
    },
    encerrarViagem: async (req, res) => {
        const id = req.body.id
        if (id) {
            const viagem = await Viagem.findByPk(id)

            if (viagem) {
                if (viagem.getDataValue('encerrada') === '0') {
                    viagem.setDataValue('encerrada', '1')
                    await viagem.save()
                    res.status(200)
                    res.send('Viagem encerrada')
                }
                else {
                    res.status(400)
                    res.send('Viagem já encerrada')
                }
            }
            else {
                res.status(404)
                res.send('Viagem não encontrada')
            }
        }
        else {
            res.status(400)
            res.send('Bad request')
        }

    },
    novaViagem: async (req, res) => {
        const idPassageiro = req.body.idPassageiro
        let [longitude, latitude] = req.body.coordenadas ? req.body.coordenadas.split(',') : ""

        if (idPassageiro && longitude && latitude) {

            try {
                longitude = parseFloat(longitude)
                latitude = parseFloat(latitude)
                const passageiro = await Passageiro.findByPk(idPassageiro)

                if (
                    isNaN(longitude) || isNaN(latitude) ||
                    Number.isInteger(longitude) || Number.isInteger(latitude)
                )
                    throw new Error()

                if (!passageiro)
                    throw new Error()

                const viagemJaCadastrada = await Viagem.findAll({
                    where: {
                        idPassageiro,
                        encerrada: '0'
                    }
                })

                if (viagemJaCadastrada.length) {
                    res.status(400)
                    res.send('O Passageiro ainda tem uma viagem em andamento')
                }
                else {
                    const destino = { type: 'Point', coordinates: [longitude, latitude] };
                    const viagem = Viagem.build({ idPassageiro, destino })
                    await viagem.save()
                    res.status(201)
                    res.send('Viagem criada')
                }

            } catch (err) {
                res.status(500)
                res.send('Erro ao cadastrar viagem')
            }
        }
        else {
            res.status(400)
            res.send('Bad request')
        }
    },
    deletaViagem: async (req, res) => {
        const id = req.body.id;

        if (id != null && id.length) {
            try {
                if (await Viagem.destroy({ where: { id } })) {
                    res.status(200)
                    res.send('Viagem deletada')
                } else {
                    res.status(404)
                    res.send('Viagem não encontrada')
                }

            } catch (err) {
                res.status(500)
                res.send('Erro ao deletar viagem')
            }
        }
        else {
            res.status(400)
            res.send('Bad request')
        }
    }
}

module.exports = viagemController