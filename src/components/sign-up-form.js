import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput, Button, Colors} from 'react-native-paper';
import CheckBox from 'expo-checkbox';
import {useForm, Controller} from 'react-hook-form';
import signUp from '../services/sign-up';

const SignUpForm = (props) => {
  const [isSelectedPassanger, setSelectionPassanger] = useState(false);
  const [isSelectedDriver, setSelectionDriver] = useState(false);
  const [code, setCode] = useState(false);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      age: 0,
      password: '',
      code: '',
    },
  });

  const userType = () => {
    if (isSelectedDriver) {
      return 'driver';
    } else {
      return 'passenger';
    }
  };

  const onSubmit = (data) => {
    if (!code) {
      // Send PIN of activation
      setCode(true);
    } else {
      // Send data to users service for signing up
      // setUserType(data);
      if (signUp(data, userType())) {
        props.onNavigation.navigate('Iniciar sesión');
      }
    }
  };

  return (
    <View style={signUpStyle.container}>
      <Text style={signUpStyle.title}>FIFIUBA</Text>
      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.name.max,
          minLength: constraints.name.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
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
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
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
            theme={{colors: {primary: 'grey'}, roundness: 10}}
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
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      {errors.email?.type === 'validate' &&
      <Text style={{color: 'red'}}>Correo electrónico inválido</Text>}
      <Controller control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={signUpStyle.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Teléfono"
            placeholder="Teléfono"
          />
        )}
        name="phone_number"
      />
      {errors.phone?.type === 'required' &&
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      <Controller control={control}
        rules={{
          required: true,
          min: constraints.age.min,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={signUpStyle.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Edad"
            placeholder="Edad"
          />
        )}
        name="age"
      />
      {errors.age?.type === 'required' &&
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      {errors.age?.type === 'min' &&
      <Text>Mínimo {constraints.age.min}</Text>}
      <Controller control={control}
        rules={{
          required: true,
          maxLength: constraints.password.max,
          minLength: constraints.password.min}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            theme={{colors: {primary: 'grey'}, roundness: 10}}
            style={signUpStyle.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
          />
        )}
        name="password"
      />
      {errors.password?.type === 'required' &&
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      {errors.password?.type === 'maxLength' &&
      <Text>Máximo {constraints.password.max}</Text>}
      {errors.password?.type === 'minLength' &&
      <Text>Mínimo {constraints.password.min}</Text>}
      <View style={signUpStyle.checkboxContainer}>
        <CheckBox
          value={isSelectedPassanger}
          onValueChange={() => setSelectionPassanger(true)}
          style={signUpStyle.checkbox}
          color={Colors.blueGrey800}
        />
        <Text style={signUpStyle.labelCheckbox}>Pasajero</Text>
        <CheckBox
          value={isSelectedDriver}
          onValueChange={() => setSelectionDriver(true)}
          style={signUpStyle.checkbox}
          color={Colors.blueGrey800}
        />
        <Text style={signUpStyle.labelCheckbox}>Chofer</Text>
      </View>
      { code &&
        <Controller control={control}
          rules={{
            required: code,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
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
      <Text style={{color: 'red'}}>Campo obligatorio</Text>}
      {errors.code?.type === 'maxLength' &&
      <Text>Máximo {constraints.code.max}</Text>}
      {errors.code?.type === 'minLength' &&
      <Text>Mínimo {constraints.code.min}</Text>}
      <Button
        color={Colors.blue800}
        style={signUpStyle.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{fontSize: 18}}>Registrar</Text>
      </Button>
      <View style={{margin: 5}}>
        <Text style={{marginTop: 5, textAlign: 'center', fontSize: 18}}>
                    ¿Ya tenes cuenta?{'\n'}
          <Text
            style={{textDecorationLine: 'underline',
              fontSize: 18,
              color: '#0D516B'}}
            onPress={() => props.onNavigation.navigate('Iniciar sesión')}>
                        Iniciar sesión
          </Text>
        </Text>
      </View>
    </View>
  );
};

const constraints = {
  name: {max: 15, min: 3},
  email: {max: 50},
  password: {min: 8, max: 20},
  code: {min: 4, max: 4},
  age: {min: 18},
};

const isValidEmail = (email) =>
  /*eslint-disable*/
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
  );

const signUpStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 30,
    height: 700,
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    paddingLeft: 95,
    margin: 10,
    marginTop: 15,
  },
  loginIcon: {
    marginLeft: 150,
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    marginTop: 5,
  },
  label: {
    fontSize: 16,
  },
  labelCheckbox: {
    margin: 8,
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 15,
  },
  checkbox: {
    alignSelf: 'center',
  },
  button: {
    marginTop: 25,
    height: 55,
    width: 200,
    justifyContent: 'center',
    marginLeft: 70,
  },
});

export default SignUpForm;
