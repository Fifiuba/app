import React, {useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';

import {UserContext} from '../context/UserContext';

export default function Home({navigation}) {
  const user = useContext(UserContext);
  const userInfo = user.userInfo;

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
            source={{uri: userInfo['picture']}}
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
    fontSize: 14,
  },
  image: {
    width: 60,
    height: 60,
  },
});
