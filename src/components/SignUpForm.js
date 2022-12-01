import React, {useState} from 'react';
import {View, StyleSheet, Text, Switch, Image} from 'react-native';
import {TextInput, Button, Colors} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import signUp from '../services/SignUp';
import {constraints} from '../utils/Constraints';
import {isValidEmail} from '../utils/EmailValidation';

const SignUpForm = ({navigation}) => {
  const [isPassenger, setIsPassenger] = useState(true);
  const toggleSwitch = () => setIsPassenger((previousState) => !previousState);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      age: 0,
      password: '',
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
      const response = await signUp(data, userType());
      if (response) {
        if (isPassenger) {
          navigation.navigate('PasajeroForm', {'user_id': response.id});
        } else {
          navigation.navigate('ChoferForm', {'user_id': response.id});
        }
      }
    } catch (error) {
      console.error(error.message);
      alert(error.response.data.detail);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon-app.png')}
        style={styles.image} />
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
            label="Nombre"
            placeholder="Nombre"
            right={<TextInput.Affix text={'/' + constraints.name.max} />}
          />
        )}
        name="name"
      />
      {errors.name?.type === 'required' &&
      <Text style={styles.errorText}>Campo obligatorio</Text>}
      {errors.name?.type === 'maxLength' &&
      <Text style={styles.errorText}>
        Máximo {constraints.name.max} letras
      </Text>}
      {errors.name?.type === 'minLength' &&
      <Text style={styles.errorText}>
        Mínimo {constraints.name.min} letras
      </Text>}
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
      <Text style={styles.errorText}>Correo electrónico inválido</Text>}
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
            label="Teléfono"
            placeholder="Teléfono"
            keyboardType='numeric'
          />
        )}
        name="phone_number"
      />
      {errors.phone?.type === 'required' &&
      <Text style={styles.errorText}>Campo obligatorio</Text>}
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
            label="Edad"
            placeholder="Edad"
            keyboardType='numeric'
          />
        )}
        name="age"
      />
      {errors.age?.type === 'required' &&
      <Text style={styles.errorText}>Campo obligatorio</Text>}
      {errors.age?.type === 'min' &&
      <Text style={styles.errorText}>
        Mínimo {constraints.age.min} años
      </Text>}
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
      <Text style={styles.errorText}>
        Máximo {constraints.password.max} caracteres
      </Text>}
      {errors.password?.type === 'minLength' &&
      <Text style={styles.errorText}>
        Mínimo {constraints.password.min} caracteres
      </Text>}
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
        color={Colors.blue700}
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        <Text>Continuar</Text>
      </Button>
      <View style={styles.bottomContainer}>
        <Text style={{textAlign: 'center', fontSize: 18, color: '#282829'}}>
                      ¿Ya tenes cuenta?{'\n'}
          <Text
            style={styles.link}
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
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    marginTop: 45,
    height: 830,
    borderRadius: 16,
  },
  image: {
    width: 310,
    height: 90,
  },
  input: {
    margin: 10,
  },
  text: {
    margin: 8,
    fontSize: 18,
    color: '#282829',
  },
  errorText: {
    color: 'red',
    paddingLeft: 15,
  },
  switchContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 18,
    color: '#0D516B',
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
});

export default SignUpForm;
