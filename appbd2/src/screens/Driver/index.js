import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, SliderBase } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { findNearTrips } from '../../api'

export default function Driver() {
  let [location, setLocation] = useState(null);
  const [nearTrips, setNearTrips] = useState([])
  const [latitudeDelta, setLatitudeDelta] = useState(0.001)
  const [longitudeDelta, setLongitudeDelta] = useState(0.001)
  const [nearTripsMarkers, setNearTripsMarkers] = useState([])


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setLocation(await handleInitialRegion())
    })();

  }, []);


  const handleFindNearTrips = () => {
    findNearTrips(location, 0.5).then(response => {
      if (response !== null && response.status === 200) {
        
        let maximumLatitude = Number.MIN_SAFE_INTEGER
        let maximumLongitude = Number.MIN_SAFE_INTEGER
        
        const markers = response.data.map(m => {
          const [longitude, latitude] = m.destino.coordinates

          if(latitude > maximumLatitude){
            maximumLatitude = latitude
          }
          if(longitude > maximumLongitude){
            maximumLongitude = longitude
          }

          return { longitude, latitude }
        })

        
        setLocation({
          ...location,
          latitudeDelta: Math.abs((maximumLatitude  - location.latitude)) * 5,
          longitudeDelta: Math.abs((maximumLongitude - location.longitude)) * 5
        })
        setNearTrips(response.data)
        setNearTripsMarkers(markers)
      }
    }
    ).catch()
  }

  const handleInitialRegion = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    return {
      latitudeDelta,
      longitudeDelta,
      ...coords
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location}
        showsUserLocation
        loadingEnabled
        mapType="hybrid"
      >
        {
          nearTripsMarkers.length > 0 &&
          nearTripsMarkers.map(
            (m, index) => {
              return <Marker coordinate={m} key={index}/>
            }
        )}
      </MapView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleFindNearTrips()}
      >
        <MaterialIcons name="person-search" size={35} color="white" />
        <Text style={styles.text}>Buscar passageiros</Text>
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
    width: "100%",
    height: "80%",
    marginBottom: 50
  },
  button: {
    backgroundColor: "#A6038B",
    alignSelf: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 2,
    borderRadius: 25,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }
});
