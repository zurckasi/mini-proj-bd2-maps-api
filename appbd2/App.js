import React from 'react';
// import {
//   useFonts,
//   Roboto_400Regular,
//   Roboto_500Medium,
//   Roboto_700Bold
// } from '@expo-google-fonts/roboto';
// import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native'
import THEME from './src/themes';
import { StatusBar } from 'react-native';
import AppRoutes from './src/routes';



export default function App() {
  // const [robotoLoaded] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_500Medium,
  //   Roboto_700Bold
  // });

  // if (!robotoLoaded) {
  //   return <AppLoading />;
  // }
  return (
    <ThemeProvider theme={THEME}>
      <StatusBar backgroudColor="black" barStyle="light-content" hidden={true} />
      <AppRoutes />
    </ThemeProvider>
  );
}


