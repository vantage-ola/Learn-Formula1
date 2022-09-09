import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Route from './src/navigation/route.stack';

export default function App() {
  return (
    <PaperProvider theme={theme}>
        <Route />
    </PaperProvider>
  );
}


{/* formula 1 main color #FF0100*/}
const theme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ff0100',
      secondary: '#000000',
      tertiary: '#c9c9c9'
    },
  };
  