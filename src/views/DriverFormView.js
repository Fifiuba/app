import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text,
  TextInput,
  Button,
  Colors,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import setUserTypeInfo from '../services/SetUserTypeInfo';
import {constraints} from '../utils/Constraints';
import {constants} from '../utils/Constants';

const DriverFormView = ({navigation, route}) => {
  const userId = route.params.user_id;
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      license_plate: '',
      car_model: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log('driverInfo:', data);
      console.log('userId:', userId);
      const response = await setUserTypeInfo(data, userId, constants.DRIVER);
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
        <Text style={styles.title}>Choferes</Text>
        <Text style={styles.subtitle}>Información del vehículo</Text>
        <Controller control={control}
          rules={{
            required: true,
            maxLength: constraints.license_plate.max,
            minLength: constraints.license_plate.min}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Patente del vehículo"
              placeholder="Patente"
            />
          )}
          name="license_plate"
        />
        {errors.license_plate?.type === 'required' &&
            <Text style={{color: 'red'}}>Campo obligatorio</Text>}
        {errors.license_plate?.type === 'maxLength' &&
            <Text style={{color: 'red'}}>
                Máximo {constraints.license_plate.max} caracteres
            </Text>}
        {errors.license_plate?.type === 'minLength' &&
            <Text style={{color: 'red'}}>
                Mínimo {constraints.license_plate.min} caracteres
            </Text>}
        <Controller control={control}
          rules={{
            required: true,
            maxLength: constraints.car_model.max,
            minLength: constraints.car_model.min}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Modelo del vehículo"
              placeholder="Modelo"
            />
          )}
          name="car_model"
        />
        {errors.car_model?.type === 'required' &&
            <Text style={{color: 'red'}}>Campo obligatorio</Text>}
        {errors.car_model?.type === 'maxLength' &&
            <Text style={{color: 'red'}}>
                Máximo {constraints.car_model.max} caracteres
            </Text>}
        {errors.car_model?.type === 'minLength' &&
            <Text style={{color: 'red'}}>
                Mínimo {constraints.car_model.min} caracteres
            </Text>}
        <Button
          style={styles.button}
          color={Colors.blue700}
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          <Text style={{color: 'white'}}>Registrarse</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    height: 410,
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
  subtitle: {
    marginTop: 5,
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
    color: '#263238',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 10,
  },
});

export default DriverFormView;

