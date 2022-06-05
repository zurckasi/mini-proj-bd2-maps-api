import React from "react";

import { View, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { Container } from ".styles";
export default function Passenger() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>pagina Passageiro</Text>
      <MaterialCommunityIcons name="car-arrow-right" size={24} color="black" />


    </View>
  );
}
