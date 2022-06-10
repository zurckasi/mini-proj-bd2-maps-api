import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { newTrip, getPassenger } from '../../api'
import { AuthContext } from '../../contexts/authContext'


export default function Passenger() {

  const { user } = useContext(AuthContext)
  const [destination, setDestination] = useState(null)
  let [location, setLocation] = useState(null);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setLocation(await handleInitialRegion())
    })();

  }, []);

  const handleInitialRegion = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    return {
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
      ...coords
    }
  }


  const handleNewTrip = () => {
    getPassenger(user.mail).then(response => {
      const [userResponse] = response.data.rows

      if (userResponse.id) {
        newTrip(userResponse.id, destination).then(({status, data}) => {
          if(status === 201){
            alert("Viagem cadastrada!")
            setDestination(null)
          }
          if(status === 400){
            alert("Você ainda têm uma viagem em aberto")
          }
        }).catch(() => {
          alert("Erro ao cadastrar viagem")
          setDestination(null)
        })
      }
    }).catch()
  }
  return (

    <View style={styles.container}>
      <View styles={styles.contNav}>
        <Text style={styles.text} >Toque no mapa para informar um destino</Text>
        <TouchableOpacity
          style={styles.button}
          disabled={destination === null}
          onPress={() => handleNewTrip()}
        >
          <MaterialCommunityIcons name="car" size={35} color="white" />
          <Text style={styles.buttonText}>Solicitar viagem</Text>
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        region={location}
        showsUserLocation
        loadingEnabled
        onPress={e => setDestination(e.nativeEvent.coordinate)}
        mapType="hybrid"
      >
        {
          destination != null &&
          <Marker coordinate={destination} />
        }

      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1BBF2",
  },
  map: {
    margin: 0,
    width: "100%",
    height: "80%"
  },
  button: {
    backgroundColor: "#A6038B",
    alignItems: "center",
    alignSelf: "center",
    color: "#FFF",
    width: 150,
    padding: 5,
    borderRadius: 25,
    marginBottom: 12
  },
  buttonText: {
    color: '#FFF'
  },
  text: {
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 13,
    textAlign: "center",
    width: 250,
    marginBottom: 12,
    fontSize: 20,
  },

  contNav: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '90%',
    paddingBottom: 5,

  },
});

