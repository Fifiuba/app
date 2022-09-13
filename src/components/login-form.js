import {React, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button, Colors} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import CheckBox from 'expo-checkbox';

const LoginForm = () => {
  const [isSelected, setSelection] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const {control, formState: {errors}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.title}>Login</Text>
      <Controller control={control}
        rules={{
          required: true,
          validate: isValidEmail,
          maxLength: constraints.email.max}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Correo electrónico"
            placeholder="Correo electrónico"
            right={<TextInput.Affix text={'/' + constraints.email.max} />}
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' &&
            <Text>Campo obligatorio</Text>}
      {errors.email?.type === 'validate' &&
            <Text>Ingrese un correo electrónico válido</Text>}

      <View style={{marginTop: 25}}>
        <Text style={{textAlign: 'right'}}>
                    ¿Olvidaste la contraseña?{' '}
          <Text style={{textDecorationLine: 'underline'}}>
                      Registrate
          </Text>
        </Text>
      </View>
      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.password.max,
          minLength: constraints.password.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Contraseña"
            placeholder="Contraseña"
            secureTextEntry={hidePassword}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => sethidePassword(!hidePassword)}
              />}
          />
        )}
        name="password"
      />
      {errors.password?.type === 'required' &&
            <Text>Campo obligatorio</Text>}
      {errors.password?.type === 'maxLength' &&
            <Text>Máximo {constraints.password.max}</Text>}
      {errors.password?.type === 'minLength' &&
            <Text>Mínimo {constraints.password.min}</Text>}
      <View style={loginStyle.checkboxContainer}>
        <CheckBox
          color={Colors.blue800}
          value={isSelected}
          onValueChange={setSelection}
          style={loginStyle.checkbox}
        />
        <Text style={loginStyle.label}>Recordarme</Text>
      </View>
      <Button
        style={loginStyle.button}
        color={Colors.blue800}
        mode="contained"
        onPress={() => console.log('Pressed')}>
          Iniciar sesión
      </Button>
      <View style={loginStyle.subcontainerRedes}>
        <Text style={loginStyle.label}>
          --------- O iniciar sesión con ---------
        </Text>
        <Button style={loginStyle.buttonRedes}
          color={Colors.red800}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Google
        </Button>
        <Button
          style={loginStyle.buttonRedes}
          color={Colors.green800}
          mode="contained" onPress={() =>
            console.log('Pressed')}>
          WhatsApp
        </Button>
      </View>
    </View>
  );
};

const constraints = {
  name: {max: 15, min: 3},
  email: {max: 50},
  password: {min: 8, max: 20},
};

const isValidEmail = (email) =>
  /*eslint-disable*/
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
  );

const loginStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 50,
    margin: 20,
    marginTop: 140,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 40,
    paddingLeft: 80,
    paddingBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  checkbox: {
    marginTop: 7,
  },
  label: {
    margin: 8,
    fontSize: 12,
  },
  button: {
    marginTop: 7,
    height: 45,
    justifyContent: 'center',
  },
  subcontainerRedes: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonRedes: {
    marginTop: 10,
    padding: 5,
    width: 190,
    height: 50,
    justifyContent: 'center'
  },
});

export default LoginForm;
