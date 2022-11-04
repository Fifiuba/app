import React, {useContext} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {Colors, Button} from 'react-native-paper';

import Profile from '../components/Profile';
import {LoginContext} from '../context/LoginContext';

export default function ProfileView({navigation}) {
  const onLogin = useContext(LoginContext);

  return (
    <ScrollView style={styles.container}>
      <Profile navigation={navigation}/>
      <Button
        style={styles.buttonSignOut}
        color={Colors.grey400}
        mode="contained"
        onPress={() => {
          console.log('PressOn SignOut');
          onLogin(false);
        }}>
        <Text style={styles.textButton}>Cerrar sesión</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 700,
  },
  buttonSignOut: {
    width: '60%',
    marginLeft: 80,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    height: 35,
    margin: 5,
  },
});
