import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, ActivityIndicator, Button, Text} from 'react-native-paper';
import {NotificationContext} from '../context/NotificationContext';

import cancelJourney from '../services/CancelJourney';
import getJourneyInfo from '../services/GetJourneyInfo';

export default function JourneyView({route, navigation}) {
  /* eslint-disable no-unused-vars */
  const journeyInfo = route.params.journeyInfo;
  const coords = route.params.coords;

  const [loading, setLoading] = useState(true);
  const [cancel, setCancel] = useState(false);
  const notification = useContext(NotificationContext);

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
      console.log('status:', data.status);
      console.log(JSON.stringify(journeyInfo));
      if (data !== undefined) {
        if (data.status == 'accepted' && data.id == journeyInfo.id) {
          setLoading(false);
        }
      }
    }
  }, [notification]);

  React.useEffect(() => {
    const handleGetJourneyInfo = async () => {
      try {
        const response = await getJourneyInfo(journeyInfo.id);
        console.log(response);
        if (response.status == 'accepted') {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetJourneyInfo();
  });

  const handleCancelJourney = async () => {
    try {
      const response = await cancelJourney(journeyInfo);
      if (!(response === null)) {
        setLoading(false);
        setCancel(true);
        navigation.navigate('Home');
      } else {
        alert('Error al cancelar viaje');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Esperando un chofer disponible</Text>
        { loading &&
          <ActivityIndicator
            animating={loading}
            color="#757575"
            style={{marginTop: 10}}
          />
        }
        <Button
          style={styles.button}
          color={Colors.red800}
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
  button: {
    padding: 5,
    width: 210,
    height: 50,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
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
});
