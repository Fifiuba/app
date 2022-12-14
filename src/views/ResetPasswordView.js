import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text,
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
  Snackbar,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import resetPassword from '../services/ResetPassword';
import {constraints} from '../utils/Constraints';
import {isValidEmail} from '../utils/EmailValidation';
import InfoModal from '../components/InfoModal';

const ResetPasswordView = () => {
  const [send, setSend] = useState(false);
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = React.useState(false);
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
      await resetPassword(data.email, setSend, setMsg, setLoading, setVisible);
    } catch (error) {
      console.log(error);
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
              label="Correo electrónico"
              placeholder="Correo electrónico"
            />
          )}
          name="email"
        />
        {errors.email?.type === 'required' &&
        <Text style={{color: 'red'}}>Campo obligatorio</Text>}
        {errors.email?.type === 'validate' &&
        <Text style={{color: 'red'}}>
          Correo electrónico inválido
        </Text>}
        { loading && <ActivityIndicator
          animating={loading}
          color="#757575"
          style={{marginTop: 10}}
          size="small"
        />}
        <Button
          style={styles.button}
          color={Colors.green700}
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.textButton}>Enviar link</Text>
        </Button>
        { send && <InfoModal modalText={msg}/>}
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
          },
        }}>
        {msg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    height: 350,
    width: 350,
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 23,
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    height: 45,
    width: 180,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 15,
    alignSelf: 'center',
  },
  textButton: {
    color: 'white',
  },
});

export default ResetPasswordView;
