import axios from 'axios'

const instance = axios.create({
    //usar ip do computador para acessar localhost
    baseURL: 'http://192.168.1.107:3000'
});


//motorista
const createDriver = async (nome, email, coordenadas) => {
    try {
        const { longitude, latitude } = coordenadas
        const { status, data } = await instance.post('/motorista', {
            nome,
            email,
            "coordenadas": `${longitude}, ${latitude}`
        });

        return { status, data }

    } catch (err) {
        console.error(err)
        return null
    }
}

//passageiro
const createPassenger = async (nome, email, coordenadas) => {
    try {
        const { longitude, latitude } = coordenadas
        const { status, data } = await instance.post('/passageiro', {
            nome,
            email,
            "coordenadas": `${longitude}, ${latitude}`
        })

        return { status, data }

    } catch (err) {
        console.error(err)
        return null
    }
}

const getPassenger = async (email) => {
    try {
        const { status, data } = await instance.post("/passageiro/busca", {
            email
        })
        return { status, data }

    } catch (err) {
        console.error(err)
        return null
    }
}

const newTrip = async (idPassageiro, coordenadas) => {
    const { longitude, latitude } = coordenadas
    try {
        const { status, data } = await instance.post("/viagem", {
            idPassageiro,
            "coordenadas": `${longitude}, ${latitude}`
        })

        return { status, data }

    } catch (err) {
        console.error(err)
        return null
    }

}

const findNearTrips = async (coordenadas, raio) => {
    const { longitude, latitude } = coordenadas
    try {

        const { status, data } = await instance.post("/motorista/viagens", {
            "coordenadas": `${longitude}, ${latitude}`,
            raio

        })

        return { status, data }

    } catch (err) {
        console.error(err)
        return null
    }
}

export { createDriver, createPassenger, getPassenger, newTrip, findNearTrips }