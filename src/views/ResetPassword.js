import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text,
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import resetPassword from '../services/ResetPassword';

const ResetPasswordView = () => {
  const [send, setSend] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log('email:', data.email);
      setLoading(true);
      await resetPassword(data.email, setSend, setMsg, setLoading);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}> Recuperar contraseña </Text>
        <Controller control={control}
          rules={{
            required: true,
            validate: isValidEmail,
            maxLength: constraints.email.max}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
              style={styles.input}
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
        <Text style={{color: 'red'}}>
          Ingrese un correo electrónico válido
        </Text>}
        <ActivityIndicator
          animating={loading}
          style={styles.loading}
        />
        <Button
          style={styles.button}
          color={Colors.blue800}
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          <Text style={{fontSize: 20, color: 'white'}}>Enviar link</Text>
        </Button>
        <Text style={styles.msg}> {send ? msg : ''}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    marginTop: 170,
    height: 335,
    width: 350,
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
  },
  title: {
    marginTop: 30,
    fontSize: 23,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    padding: 5,
    width: 215,
    height: 50,
    marginLeft: 30,
    marginTop: 15,
  },
  loading: {
    marginTop: 15,
    color: 'grey',
  },
  msg: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#205C5C',
  },
});

const constraints = {
  email: {max: 50},
};

const isValidEmail = (email) =>
/*eslint-disable*/
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
  );

export default ResetPasswordView;
