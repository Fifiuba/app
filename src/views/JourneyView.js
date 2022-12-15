import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors,
  ActivityIndicator,
  Button, Text, Snackbar} from 'react-native-paper';

import {NotificationContext} from '../context/NotificationContext';
import cancelJourney from '../services/CancelJourney';

import {error} from '../utils/HandleError';

export default function JourneyView({route, navigation}) {
  /* eslint-disable no-unused-vars */
  const journeyInfo = route.params.journeyInfo;
  const coords = route.params.coords;
  const streets = route.params.streets;

  const [loading, setLoading] = useState(true);
  const [cancel, setCancel] = useState(false);
  const notification = useContext(NotificationContext);

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  React.useEffect(() => {
    console.log('loading:', loading);
    if (!loading) {
      navigation.navigate('EnViaje',
          {'coords': coords,
            'journeyInfo': journeyInfo},
      );
    }
  }, [loading]);

  React.useEffect(() => {
    console.log(notification);
    if (notification) {
      const data = notification.request.content.data;
      if (data !== undefined) {
        if (data.status == 'accepted' && data.id == journeyInfo.id) {
          setLoading(false);
        }
      }
    }
  }, [notification]);


  const handleCancelJourney = async () => {
    try {
      const response = await cancelJourney(journeyInfo);
      if (!(response === null)) {
        setLoading(false);
        setCancel(true);
        navigation.navigate('Home');
      } else {
        setText(error.CANCEL_JOURNEY_ERROR);
        setVisible(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Esperando un chofer disponible</Text>
        <View style={styles.bodyContainer}>
          <Text style={styles.textTitle}>Datos del viaje</Text>
          <Text style={styles.text}>Desde: {streets.from} </Text>
          <Text style={styles.text}>Hasta: {streets.to} </Text>
          <Text style={styles.text}>Precio: {journeyInfo.price} </Text>
        </View>
        { loading &&
          <ActivityIndicator
            animating={loading}
            color="#757575"
            style={{marginTop: 10}}
            size="small"
          />
        }
        <Button
          style={styles.button}
          color={Colors.red700}
          mode="contained"
          onPress={() => {
            console.log('Cancel journey');
            handleCancelJourney();
          }}>
          <Text style={styles.buttonText}>Cancelar viaje</Text>
        </Button>
        { cancel &&
          <Text style={styles.successMsg}>
            Viaje cancelado exitosamente
          </Text>
        }
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    height: '45%',
    width: 360,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 15,
    marginBottom: 20,
    fontSize: 20,
    color: '#282829',
    textAlign: 'left',
  },
  button: {
    height: 45,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 20,
  },
  buttonText: {
    color: 'white',
  },
  successMsg: {
    marginTop: 10,
    fontSize: 18,
    color: '#616161',
    backgroundColor: '#c8e6c9',
    borderRadius: 16,
    height: 40,
    width: 320,
    marginTop: 20,
    paddingTop: 5,
    paddingLeft: 10,
  },
  bodyContainer: {
    height: 80,
    marginBottom: 20,
    width: '75%',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    margin: 5,
  },
  text: {
    color: '#282829',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 5,
  },
});
