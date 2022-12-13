import {useState, useContext} from 'react';
import {View, StyleSheet, Text, Switch, Image} from 'react-native';
import {TextInput, Button, Colors, Snackbar} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import {constraints} from '../utils/Constraints';
import {isValidEmail} from '../utils/EmailValidation';

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

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Send data to users service for signing in
      const userType = setUserType();
      const tokenResponse = await loginWithEmailAndPassword(data, userType);
      if (tokenResponse === null) {
        setText('Usuario no encontrado');
        setVisible(true);
      } else {
        await AsyncStorage.setItem('token', tokenResponse);
        await AsyncStorage.setItem('user_type', userType);
        onLogin(true);
      }
    } catch (error) {
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
        console.log('response en login form:', response);
        /* eslint-disable max-len */
        if (response?.type === 'success') {
          navigation.navigate('EnEspera', {'response': response, 'user_type': isPassenger});
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
      <Image
        source={require('../../assets/icon-app.png')}
        style={styles.image} />
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
            label="Correo electrónico"
            placeholder="Correo electrónico"
            right={<TextInput.Affix text={'/' + constraints.email.max} />}
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' &&
        <Text style={styles.errorText}>Campo obligatorio</Text>}
      {errors.email?.type === 'validate' &&
        <Text style={styles.errorText}>Ingrese un correo electrónico válido</Text>}
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
            label="Contraseña"
            placeholder="Contraseña"
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password?.type === 'required' &&
        <Text style={styles.errorText}>Campo obligatorio</Text>}
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
        color={Colors.blue700}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        <Text>Iniciar sesión</Text>
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
      <View style={styles.googleContainer}>
        <Text style={styles.text}>
            O iniciar sesión con
        </Text>
        <Button
          style={styles.button}
          color={Colors.red800}
          mode="contained"
          onPress={() => {
            promptAsync();
          }}
        >
          <Text>Google</Text>
        </Button>
        <View style={styles.bottomContainer}>
          <Text style={{textAlign: 'center', fontSize: 18, color: '#282829'}}>
                        ¿No tenes cuenta?{'\n'}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Registrarse')}>
                            Registrate
            </Text>
          </Text>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
          },
        }}>
        {text}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    marginTop: 45,
    height: 830,
    borderRadius: 16,
    justifyContent: 'center',
  },
  image: {
    width: 310,
    height: 100,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    margin: 8,
    fontSize: 18,
    color: '#282829',
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 18,
    color: '#0D516B',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  button: {
    height: 45,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 10,
    alignSelf: 'center',
  },
  bottomContainer: {
    margin: 10,
  },
  googleContainer: {
    alignItems: 'center',
    height: 200,
    paddingTop: 10,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default LoginForm;
