import React from 'react';

import { StatusBar } from 'react-native';
import AppRoutes from './src/routes';



export default function App() {

  return (
    <>

      <StatusBar backgroudColor="black" barStyle="light-content" hidden={true} />
      <AppRoutes />
    </>

  );
}


