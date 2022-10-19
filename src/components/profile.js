import React, {useContext} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Colors, Button, TextInput} from 'react-native-paper';

import editProfile from '../services/EditProfile';
import {UserContext} from '../context/UserContext';

export default function Profile({navigation}) {
  const user = useContext(UserContext);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      phone_number: '',
    },
  });

  const isModified = (value, newValue) => {
    return value != newValue;
  };

  const updateUserInfo = (userInfo) => {
    console.log('Updatting user info');
    console.log('user:', user);
    console.log('userInfo:', userInfo);

    const keys = Object.getOwnPropertyNames(userInfo);
    for (let idx = 0; idx < keys.length; idx++) {
      const key = keys[idx];
      const value = userInfo[key];
      if (isModified(user[key], value)) {
        let newValue;
        if (key == 'age' || key == 'id') {
          newValue = value.toString();
        } else {
          newValue = value;
        }
        if (newValue) {
          user[key] = newValue;
        }
      }
    }
    console.log('Updated user:', user);
  };

  const onSubmit = async (data) => {
    try {
      console.log('data:', data);
      const response = await editProfile(data);
      if (response) {
        console.log('Edición exitosa');
        updateUserInfo(response[0]);
        console.log('updated user:', user);
        navigation.navigate('MiPerfil');
      }
    } catch (error) {
      alert(error.response.data.detail);
      console.error(error.response.data.detail);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{user.name}</Text>
        <Image
          source={{uri: user.picture}}
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
              placeholder={user.name}
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
              value={user.email}
              mode="outlined"
              label="Correo electrónico"
              placeholder={user.email}
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
              placeholder={user.phone_number}
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
              placeholder={user.age.toString()}
            />
          )}
          name="age"
        />
        {errors.age?.type === 'min' &&
        <Text style={{color: 'red'}}>
          Tienes que ser mayor de {constraints.age.min} años
        </Text>}
      </View>
      <Button
        style={styles.buttonEdit}
        color={Colors.blue800}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        <Text style={{fontSize: 20}}>Editar</Text>
      </Button>
    </View>
  );
};

const constraints = {
  name: {max: 30, min: 1},
  age: {min: 18},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginTop: 40,
  },
  subcontainer: {
    marginTop: 25,
  },
  title: {
    fontSize: 28,
  },
  textInput: {
    flex: 1,
    paddingLeft: 20,
    color: '#777777',
    fontSize: 20,
  },
  input: {
    marginTop: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 35,
  },
  buttonEdit: {
    marginTop: 40,
    padding: 5,
    width: 200,
    height: 50,
    marginLeft: 75,
    alignItems: 'center',
  },
  image: {
    marginTop: 35,
    width: 130,
    height: 130,
    marginLeft: 10,
    borderRadius: 100,
  },
});
