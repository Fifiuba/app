import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text,
  TextInput,
  Button,
  Colors,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import setUserTypeInfo from '../services/SetUserTypeInfo';
import {constraints} from '../utils/Constraints';

const PassengerFormView = ({navigation}) => {
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      default_address: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log('passengerInfo:', data);
      const userId = await AsyncStorage.getItem('user_id');
      console.log('userId:', userId);
      const response = await setUserTypeInfo(data, userId, 'passenger');
      if (response) {
        navigation.navigate('IniciarSesion');
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Pasajero</Text>
        <Controller control={control}
          rules={{
            required: true,
            maxLength: constraints.default_address.max,
            minLength: constraints.default_address.min}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              label="Ubicación"
              placeholder="Ubicación"
            />
          )}
          name="default_address"
        />
        {errors.default_address?.type === 'required' &&
            <Text style={{color: 'red'}}>Campo obligatorio</Text>}
        {errors.default_address?.type === 'maxLength' &&
            <Text style={{color: 'red'}}>
                Máximo {constraints.default_address.max} caracteres
            </Text>}
        {errors.default_address?.type === 'minLength' &&
            <Text style={{color: 'red'}}>
                Mínimo {constraints.default_address.min} caracteres
            </Text>}
        <Button
          style={styles.button}
          color={Colors.blue800}
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          <Text style={{fontSize: 20, color: 'white'}}>Registrarse</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    marginTop: 270,
    height: 280,
    width: 350,
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
  },
  title: {
    marginTop: 5,
    fontSize: 26,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#263238',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    padding: 5,
    width: 215,
    height: 50,
    marginLeft: 35,
    marginTop: 20,
  },
});

export default PassengerFormView;

