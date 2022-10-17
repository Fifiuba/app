import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function Home(props) {
  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={styles.categoryBtn}
        onPress={() => {
          console.log('log & navigate');
          props.onNavigation.navigate('MiPerfil');
        }}>
        <View style={styles.categoryIcon}>
          <Image
            source={{uri: 'https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png'}}
            style={styles.image}
          />
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
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 10,
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
