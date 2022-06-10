import React from 'react';

import { StatusBar } from 'react-native';
import AppRoutes from './src/routes';
import AuthProvider from './src/contexts/authContext';
import { LogBox } from "react-native";


export default function App() {


  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
  ])

  return (
    <>

      <StatusBar backgroudColor="black" barStyle="light-content" hidden={true} />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>

  );
}


