import React from 'react';
import {Text, View, TextInput, Image, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {useTheme, Colors, Button} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import editProfile from '../services/edit-profile';

export default function EditProfile() {
  const {colors} = useTheme();
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      firstName: '',
      age: 0,
      email: '',
      phone: '',
    },
  });

  const route = useRoute();
  const onSubmit = (data) => {
    editProfile(data);
    navigation.navigate('Mi perfil', {
      data,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{route.params.user.name}</Text>
        <Image
          source={{uri: 'https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png'}}
          style={styles.image}
        />
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.action}>
          <Controller
            control={control}
            rules={{
              maxLength: constraints.name.max,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                placeholder={route.params.user.name}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="name"
          />
        </View>
        {errors.name?.type === 'maxLength' &&
        <Text style={styles.invalidText}>
          Máximo {constraints.name.max} letras
        </Text>}
        <View style={styles.action}>
          <Controller
            control={control}
            rules={{
              maxLength: constraints.age.max,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                mode="outlined"
                placeholder='Edad'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="age"
          />
        </View>
        {errors.age?.type === 'maxLength' &&
        <Text style={styles.invalidText}>
          Máximo {constraints.age.max} números
        </Text>}
        <View style={styles.action}>
          <Text style={styles.textInput}>{route.params.user.email}</Text>
        </View>
        <View style={styles.action}>
          <Controller
            control={control}
            rules={{
              maxLength: constraints.phone.max,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                placeholder={route.params.user.phone}
                keyboardType="number-pad"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phone"
          />
        </View>
        {errors.phone?.type === 'maxLength' &&
        <Text style={styles.invalidText}>
          Máximo {constraints.phone.max} números
        </Text>}
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
  action: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10,
    paddingBottom: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 35,
  },
  buttonEdit: {
    marginTop: 45,
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
