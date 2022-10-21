import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Text,
  TextInput,
  Button,
  Colors,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

export const Journey = () => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      default_address: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('Journey component');
  };

  return (
    <>
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
              placeholder="Destino" />
          )}
          name="default_address" />
      </View>
      <Button
        style={styles.button}
        color={Colors.blue800}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        <Text style={{fontSize: 18, color: 'white'}}>Buscar</Text>
      </Button></>
  );
};

const styles = StyleSheet.create({
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
