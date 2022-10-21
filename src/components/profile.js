import React, {useContext, useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Colors, Button, TextInput} from 'react-native-paper';

import editProfile from '../services/EditProfile';
import {UserContext} from '../context/UserContext';
import {constraints} from '../utils/Constraints';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
  const user = useContext(UserContext);
  const userInfo = user.userInfo;
  const userTypeInfo = user.userTypeInfo;

  const [isPassenger, setIsPassenger] = useState(true);
  const [msg, setMsg] = useState('');
  const [edit, setEdit] = useState(false);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      name: '',
      age: 18,
      email: '',
      phone_number: '',
      default_address: '',
      car_model: '',
      license_plate: '',
    },
  });

  React.useEffect(() => {
    const setUserType = async () => {
      const userType = await AsyncStorage.getItem('user_type');
      if (userType == 'driver') {
        setIsPassenger(false);
      }
    };
    setUserType();
  }, []);

  const isModified = (value, newValue) => {
    return value != newValue;
  };

  const isValid = (value) => {
    return (value != '' || value != 0 || !(value === null));
  };

  const updateInfo = (info, data) => {
    console.log('Updatting info info');
    console.log('info:', info);
    console.log('data:', data);

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
            info[key] = newValue;
          }
        }
      }
    }
    console.log('Updated info:', info);
  };

  const onSubmit = async (data) => {
    try {
      console.log('data:', data);
      const response = await editProfile(data, setEdit, setMsg);
      if (response) {
        console.log('Edición exitosa');
        updateInfo(userInfo, response[0]);
        updateInfo(userTypeInfo, response[1]);
        console.log('updated userInfo:', userInfo);
        console.log('updated userTypeInfo:', userTypeInfo);
        navigation.navigate('MiPerfil');
      }
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{userInfo.name}</Text>
        <Image
          source={{uri: userInfo.picture}}
          style={styles.image}
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
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
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
        <Text style={{color: 'red'}}>Mínimo {constraints.name.min} letra</Text>}
        <Controller control={control}
          render={() => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
              style={styles.input}
              value={userInfo.email}
              mode="outlined"
              label="Correo electrónico"
              placeholder={userInfo.email}
              disabled="true"
            />)}
          name="email"
        />
        <Controller control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              label="Teléfono"
              placeholder={userInfo.phone_number}
            />)}
          name="phone_number"
        />
        <Controller control={control}
          rules={{
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
              placeholder={userInfo.age.toString()}
            />
          )}
          name="age"
        />
        {errors.age?.type === 'min' &&
        <Text style={{color: 'red'}}>
          Tienes que ser mayor de {constraints.age.min} años
        </Text>}
      </View>
      <View>
        { isPassenger &&
          <Controller control={control}
            rules={{
              required: isPassenger,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                theme={{colors: {primary: 'grey'}, roundness: 10}}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                label="Dirección"
                placeholder={userTypeInfo.default_address}
              />
            )}
            name="default_address"
          />
        }
        {isPassenger && errors.isPassenger?.type === 'required' &&
        <Text style={{color: 'red'}}>Campo obligatorio</Text>}
        {errors.isPassenger?.type === 'maxLength' &&
        <Text>Máximo {constraints.isPassenger.max} caracteres</Text>}
        {errors.isPassenger?.type === 'minLength' &&
        <Text>Mínimo {constraints.isPassenger.min} caracteres</Text>}
      </View>
      { !isPassenger &&
        <><View>
          <Controller control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                theme={{colors: {primary: 'grey'}, roundness: 10}}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                label="Modelo del vehículo"
                placeholder={userTypeInfo.car_model}/>
            )}
            name="car_model" />
          {errors.car_model?.type === 'required' &&
            <Text style={{color: 'red'}}>Campo obligatorio</Text>}
          {errors.car_model?.type === 'maxLength' &&
            <Text>Máximo {constraints.car_model.max} caracteres</Text>}
          {errors.car_model?.type === 'minLength' &&
            <Text>Mínimo {constraints.car_model.min} caracteres</Text>}
        </View><View>
          <Controller control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                theme={{colors: {primary: 'grey'}, roundness: 10}}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                label="Patente del vehículo"
                placeholder={userTypeInfo.license_plate} />
            )}
            name="license_plate" />
          {errors.license_plate?.type === 'required' &&
            <Text style={{color: 'red'}}>Campo obligatorio</Text>}
          {errors.license_plate?.type === 'maxLength' &&
            <Text>Máximo {constraints.license_plate.max} caracteres</Text>}
          {errors.license_plate?.type === 'minLength' &&
            <Text>Mínimo {constraints.license_plate.min} caracteres</Text>}
        </View></>}
      <Button
        style={styles.buttonEdit}
        color={Colors.blue800}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        <Text style={{fontSize: 20}}>Editar</Text>
      </Button>
      { edit &&
        <Text style={styles.successMsg}>{msg}</Text>
      }
      { !edit &&
        <Text style={styles.errorMsg}>{msg}</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginTop: 15,
  },
  subcontainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 28,
  },
  image: {
    marginTop: 10,
    width: 130,
    height: 130,
    marginLeft: 10,
    borderRadius: 100,
  },
  input: {
    marginTop: 5,
  },
  buttonEdit: {
    marginTop: 15,
    padding: 5,
    width: 200,
    height: 50,
    marginLeft: 75,
    alignItems: 'center',
  },
  errorMsg: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#e53935',
    borderRadius: 16,
    height: 40,
    paddingTop: 5,
  },
  successMsg: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#00796b',
    borderRadius: 16,
    height: 40,
    paddingTop: 5,
  },
});
