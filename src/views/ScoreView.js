import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Colors, Button} from 'react-native-paper';

import {ScoreBar} from '../components/ScoreBar';

export default function ScoreView({navigation}) {
  const [text, setText] = useState('chofer');

  /* React.useEffect(() => {
      const setUserType = async () => {
        try {
          const userType = await AsyncStorage.getItem('user_type');
          if (userType == 'driver') {
            setText('chofer');
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      setUserType();
    }, []);*/

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Ayudanos a mejorar tu experiencia</Text>
        <ScoreBar/>
        <Button
          style={styles.button}
          color={Colors.blue800}
          mode="contained"
          onPress={() => {
            console.log('score');
            navigation.navigate('HomeView');
          }}>
          <Text style={styles.buttonText}>Calificar {text}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    marginTop: 170,
    height: 340,
    width: 350,
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: 'red',
  },
  button: {
    height: 45,
    width: 190,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.blue700,
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
});
