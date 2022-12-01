import React, {useContext, useState} from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Colors, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import editProfile from '../services/EditProfile';
import {UserContext} from '../context/UserContext';
import {constraints} from '../utils/Constraints';
import {isValid} from '../utils/ValueIsValid';
import InfoModal from './InfoModal';

export default function Profile({navigation}) {
  const user = useContext(UserContext);
  const userInfo = user.userInfo;
  const userTypeInfo = user.userTypeInfo;

  const [isPassenger, setIsPassenger] = useState(true);
  const [msg, setMsg] = useState('');
  const [save, setSaved] = useState(false);

  const {control, handleSubmit, setValue, formState: {errors}} = useForm({
    defaultValues: {
      name: '',
      age: '',
      phone_number: '',
      default_address: '',
      car_model: '',
      license_plate: '',
    },
  });

  React.useEffect(() => {
    setValue('name', userInfo.name);
    setValue('age', userInfo.age.toString());
    setValue('phone_number', userInfo.phone_number);
    const setUserType = async () => {
      const userType = await AsyncStorage.getItem('user_type');
      if (userType == 'driver') {
        setValue('car_model', userTypeInfo.car_model);
        setValue('license_plate', userTypeInfo.license_plate);
        setIsPassenger(false);
      } else {
        setValue('default_address', userTypeInfo.default_address);
      }
    };
    setUserType();
  }, []);

  const isModified = (value, newValue) => {
    return value != newValue;
  };

  const updateInfo = (info, data) => {
    console.log('Updatting info:', info);

    const keys = Object.getOwnPropertyNames(data);
    for (let idx = 0; idx < keys.length; idx++) {
      const key = keys[idx];
      const value = data[key];
      if (isValid(value)) {
        if (isModified(info[key], value)) {
          let newValue;
          if (key == 'age' || key == 'id') {
            newValue = value.toString();
          } else {
            newValue = value;
          }
          if (newValue) {
            console.log('info[key]:', info[key]);
            info[key] = newValue;
          }
        }
      }
    }

    console.log('info:', info);
  };

  const onSubmit = async (data) => {
    try {
      console.log('data:', data);
      const response = await editProfile(data, setSaved, setMsg);
      console.log('response:', response);
      if (response) {
        updateInfo(userInfo, response[0]);
        updateInfo(userTypeInfo, response[1]);
        navigation.navigate('MiPerfil');
      }
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{uri: userInfo.picture}}
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller control={control}
            rules={{
              maxLength: constraints.name.max,
              minLength: constraints.name.min}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                theme={{colors: {primary: 'grey'}, roundness: 10}}
                style={styles.info}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Nombre"
                placeholder={userInfo.name}
              />
            )}
            name="name"
          />
          {errors.name?.type === 'maxLength' &&
          <Text style={{color: 'red'}}>
            Máximo {constraints.name.max} letras
          </Text>}
          {errors.name?.type === 'minLength' &&
          <Text style={{color: 'red'}}>
            Mínimo {constraints.name.min} letra
          </Text>}
          <TextInput
            style={styles.info}
            label="Correo electrónico"
            defaultValue={userInfo.email}
            disabled="true"
          />
          <Controller control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                theme={{colors: {primary: 'grey'}, roundness: 10}}
                style={styles.info}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Teléfono"
                placeholder={userInfo.phone_number}
                keyboardType='numeric'
              />)}
            name="phone_number"
          />
          <Controller control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                theme={{colors: {primary: 'grey'}, roundness: 10}}
                style={styles.info}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Edad"
                placeholder={userInfo.age.toString()}
                keyboardType='numeric'
              />
            )}
            name="age"
          />
          <View>
            { isPassenger &&
            <Controller control={control}
              rules={{minLength: constraints.default_address.min}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  theme={{colors: {primary: 'grey'}, roundness: 10}}
                  style={styles.info}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Dirección"
                  placeholder={userTypeInfo.default_address}
                />
              )}
              name="default_address"
            />}
            {errors.default_address?.type === 'minLength' &&
          <Text>Mínimo {constraints.default_address.min} caracteres</Text>}
            { !isPassenger &&
          <><View>
            <Controller control={control}
              rules={{
                maxLength: constraints.car_model.max,
                minLength: constraints.car_model.min,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  theme={{colors: {primary: 'grey'}, roundness: 10}}
                  style={styles.info}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Modelo del vehículo"
                  placeholder={userTypeInfo.car_model}
                />
              )}
              name="car_model"
            />
            {errors.car_model?.type === 'maxLength' &&
              <Text>Máximo {constraints.car_model.max} caracteres</Text>}
            {errors.car_model?.type === 'minLength' &&
              <Text>Mínimo {constraints.car_model.min} caracteres</Text>}
          </View><View>
            <Controller control={control}
              rules={{
                maxLength: constraints.license_plate.max,
                minLength: constraints.license_plate.min,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  theme={{colors: {primary: 'grey'}, roundness: 10}}
                  style={styles.info}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Patente del vehículo"
                  placeholder={userTypeInfo.license_plate}
                />
              )}
              name="license_plate"
            />
            {errors.license_plate?.type === 'maxLength' &&
              <Text>Máximo {constraints.license_plate.max} caracteres</Text>}
            {errors.license_plate?.type === 'minLength' &&
              <Text>Mínimo {constraints.license_plate.min} caracteres</Text>}
          </View></>}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.saveButton}
            color={Colors.blue800}
            mode="contained"
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Guardar</Text>
          </Button>
          { save && <InfoModal modalText={msg}/>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 170,
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,
  },
  subcontainer: {
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  buttonContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  saveButton: {
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.blue700,
    margin: 10,
  },
  successMsg: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 18,
    color: '#616161',
    backgroundColor: '#c8e6c9',
    borderRadius: 30,
    height: 45,
    width: 250,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    height: 55,
    width: '90%',
    margin: 10,
  },
});
