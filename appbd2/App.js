import React from 'react';

import { StatusBar } from 'react-native';
import AppRoutes from './src/routes';
import AuthProvider from './src/contexts/authContext';


export default function App() {

  return (
    <>

      <StatusBar backgroudColor="black" barStyle="light-content" hidden={true} />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>

  );
}


