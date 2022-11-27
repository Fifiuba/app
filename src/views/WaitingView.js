import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getAuth, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';

import loginWithGoogle from '../services/LoginWithGoogle';

import {LoginContext} from '../context/LoginContext';

export default function WaitingView({route}) {
  const isPassenger = route.params.user_type;

  const onLogin = useContext(LoginContext);

  const setUserType = () => {
    let userType = 'passenger';
    if (!isPassenger) {
      userType = 'driver';
    }
    return userType;
  };

  React.useEffect(() => {
    const handleResponse = async () => {
      try {
        const response = route.params.response;
        if (response?.type === 'success') {
          /* eslint-disable camelcase */
          const {id_token} = response.params;
          const auth = getAuth();
          const credential = GoogleAuthProvider.credential(id_token);
          const result = await signInWithCredential(auth, credential);
          const accessToken = result.user.stsTokenManager.accessToken;
          const userType = setUserType();
          const tokenResponse =
            await loginWithGoogle(accessToken, userType);
          if (tokenResponse) {
            await AsyncStorage.setItem('token', tokenResponse);
            await AsyncStorage.setItem('user_type', userType);
            onLogin(true);
          }
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };
    handleResponse();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Iniciando sesión ...</Text>
        <ActivityIndicator
          animating={true}
          color="#757575"
          style={{marginTop: 10}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    height: 270,
    width: 360,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 20,
    color: '#282829',
    textAlign: 'center',
  },
});
