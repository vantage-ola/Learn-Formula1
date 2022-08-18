import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, Button, Title, Paragraph } from 'react-native-paper';
import HomeScreen from './screens/home';

export default function App() {
  return (
        <HomeScreen/>
  );
}


{/* formula 1 main color #FF0100*/}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
