import React, {useState} from 'react';
/* eslint-disable max-len */
import {SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, TextInput} from 'react-native';
import {Colors, Button, Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import scoreUser from '../services/ScoreUser';
export default function ScoreView({navigation, route}) {
  const [text, setText] = useState('pasajero');
  const id = route.params.id;

  const [defaultRating, setDefaultRating] = useState(2);
  /* eslint-disable no-unused-vars */
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starCornerUrl = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';
  const starFilledUrl = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';

  const ScoreBar = () => {
    return (
      <View style={styles.subcontainer}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setDefaultRating(item)}>
                <Image
                  style={styles.starImage}
                  source={
                          item <= defaultRating ?
                          {uri: starFilledUrl} :
                          {uri: starCornerUrl}
                  }
                />
              </TouchableOpacity>
            );
          })}
      </View>
    );
  };

  React.useEffect(() => {
    const getUserType = async () => {
      try {
        const user = await AsyncStorage.getItem('user_type');
        if (user !== 'driver') {
          setText('chofer');
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getUserType();
  }, []);
  const [comment, setComment] = useState('');
  const [visible, setVisible] = React.useState(false);

  const handleScoreUser = async () => {
    try {
      const userType = await AsyncStorage.getItem('user_type');
      const response = await scoreUser(userType, defaultRating, id, comment);
      setVisible(true);
    } catch (error) {
      alert('No se pudo puntuar correctamente al conductor');
      console.error(error.message);
      navigation.navigate('Home');
    }
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Ayudanos a mejorar tu experiencia</Text>
        <ScoreBar/>
        <TextInput
          style={styles.info}
          mode="outline"
          label="Comentario"
          placeholder='Dejá tu comentario aquí ...'
          onChangeText={(newComment) => setComment(newComment)}
        />
        <Button
          style={styles.button}
          color={Colors.blue800}
          mode="contained"
          onPress={() => {
            console.log('score');
            handleScoreUser();
          }}>
          <Text style={styles.buttonText}>Calificar {text}</Text>
        </Button>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => navigation.navigate('Home')}
        action={{
          label: 'Ok',
          onPress: () => {
            navigation.navigate('Home');
          },
        }}>
      El comentario se ha enviado correctamente
      </Snackbar>
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
    height: 350,
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
    marginBottom: 10,
  },
  scoreContainer: {
    backgroundColor: 'red',
  },
  button: {
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.blue700,
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15,
  },
  starImage: {
    width: 30,
    height: 30,
    margin: 5,
  },
  textScore: {
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    height: 55,
    width: '90%',
    margin: 15,
  },
});
