import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Driver() {
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
        latitudeDelta: 0.14,
        longitudeDelta: 0.14,
      });
    })();

  }, []);


  return (
    <View style={styles.container}>

      <Text>pagina Motorista</Text>
      <MapView style={styles.map} region={location} showsUserLocation />


      <TouchableOpacity
        style={styles.button}
      >
        <MaterialIcons name="person-search" size={35} color="white" />
      </TouchableOpacity>
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
    padding: 13,
    marginTop: 2,
    borderRadius: 25,
  }
});
