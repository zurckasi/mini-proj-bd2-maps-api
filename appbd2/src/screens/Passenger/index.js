import React, { useState, useEffect } from "react";

import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MapView from 'react-native-maps';
import * as Location from 'expo-location';


export default function Passenger() {

  let [location, setLocation] = useState({
    latitude: -6.9261399,
    longitude: -38.5897933,
    latitudeDelta: 0.14,
    longitudeDelta: 0.14,
  }
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});


      setLocation({
        latitude: JSON(location.coords.latitude),
        longitude: JSON(location.coords.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();

  }, []);
  return (

    <View style={styles.container}>
      <View styles={styles.contNav}>
        <TextInput placeholder="Informe seu Destino..." style={styles.input} />

        <TouchableOpacity
          style={styles.button}
        >
          <MaterialCommunityIcons name="map-search" size={35} color="white" />
        </TouchableOpacity>
      </View>

      <MapView style={styles.map} region={location} showsUserLocation />

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
    width: "90%",
    height: "70%",

  },
  button: {
    backgroundColor: "#A6038B",
    alignItems: "center",
    padding: 5,
    borderRadius: 25,
    marginBottom: 12,

  },
  bottonText: {
    color: '#FFF',


  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },

  contNav: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '90%',
    paddingBottom: 5,

  },
});

