import React from 'react';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text,
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import resetPassword from '../services/reset-password';

const ResetPasswordView = () => {
  const [email, setEmail] = useState('');
  const [send, setSend] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <View style={style.container}>
      <View style={style.card}>
        <Text style={style.title}> Recuperar contraseña </Text>
        <TextInput
          label="Correo electrónico"
          type='email'
          mode= "outlined"
          text='email'
          onChangeText={(text) => setEmail(text)}
          style={style.input}
          theme={{colors: {primary: 'grey'}, roundness: 10}}
        />
        <ActivityIndicator
          animating={loading}
          style={style.loading}
        />
        <Button
          style={style.button}
          color={Colors.blue800}
          mode="contained"
          onPress={() => {
            setLoading(true);
            resetPassword(email, setSend, setMsg, setLoading);
            props.onNavigation.navigate('Iniciar sesión');
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Enviar Link</Text>
        </Button>
        <Text style={style.msg}> {send ? msg : ''} </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    marginTop: 190,
    height: 320,
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
  },
});

export default ResetPasswordView;
