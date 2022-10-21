import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';

import {constants} from '../utils/Constants';

export default function Home({navigation}) {
  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={styles.categoryBtn}
        onPress={() => {
          console.log('log & navigate');
          navigation.navigate('MiPerfil');
        } }>
        <View style={styles.categoryIcon}>
          <Image
            source={{uri: constants.DEFAULT_URL_USER_PICTURE}}
            style={styles.image} />
          <Text style={styles.categoryBtnTxt}>Mi perfil</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 14,
  },
  image: {
    width: 60,
    height: 60,
  },
});
