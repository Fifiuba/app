import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

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
      // enviar PIN de activación
      setCode(true)
      console.log(data)
    } else {
      // enviar datos al servicio para registrar usuario
      console.log(data)
      props.onLogin(true)
      //props.onLogin(true)
    }
  };

  return (

    <View style={signUpStyle.container}>

      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.name.max,
          minLength: constraints.name.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
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
      <Text>Campo requerido</Text>}
      {errors.email?.type === 'validate' &&
      <Text>Ingrese un correo electrónico válido</Text>}
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
            label="Número de teléfono"
            placeholder="Número de teléfono"
          />
        )}
        name="phone"
      />
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
      <Text>Campo requerido</Text>}
      <Button
        style={signUpStyle.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
          Registrarse
      </Button>
      <Text variant="bodyLarge"
        style={{marginTop: 10, textAlign: 'center'}}
      >
        ¿Ya tenés cuenta?
        <Text variant="bodyLarge"
          style={{textDecorationLine: 'underline'}}
        >
          Inicia sesión
        </Text>
      </Text>
    </View>
  );
};

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

