import {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button, Colors} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import login from '../services/login';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {WEB_CLIENT_ID} from '@env'
import loginWithGoogle from '../services/login-with-google';
import CheckBox from 'expo-checkbox';
import { useEffect } from 'react';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const LoginForm = (props) => {
  const [isSelectedPassanger, setSelectionPassanger] = useState(false);
  const [isSelectedDriver, setSelectionDriver] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data) {
    // Send data to users service for signing in
    login(data);
    props.onLogin(true);
  }

  const [_request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: WEB_CLIENT_ID,
    },
  );

  const PASSANGER = 'passanger';
  const DRIVER = 'driver';
  function setUserType() {
    var user_type = PASSANGER;
    if (isSelectedDriver) {
      user_type = DRIVER;
    }
    return user_type;
  }

  async function getUserIdToken(access_token) {
    /*auth.currentUser.getIdToken(/* forceRefresh */ /*false).then(function(idToken) {
      // Send token to backend
      console.log('idT:', idToken)
      loginWithGoogle(idToken)
    }).catch(function(error) {
      alert(error.message)
    });*/
    try {
      /*console.log('auth:', auth)
      console.log("state = unknown (until the callback is invoked)")
      const user = await auth.onAuthStateChanged()
      console.log('user:', user)*/
      const response = 
      console.log('response:', response)
    }
    catch(error) {
      console.error(error.message)
      alert(error.message)
    }
  }

  React.useEffect(() => {
    const handleResponse = async(response) => {
      try {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          const auth = getAuth();
          const credential = GoogleAuthProvider.credential(id_token);
          const result = await signInWithCredential(auth, credential)
          const access_token = result.user.stsTokenManager.accessToken
          //await getUserIdToken(auth);
          await loginWithGoogle(access_token, setUserType())
          console.log('2')
        }
      } catch(error) {
        console.error(error.message)
        alert(error.message)
      }
   }
   handleResponse(response);
  }, [response]);

  /*useEffect(() => {
    axios.get('http://192.168.0.16:8000/users/loginGoogle')
    .then(res => res.data)
    .then(console.log)
    .catch(console.error)
  }, [])*/

  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.title}>FIFI-UBA</Text>
      <Controller control={control}
        rules={{
          required: true,
          validate: isValidEmail,
          maxLength: constraints.email.max}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={loginStyle.input}
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
      <View style={{marginTop: 10}}>
        <Text
          style={{textAlign: 'right',
            fontSize: 18,
            color: '#0D516B',
            textDecorationLine: 'underline'}}>
          ¿Olvidaste la contraseña?
        </Text>
      </View>
      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.password.max,
          minLength: constraints.password.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={loginStyle.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Contraseña"
            placeholder="Contraseña"
            secureTextEntry={hidePassword}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => sethidePassword(!hidePassword)}
              />}
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
      <View style={loginStyle.checkboxContainer}>
        <CheckBox
          value={isSelectedPassanger}
          onValueChange={setSelectionPassanger}
          style={loginStyle.checkbox}
          color={Colors.blueGrey800}
        />
        <Text style={loginStyle.labelCheckbox}>Pasajero</Text>
        <CheckBox
          value={isSelectedDriver}
          onValueChange={setSelectionDriver}
          style={loginStyle.checkbox}
          color={Colors.blueGrey800}
        />
        <Text style={loginStyle.labelCheckbox}>Chofer</Text>
      </View>
      <Button
        style={loginStyle.button}
        color={Colors.blue800}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        <Text style={{fontSize: 20}}>Iniciar sesión</Text>
      </Button>
      <View style={loginStyle.subcontainerRedes}>
        <Text style={loginStyle.label}>
          O iniciar sesión con
        </Text>
        <Button
          style={loginStyle.buttonRedes}
          color={Colors.red800}
          mode="contained"
          onPress={() => {
            promptAsync();
        }}
        >
          <Text style={{fontSize: 18}}>Google</Text>
        </Button>
        <View style={{margin: 15}}>
          <Text style={{marginTop: 7, textAlign: 'center', fontSize: 18}}>
                      ¿No tenes cuenta?{'\n'}
            <Text
              style={{textDecorationLine: 'underline',
                fontSize: 18,
                color: '#0D516B'}}
              onPress={() => props.onNavigation.navigate('Registrar')}>
                          Registrate
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const constraints = {
  email: {max: 50},
  password: {min: 8, max: 20},
};

const isValidEmail = (email) =>
/*eslint-disable*/
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
  );

const loginStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 30,
    margin: 30,
    height: 640,
  },
  title: {
    fontSize: 40,
    paddingLeft: 60,
    margin: 10,
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    margin: 8,
    fontSize: 18,
  },
  subcontainerRedes: {
    margin: 15,
    alignItems: 'center',
    height: 200,
    paddingTop: 10,
  },
  button: {
    marginTop: 15,
    padding: 5,
    width: 220,
    height: 50,
    marginLeft: 40,
  },
  buttonRedes: {
    justifyContent: 'center',
    margin: 15,
    width: 150,
    height: 50,
  },
  labelCheckbox: {
    margin: 8,
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 15,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default LoginForm;