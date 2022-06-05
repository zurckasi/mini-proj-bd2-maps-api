const { Sequelize, QueryTypes } = require("sequelize");
const Motorista = require("../model/Motorista");
const Viagem = require("../model/Viagem");

const motoristaController = {
  getMotoristasPaginado: async (req, res) => {
    const pagina = req.query.pagina > 0 ? req.query.pagina : 1;
    const itensPorPagina = req.query.itens || 10;

    const { rows, count } = await Motorista.findAndCountAll({
      offset: (pagina - 1) * itensPorPagina,
      limit: itensPorPagina,
    });

    if (count) {
      res.status(200);
      res.json({
        motoristas: rows,
        totalDeItems: `${count}`,
        pagina,
        itensPorPagina,
      });
    } else {
      res.status(404);
      res.send("Nenhum motorista cadastrado");
    }
  },
  getMotoristaPorEmail: async (req, res) => {
    const email = req.body.email;

    if (email != null && email.length) {
      const motorista = await Motorista.findAll({ where: { email } });

      if (motorista) {
        res.status(200);
        res.send(motorista);
      } else {
        res.status(404);
        res.send("Motorista não encontrado");
      }
    } else {
      res.status(400);
      res.send("E-mail do motorista não informado");
    }
  },
  novoMotorista: async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    let [longitude, latitude] = req.body.coordenadas
      ? req.body.coordenadas.split(",")
      : "";

    if (nome && email && longitude && latitude) {
      try {
        longitude = parseFloat(longitude);
        latitude = parseFloat(latitude);

        if (
          isNaN(longitude) ||
          isNaN(latitude) ||
          Number.isInteger(longitude) ||
          Number.isInteger(latitude)
        )
          throw new Error();

        const localizacaoAtual = {
          type: "Point",
          coordinates: [longitude, latitude],
        };
        const motorista = Motorista.build({ nome, email, localizacaoAtual });
        await motorista.save();
        res.status(201);
        res.send("Motorista cadastrado");
      } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
          res.status(400);
          res.send("Motorista já cadastrado");
        } else {
          res.status(500);
          res.send("Erro ao cadastrar motorista");
        }
      }
    } else {
      res.status(400);
      res.send("Bad request");
    }
  },
  deletaMotorista: async (req, res) => {
    const email = req.body.email;

    if (email != null && email.length) {
      try {
        if (await Motorista.destroy({ where: { email } })) {
          res.status(200);
          res.send("Motorista deletado");
        } else {
          res.status(404);
          res.send("Motorista não encontrado");
        }
      } catch (err) {
        res.status(500);
        res.send("Erro ao deletar motorista");
      }
    } else {
      res.status(400);
      res.send("Bad request");
    }
  },

  iniciarViagem: async (req, res) => {
    const idViagem = req.body.idViagem;
    const idMotorista = req.body.idMotorista;

    if (idViagem && idMotorista) {
      const viagem = await Viagem.findByPk(idViagem);
      viagem.idMotorista = idMotorista;
      viagem.status = "1";
      await viagem.save();
      res.status(200);
      res.send("Viagem Iniciada");
    } else {
      res.status(400);
      res.send("Erro ao processar viagem");
    }
  },
  buscarViagensPeloRaio: async (req, res) => {
    let [longitude, latitude] = req.body.coordenadas
      ? req.body.coordenadas.split(",")
      : "";
    const raio = req.body.raio;
    const result = await Viagem.sequelize.query(
      `select v.* from viagem v
      inner join passageiro p
        on p.id=v."idPassageiro"
      where ST_Distance
      (ST_Centroid(p."localizacaoAtual"),
      ST_Centroid(ST_MakePoint(${longitude},${latitude}))) * 40075 / 360 <= ${raio}
      and v.status = '0'`,
      { type: QueryTypes.SELECT }
    );

    if (result) {
      res.status(200);
      res.send(result);
    } else {
      res.status(200);
      res.send("Deu ruim");
    }
  },
};

module.exports = motoristaController;
