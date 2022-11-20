import React, {useState} from 'react';
/* eslint-disable max-len */
import {SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import scoreUser from '../services/ScoreUser';

export default function ScoreView({navigation, route}) {
  const [text, setText] = useState('chofer');
  const [userType, setUserType] = useState('driver');
  const [id, setId] = useState(route.params.id);

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
        const userType = await AsyncStorage.getItem('user_type');
        if (userType != 'driver') {
          setText('chofer');
          setUserType('passenger');
          setId(id);
        } else {
          setId(id);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getUserType();
  }, []);

  const handleScoreUser = async () => {
    try {
      const response = await scoreUser(userType, defaultRating, id);
      console.log('response score user:', response);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error.message);
    }
  };

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
            handleScoreUser();
          }}>
          <Text style={styles.buttonText}>Calificar {text}</Text>
        </Button>
        <Text style={styles.textScore}>
          {defaultRating + '/' + maxRating.length}
        </Text>
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
  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30,
  },
  starImage: {
    width: 30,
    height: 30,
    margin: 5,
  },
  textScore: {
    fontSize: 16,
  },
});
