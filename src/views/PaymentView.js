import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator, Text, Snackbar, Button} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';
import pay from '../services/Payment';


export default function PaymentView({navigation, route}) {
  const idDriver = route.params.id;
  const idPassanger = route.params.score_id;

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [paytext, setPayText] = React.useState('');
  const [errorPayment, setError] = React.useState(false);


  React.useEffect(() => {
    const handleResponse = async () => {
      try {
        const response = await pay(idDriver);
        setLoading(false);
        setPayText('Pago realizado!');
      } catch (error) {
        setPayText('Hubo un error!');
        setError(true);
        setVisible(true);
        setText('No se ha podido realizar el deposito, contáctese con soporte.');
      }
    };
    handleResponse();
  }, [loading]);

  const ShowDataContainer = () => {
    if (loading) {
      return (
        <View style={styles.card}>
          <Text style={styles.text}>Recibiendo transaccion ...</Text>
          <ActivityIndicator
            animating={loading}
            color="#757575"
            style={{marginTop: 10}}
          />
        </View>
      );
    }
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{paytext}</Text>
        <Ionicons
          name={errorPayment? 'close-outline':'checkmark-circle-outline'}
          size={40}
          color={errorPayment ? 'red':'green'}
        />
        <Button
          onPress={() => navigation.navigate('Calificacion', {'id': idPassanger})}
        >Calificar</Button>
        <Button
          onPress={() => navigation.navigate('Home')}
        >Inicio</Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ShowDataContainer/>
      <Snackbar
        visible={visible}
        duration={10000}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
            navigation.navigate('Home');
          },
        }}>
        {text}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    height: 270,
    width: 360,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 20,
    color: '#282829',
    textAlign: 'center',
  },
});
