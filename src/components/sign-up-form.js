import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export default function SignUpForm() {
  return (

    <View style={signUpStyle.container}>

      <TextInput
        mode="outlined"
        label="Nombre"
        placeholder="Nombre"
        right={<TextInput.Affix text="/100" />}
      />
      <TextInput
        mode="outlined"
        label="Correo electrónico"
        placeholder="Correo electrónico"
        right={<TextInput.Affix text="/100"/>}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Contraseña"
        right={<TextInput.Affix text="/100"/>}
      />
      <Button
        style={signUpStyle.button}
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Registrarse
      </Button>
    </View>
  );
};

SignUpForm.displayName = 'SignUpForm';

const signUpStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 15,
  },
  button: {
    marginTop: 5,
    padding: 7,
  },
});

