import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator, Text, Snackbar, Button} from 'react-native-paper';
import deposit from '../services/Deposit';
import {Ionicons} from '@expo/vector-icons';


export default function DepositView({navigation, route}) {
  const idPassenger = route.params.id;
  const idDriver = route.params.score_id;
  const eth = route.params.eth;

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [depositText, setDepositText] = React.useState('');
  const [errorDeposit, setError] = React.useState(false);


  React.useEffect(() => {
    const handleResponse = async () => {
      try {
        const response = await deposit(idPassenger, eth.toString());
        setLoading(false);
        setDepositText('Pago realizado!');
      } catch (error) {
        setVisible(true);
        setDepositText('Hubo un error!');
        setError(true);
        setText('No se ha podido realizar el deposito, contáctese con soporte.');
      }
    };
    handleResponse();
  }, [loading]);

  const ShowDataContainer = () => {
    if (loading) {
      return (
        <View style={styles.card}>
          <Text style={styles.text}>Depositando ...</Text>
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
        <Text style={styles.text}>{depositText}</Text>
        <Ionicons
          name={errorDeposit? 'close-outline':'checkmark-circle-outline'}
          size={40}
          color={errorDeposit ? 'red':'green'}
        />
        <Button
          onPress={() => navigation.navigate('Calificacion', {'id': idDriver})}
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
