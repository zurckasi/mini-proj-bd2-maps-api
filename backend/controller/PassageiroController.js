const Passageiro = require('../model/Passageiro')

const passageiroController = {
    getPassageirosPaginado: async (req, res) => {
        const pagina = req.query.pagina > 0 ? req.query.pagina : 1
        const itensPorPagina = req.query.itens || 10

        const { rows, count } = await Passageiro.findAndCountAll({
            offset: (pagina - 1) * itensPorPagina,
            limit: itensPorPagina
        })

        if (count) {
            res.status(200)
            res.json({
                "passageiros": rows,
                "totalDeItems": `${count}`,
                pagina,
                itensPorPagina
            })
        }
        else {
            res.status(404)
            res.send('Nenhum passageiro cadastrado')
        }
    },
    getPassageiroPorEmail: async (req, res) => {
        const email = req.body.email

        if (email != null && email.length) {
            const passageiro = await Passageiro.findAndCountAll({ where: { email } })

            if (passageiro.count) {
                res.status(200)
                res.send(passageiro)
            }
            else {
                res.status(404)
                res.send('Passageiro não encontrado')
            }
        } else {
            res.status(400)
            res.send('E-mail do passageiro não informado')
        }
    },
    novoPassageiro: async (req, res) => {
        const nome = req.body.nome;
        const email = req.body.email;
        let [longitude, latitude] = req.body.coordenadas ? req.body.coordenadas.split(',') : ""

        if (nome && email && longitude && latitude) {

            try {
                longitude = parseFloat(longitude)
                latitude = parseFloat(latitude)

                if (
                    isNaN(longitude) || isNaN(latitude) ||
                    Number.isInteger(longitude) || Number.isInteger(latitude)
                )
                    throw new Error()

                const localizacaoAtual = { type: 'Point', coordinates: [longitude, latitude] };
                const passageiro = Passageiro.build({ nome, email, localizacaoAtual })
                await passageiro.save()
                res.status(201)
                res.send('Passageiro criado')
            } catch (err) {
                if (err.name === 'SequelizeUniqueConstraintError') {
                    res.status(400)
                    res.send('Passageiro já criado')
                }
                else {
                    res.status(500)
                    res.send('Erro ao criar passageiro')
                }
            }
        }
        else {
            res.status(400)
            res.send('Bad request')
        }
    },
    deletaPassageiro: async (req, res) => {
        const email = req.body.email

        if (email != null && email.length) {
            if (await Passageiro.destroy({ where: { email } })) {
                res.status(200)
                res.send('Passageiro excluido')
            }
            else {
                res.status(404)
                res.send('Passageiro não encontrado')
            }
        }
        else {
            res.status(400)
            res.send('Bad request')
        }
    }
}

module.exports = passageiroController