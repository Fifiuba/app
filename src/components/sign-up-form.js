import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button, Colors} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import signup from '../services/sign-up';

export default function SignUpForm(props) {
  const [code, setCode] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      code: '',
    },
  });

  const onSubmit = (data) => {
    if (!code) {
      // Send PIN of activation
      setCode(true);
    } else {
      // Send data to the service for registrating users
      if (signup(data)) {
        props.onLogin(true);
      }
    }
  };

  return (
    <View style={signUpStyle.container}>
      <Text style={signUpStyle.title}>Crear usuario</Text>
      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.name.max,
          minLength: constraints.name.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={signUpStyle.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Nombre"
            placeholder="Nombre"
            right={<TextInput.Affix text={'/' + constraints.name.max} />}
          />
        )}
        name="name"
      />
      {errors.name?.type === 'required' &&
      <Text>Campo requerido</Text>}
      {errors.name?.type === 'maxLength' &&
      <Text>Máximo {constraints.name.max}</Text>}
      {errors.name?.type === 'minLength' &&
      <Text>Mínimo {constraints.name.min}</Text>}

      <Controller control={control}
        rules={{
          required: true,
          validate: isValidEmail,
          maxLength: constraints.email.max}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={signUpStyle.input}
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
      <Controller control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={signUpStyle.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Número de teléfono"
            placeholder="Número de teléfono"
          />
        )}
        name="phone"
      />
      {errors.phone?.type === 'required' &&
      <Text>Campo obligatorio</Text>}
      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.password.max,
          minLength: constraints.password.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={signUpStyle.input}
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
      <Text>Campo requerido</Text>}
      {errors.password?.type === 'maxLength' &&
      <Text>Máximo {constraints.password.max}</Text>}
      {errors.password?.type === 'minLength' &&
      <Text>Mínimo {constraints.password.min}</Text>}
      { code &&
        <Controller control={control}
          rules={{
            required: code,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={signUpStyle.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              label="PIN de activación"
              placeholder="XXXX"
            />
          )}
          name="code"
        />
      }
      {code && errors.code?.type === 'required' &&
      <Text>Campo obligatorio</Text>}
      <Button
        color={Colors.blue800}
        style={signUpStyle.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{fontSize: 18}}>Registrarse</Text>
      </Button>
      <View style={{margin: 15}}>
        <Text style={{marginTop: 7, textAlign: 'center', fontSize: 16}}>
                    ¿Ya tenes cuenta?{'\n'}
          <Text
            style={{textDecorationLine: 'underline'}}
            onPress={() => props.onNavigation.navigate('Login')}>
                        Iniciar sesión
          </Text>
        </Text>
      </View>
    </View>
  );
};

const signUpStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 40,
    margin: 15,
    marginTop: 60,
  },
  title: {
    fontSize: 40,
    paddingLeft: 25,
    paddingBottom: 40,
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    margin: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    height: 55,
    width: 200,
    justifyContent: 'center',
    marginLeft: 50,
  },
});

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

