import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, Button } from 'react-native-paper'

export default function App() {
  return (
    <Provider>
        <View style={styles.container}>
            <Text>Learn Formula 1</Text>
        <StatusBar style="auto" />
    </View>
    </Provider>

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
