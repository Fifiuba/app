import React, {useState} from 'react';
/* eslint-disable max-len */
import {SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, TextInput} from 'react-native';
import {Colors, Button, Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import scoreUser from '../services/ScoreUser';
import {error} from '../utils/HandleError';
import InfoModal from '../components/InfoModal';

export default function ScoreView({navigation, route}) {
  const id = route.params.id;
  console.log(route.params);

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

  const [comment, setComment] = useState('');
  const [visible, setVisible] = React.useState(false);

  const [scored, setScored] = React.useState(false);
  const [text, setText] = useState('');

  const handleScoreUser = async () => {
    try {
      const userType = await AsyncStorage.getItem('user_type');
      await scoreUser(userType, defaultRating, id, comment);
      setScored(true);
      setText('Calificación exitosa');
      navigation.navigate('Home');
    } catch (err) {
      console.log(err.message);
      setText(error.SCORE_USER_ERROR);
      setVisible(true);
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
          color={Colors.blue700}
          mode="contained"
          onPress={() => {
            console.log('score');
            handleScoreUser();
          }}>
          <Text style={styles.buttonText}>Aceptar</Text>
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
        {text}
      </Snackbar>
      { scored && <InfoModal modalText={text}/>}
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
