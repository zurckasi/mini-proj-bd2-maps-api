import React, { useEffect, useState } from "react";
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
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { Container } from "./styles";

export default function Home() {
  const navigation = useNavigation();
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  return (
    <Container>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem Vinde </Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}> Nome</Text>
        <TextInput placeholder="Digite seu Nome" style={styles.input} />

        <Text style={styles.title}> Email</Text>
        <TextInput placeholder="Digite seu Email" style={styles.input} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalActive(true)}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>

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
              onPress={() => navigation.navigate("Driver")}
            >
              <Text style={styles.buttonText}> Motorista</Text>
              <Ionicons name="car-sport" size={35} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => navigation.navigate("Passenger")}
            >
              <Text style={styles.buttonText}> Passageiro</Text>
              <MaterialIcons name="directions-walk" size={36} color="#fff" />
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
