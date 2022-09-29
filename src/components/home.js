import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const goToProfileScreen = () => {
    const user = {
      name: 'Celeste Dituro',
      email: 'celedituro@gmail.com',
      phone: '02364579854',
      age: 22,
    };
    navigation.navigate('Mi perfil', {
      user,
    });
  };

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={styles.categoryBtn}
        onPress={goToProfileScreen}>
        <View style={styles.categoryIcon}>
          <Image
            source={{uri: 'https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png'}}
            style={styles.image}
          />
        </View>
        <Text style={styles.categoryBtnTxt}>Mi perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
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
