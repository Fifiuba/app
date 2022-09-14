import {React, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button, Colors} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import CheckBox from 'expo-checkbox';

const LoginForm = (props) => {
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
      <Text style={loginStyle.title}>Ingresar</Text>
      <Controller control={control}
        rules={{
          required: true,
          validate: isValidEmail,
          maxLength: constraints.email.max}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={loginStyle.input}
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
        <View style={{marginTop: 10}}>
        <Text style={{textAlign: 'right', fontSize: 16, textDecorationLine: 'underline'}}>
                    ¿Olvidaste la contraseña?
        </Text>
      </View>
      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.password.max,
          minLength: constraints.password.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={loginStyle.input}
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
        onPress={() => props.onLogin(true)}>
          <Text style={{fontSize: 18}}>Iniciar sesión</Text>
      </Button>
      <View style={loginStyle.subcontainerRedes}>
        <Text style={loginStyle.label}>
          -------- O iniciar sesión con --------
        </Text>
        <Button
          style={loginStyle.buttonRedes}
          color={Colors.red800}
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          <Text style={{fontSize: 16}}>Google</Text>
        </Button>
        <Button
          style={loginStyle.buttonRedes}
          color={Colors.green800}
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          <Text style={{fontSize: 16}}>WhatsApp</Text>
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
    padding: 15,
    margin: 40,
    marginTop: 45,
  },
  title: {
    fontSize: 40,
    paddingLeft: 70,
    paddingBottom: 30,
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    fontSize: 17,
  },
  subcontainerRedes: {
    margin: 15,
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    padding: 5,
    width: 220,
    height: 50,
    marginLeft: 40,
  },
  buttonRedes: {
    justifyContent: 'center',
    margin: 5,
    width: 200,
    height: 50,
  },
});

export default LoginForm;