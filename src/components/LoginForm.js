import {useState, useContext} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import {TextInput, Button, Colors} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import {getAuth, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';

import loginWithGoogle from '../services/LoginWithGoogle';
import {constraints} from '../utils/Constraints';

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {WEB_CLIENT_ID} from '@env';

import AsyncStorage from '@react-native-async-storage/async-storage';
/* eslint-disable-next-line max-len */
import loginWithEmailAndPassword from '../services/LoginWithEmailAndPassword';
import {LoginContext} from '../context/LoginContext';

WebBrowser.maybeCompleteAuthSession();

const LoginForm = ({navigation}) => {
  const onLogin = useContext(LoginContext);

  const [isPassenger, setIsPassenger] = useState(true);
  const toggleSwitch = () => setIsPassenger((previousState) => !previousState);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Send data to users service for signing in
      const tokenResponse = await loginWithEmailAndPassword(data);
      if (tokenResponse) {
        await AsyncStorage.setItem('token', tokenResponse);
        await AsyncStorage.setItem('user_type', setUserType());
        onLogin(true);
        console.log('Update onLogin', onLogin);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      return null;
    }
  };

  // eslint-disable-next-line no-unused-vars
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
      {
        clientId: WEB_CLIENT_ID,
      },
  );

  const setUserType = () => {
    let userType = 'passenger';
    if (!isPassenger) {
      userType = 'driver';
    }
    return userType;
  };

  React.useEffect(() => {
    const handleResponse = async (response) => {
      try {
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
    handleResponse(response);
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FIFIUBA</Text>
      <Controller control={control}
        rules={{
          required: true,
          validate: isValidEmail,
          maxLength: constraints.email.max}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Correo electrónico"
            placeholder="Correo electrónico"
            right={<TextInput.Affix text={'/' + constraints.email.max} />}
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' &&
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      {errors.email?.type === 'validate' &&
      <Text style={{color: 'red'}}>Ingrese un correo electrónico válido</Text>}
      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.password.max,
          minLength: constraints.password.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Contraseña"
            placeholder="Contraseña"
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password?.type === 'required' &&
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      {errors.password?.type === 'maxLength' &&
      <Text>Máximo {constraints.password.max}</Text>}
      {errors.password?.type === 'minLength' &&
      <Text>Mínimo {constraints.password.min}</Text>}
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Chofer</Text>
        <Switch
          trackColor={{false: '#767577', true: '#BFBFBD'}}
          thumbColor={isPassenger ? '#4572AD' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isPassenger}
        />
        <Text style={styles.text}>Pasajero</Text>
      </View>
      <Button
        style={styles.button}
        color={Colors.blue800}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        <Text style={{fontSize: 20}}>Iniciar sesión</Text>
      </Button>
      <View style={{marginTop: 10}}>
        <Text
          onPress={() => navigation.navigate('RecuperarContraseña')}
          style={{textAlign: 'center',
            fontSize: 18,
            color: '#0D516B',
            textDecorationLine: 'underline',
          }}>
          ¿Has olvidado la contraseña?
        </Text>
      </View>
      <View style={styles.subcontainer}>
        <Text style={styles.text}>
          O iniciar sesión con
        </Text>
        <Button
          style={styles.googleButton}
          color={Colors.red800}
          mode="contained"
          onPress={() => {
            promptAsync();
          }}
        >
          <Text style={{fontSize: 18}}>Google</Text>
        </Button>
        <View style={{marginTop: 10}}>
          <Text style={{textAlign: 'center', fontSize: 18, color: '#282829'}}>
                      ¿No tenes cuenta?{'\n'}
            <Text
              style={{textDecorationLine: 'underline',
                fontSize: 18,
                color: '#0D516B'}}
              onPress={() => navigation.navigate('Registrarse')}>
                          Registrate
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const isValidEmail = (email) =>
/*eslint-disable*/
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
  );

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    padding: 18,
    margin: 15,
    marginTop: 90,
    height: 670,
    borderRadius: 16,
  },
  title: {
    fontSize: 40,
    paddingLeft: 70,
    margin: 10,
    color: '#3B3C3D',
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    margin: 8,
    fontSize: 18,
    color: '#282829',
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 5,
    width: 210,
    height: 50,
    marginTop: 10,
    marginLeft: 55,
    marginBottom: 10,
  },
  subcontainer: {
    alignItems: 'center',
    height: 200,
    paddingTop: 10,
    marginTop: 10,
  },
  googleButton: {
    justifyContent: 'center',
    margin: 5,
    width: 150,
    height: 50,
  },
});

export default LoginForm;