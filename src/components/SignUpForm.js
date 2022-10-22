import React, {useState} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import {TextInput, Button, Colors} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import signUp from '../services/SignUp';
import {constraints} from '../utils/Constraints';
import {isValidEmail} from '../utils/EmailValidation';

const SignUpForm = ({navigation}) => {
  const [code, setCode] = useState(false);
  const [isPassenger, setIsPassenger] = useState(true);
  const toggleSwitch = () => setIsPassenger((previousState) => !previousState);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      age: 0,
      password: '',
      code: '',
    },
  });

  const userType = () => {
    if (!isPassenger) {
      return 'driver';
    } else {
      return 'passenger';
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!code) {
        // Send PIN of activation
        setCode(true);
      } else {
        // Send data to users service for signing up
        const response = await signUp(data, userType());
        //await AsyncStorage.setItem('user_id', response.id.toString());
        if (response) {
          if (isPassenger) {
            navigation.navigate('PasajeroForm', {'user_id': response.id});
          } else {
            navigation.navigate('ChoferForm', {'user_id': response.id});
          }
        }
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      // alert(error.response.data.detail);
      // console.error(error.response.data.detail);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FIFIUBA</Text>
      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.name.max,
          minLength: constraints.name.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Nombre"
            placeholder="Nombre"
            right={<TextInput.Affix text={'/' + constraints.name.max} />}
          />
        )}
        name="name"
      />
      {errors.name?.type === 'required' &&
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      {errors.name?.type === 'maxLength' &&
      <Text>Máximo {constraints.name.max}</Text>}
      {errors.name?.type === 'minLength' &&
      <Text>Mínimo {constraints.name.min}</Text>}
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
      <Text style={{color: 'red'}}>Correo electrónico inválido</Text>}
      <Controller control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Teléfono"
            placeholder="Teléfono"
          />
        )}
        name="phone_number"
      />
      {errors.phone?.type === 'required' &&
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      <Controller control={control}
        rules={{
          required: true,
          min: constraints.age.min,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Edad"
            placeholder="Edad"
          />
        )}
        name="age"
      />
      {errors.age?.type === 'required' &&
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      {errors.age?.type === 'min' &&
      <Text>Mínimo {constraints.age.min}</Text>}
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
      { code &&
        <Controller control={control}
          rules={{
            required: code,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              label="PIN de activación"
              placeholder="PIN"
            />
          )}
          name="code"
        />
      }
      {code && errors.code?.type === 'required' &&
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      {errors.code?.type === 'maxLength' &&
      <Text>Máximo {constraints.code.max}</Text>}
      {errors.code?.type === 'minLength' &&
      <Text>Mínimo {constraints.code.min}</Text>}
      <Button
        color={Colors.blue800}
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{fontSize: 18}}>Registrarse</Text>
      </Button>
      <View style={{margin: 5}}>
        <Text style={{marginTop: 5,
          textAlign: 'center',
          fontSize: 18,
          color: '#282829'}}>
                    ¿Ya tenes cuenta?{'\n'}
          <Text
            style={{textDecorationLine: 'underline',
              fontSize: 18,
              color: '#0D516B'}}
            onPress={() => navigation.navigate('IniciarSesion')}>
                        Iniciar sesión
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 30,
    height: 750,
    marginTop: 50,
  },
  title: {
    fontSize: 40,
    paddingLeft: 80,
    margin: 10,
    marginTop: 15,
    color: '#3B3C3D',
  },
  input: {
    marginTop: 5,
  },
  text: {
    margin: 8,
    fontSize: 18,
    color: '#282829',
  },
  switchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 55,
    width: 200,
    justifyContent: 'center',
    marginLeft: 70,
    marginTop: 15,
  },
});

export default SignUpForm;
