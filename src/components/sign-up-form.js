import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button, Colors} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

export default function SignUpForm() {
  const [code] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);

  const {control, formState: {errors}} = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      code: '',
    },
  });

  /*
  const onSubmit = (data) => {
    if (!code) {
      // enviar PIN de activación
      setCode(true);
      console.log(data);
    } else {
      // enviar datos al servicio para registrar usuario
      console.log(data);
    }
  };
  */

  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.title}>Registrar</Text>
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
      <Text>Campo obligatorio</Text>}
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
      <Text>Campo obligatorio</Text>}
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
      <Text>Campo obligatorio</Text>}
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
      <Text>Campo obligatorio</Text>}
      <Button
        style={loginStyle.button}
        color={Colors.blue800}
        mode="contained"
        onPress={() => console.log('Pressed')}>
          Registrarse
      </Button>
      <View style={{margin: 20}}>
        <Text style={{marginTop: 7, textAlign: 'center'}}>
                    ¿Ya tenes cuenta?{'\n'}
          <Text style={{textDecorationLine: 'underline'}}>
                      Iniciar sesión
          </Text>
        </Text>
      </View>
    </View>
  );
};

const loginStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 50,
    margin: 20,
    marginTop: 160,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 40,
    paddingLeft: 60,
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
    fontSize: 'medium',
  },
  subcontainerRedes: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    padding: 5,
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

