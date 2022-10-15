import React, {useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {Colors, Button, TextInput} from 'react-native-paper';
import editProfile from '../services/edit-profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState(0);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      phone_number: '',
    },
  });

  const getUserInfo = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  React.useEffect(() => {
    const handleEditProfile = async () => {
      try {
        const name = await getUserInfo('name');
        setName(name);
        const email = await getUserInfo('email');
        console.log('email:', email);
        setEmail(email);
        const phone = await getUserInfo('phone_number');
        setPhone(phone);
        const age = await getUserInfo('age');
        setAge(age);
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };
    handleEditProfile();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await editProfile(data);
      if (response) {
        console.log('Edición exitosa');
        props.onNavigation.navigate('MiPerfil');
      }
    } catch (error) {
      alert(error.message);
      console.error(error.message);
      return nill;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{name}</Text>
        <Image
          source={{uri: 'https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png'}}
          style={styles.image}
        />
      </View>

      <View style={styles.subcontainer}>
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
              placeholder={name}
            />
          )}
          name="name"
        />
        {errors.name?.type === 'maxLength' &&
        <Text>Máximo {constraints.name.max}</Text>}
        {errors.name?.type === 'minLength' &&
        <Text>Mínimo {constraints.name.min}</Text>}
        <Controller control={control}
          render={() => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
              style={styles.input}
              mode="outlined"
              label={email}
              disabled="true"
            />
          )}
          name="email"
        />
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
              placeholder={phone}
            />)}
          name="phone_number"
        />
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
              placeholder={age}
            />
          )}
          name="age"
        />
        {errors.age?.type === 'min' &&
        <Text>Mínimo {constraints.age.min}</Text>}
        <Button
          style={styles.buttonEdit}
          color={Colors.blue800}
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          <Text style={{fontSize: 20}}>Guardar</Text>
        </Button>
      </View>
    </View>
  );
};

const constraints = {
  name: {max: 20},
  age: {max: 3},
  email: {max: 50},
  phone: {max: 50},
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
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  invalidText: {
    color: 'red',
  },
});
