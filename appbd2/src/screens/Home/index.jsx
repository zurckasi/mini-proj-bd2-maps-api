import React, { useEffect, useState, useContext } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
  Modal,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import { Container } from "./styles";
import { AuthContext } from '../../contexts/authContext'

import { createDriver, createPassenger } from '../../api'

export default function Home() {
  const navigation = useNavigation();
  const [modalActive, setModalActive] = useState(false);
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { setUserContext } = useContext(AuthContext)


  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
    (async () => await handleLocation())()


  }, []);

  const handleCreateDriver = async () => {

    setErrorMsg(null)
    
    if(!nome && !email){
      setErrorMsg("Nome e e-mail são obrigatórios")
      setModalActive(false)
      return
    }

    setUserContext(nome, email)
    
    if(currentLocation === null){
      setErrorMsg("Não foi possivel acessar a localização do dispositivo")
      return
    }

    createDriver(nome, email, currentLocation.coords)
      .then(response => {
        if (response !== null && response.status === 201) {
          navigation.navigate("Driver")
        }
        else {
          setErrorMsg("Erro ao cadastrar motorista")
        }
      })
      .catch(() => setErrorMsg("Erro ao cadastrar motorista"))

    setNome("")
    setEmail("")
    setModalActive(false)
  }

  const handleCreatePassenger = function () {
    setErrorMsg(null)
    
    if(!nome && !email){
      setErrorMsg("Nome e e-mail são obrigatórios")
      setModalActive(false)
      return
    }

    setUserContext(nome, email)
    console.log(currentLocation)

    if(currentLocation === null){
      setErrorMsg("Não foi possivel acessar a localização do dispositivo")
      return
    }

    createPassenger(nome, email, currentLocation.coords)
      .then(response => {
        if (response !== null && response.status === 201) {
          navigation.setParams(currentLocation)
          navigation.navigate("Passenger")
        }
        else {
          setErrorMsg("Erro ao cadastrar passageiro")
        }
      })
      .catch(() => setErrorMsg("Erro ao cadastrar passageiro"))

    setNome("")
    setEmail("")
    setModalActive(false)
  }

  const handleLocation = async () => {
    setErrorMsg(null)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('A aplicação necessita do acesso a localização');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location);
  }

  return (
    <Container>
      <View style={styles.containerHeader}>
        <Text style={styles.message}>Bem Vindo</Text>
      </View>

      <View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}> Nome</Text>
        <TextInput placeholder="Digite seu Nome" style={styles.input} value={nome} onChangeText={(input) => setNome(input)} />

        <Text style={styles.title}> Email</Text>
        <TextInput placeholder="Digite seu Email" style={styles.input} value={email} onChangeText={(input) => setEmail(input)} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalActive(true)}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalActive}
        onRequestClose={() => setModalActive(false)}
      >
        <View style={styles.outerView}>
          <View style={styles.modalView}>
            <Text style={styles.titleModal}> Escolha seu Perfil:</Text>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => handleCreateDriver()}
            >
              <Text style={styles.buttonText}> Motorista</Text>
              <Ionicons name="car-sport" size={35} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => handleCreatePassenger()}
            >
              <Text style={styles.buttonText}> Passageiro</Text>
              <MaterialIcons name="directions-walk" size={36} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={errorMsg !== null}
        onRequestClose={async () => await handleLocation()}
      >
        <View style={styles.outerView}>
          <View style={styles.modalView}>
            <Text style={styles.titleModal}>{errorMsg}</Text>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={async () => await handleLocation()}
            >
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    color: "#A6038B",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#A6038B",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  outerView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F1BBF2",
  },
  modalView: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: "90%",
    alignItems: "stretch",
    padding: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  buttonModal: {
    backgroundColor: "#A6038B",
    alignItems: "center",
    padding: "2%",
    marginTop: 20,
    borderRadius: 10,
  },
  titleModal: {
    paddingStart: "19%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#A6038B",
  },
});
