import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text,
  TextInput,
  Button,
  Colors,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import {constants} from '../utils/Constants';

export default function Home({navigation}) {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      default_address: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('HOLA HOME');
  };

  return (
    <><View style={styles.categoryContainer}>
      <TouchableOpacity
        style={styles.categoryBtn}
        onPress={() => {
          console.log('log & navigate');
          navigation.navigate('MiPerfil');
        } }>
        <View style={styles.categoryIcon}>
          <Image
            source={{uri: constants.DEFAULT_URL_USER_PICTURE}}
            style={styles.image} />
          <Text style={styles.categoryBtnTxt}>Mi perfil</Text>
        </View>
      </TouchableOpacity>
    </View>
    <Text style={styles.title}>Realizar viaje</Text>
    <View style={styles.container}>
      <Controller control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Destino"
            placeholder="Destino"
          />
        )}
        name="default_address" />
    </View>
    <Button
      style={styles.button}
      color={Colors.blue800}
      mode="contained"
      onPress={handleSubmit(onSubmit)}>
      <Text style={{fontSize: 18, color: 'white'}}>Buscar</Text>
    </Button>
    </>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 14,
  },
  image: {
    width: 60,
    height: 60,
  },
  title: {
    paddingTop: 50,
    fontSize: 28,
    paddingLeft: 110,
  },
  container: {
    flexDirection: 'row',
    width: '95%',
    marginLeft: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    width: '85%',
  },
  button: {
    padding: 5,
    width: 170,
    height: 50,
    marginLeft: 115,
    marginTop: 35,
  },
});
