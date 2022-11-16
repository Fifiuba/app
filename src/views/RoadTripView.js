import React, {useContext, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {Text, Button, Colors} from 'react-native-paper';
import * as Location from 'expo-location';

import {UserContext} from '../context/UserContext';
import TimerJourney from '../components/TimerJourney';
import cancelJourney from '../services/CancelJourney';
import getJourneyInfo from '../services/GetJourneyInfo';

const RoadTripView = ({navigation, route}) => {
  const info = route.params;
  const coords = info.coords.route;
  const journeyInfo = info.journeyInfo;

  const user = useContext(UserContext);
  const userInfo = user.userInfo;

  const [origin, setOrigin] = useState({
    latitude: journeyInfo.from[0],
    longitude: journeyInfo.from[1],
  });
  const [destination, setDestination] = useState({
    latitude: journeyInfo.to[0],
    longitude: journeyInfo.to[1],
  });
  /* eslint-disable no-unused-vars */
  const routeCoords = coords;

  /* eslint-disable no-unused-vars */
  const getLocationPermission = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('Permiso denegado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setOrigin(current);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  React.useEffect(() => {
    // getLocationPermission();
  }, []);

  const [finished, setFinished] = useState(false);
  const [startTimer, setStartTimer] = useState(true);
  const [resetTimer, setResetTimer] = useState(false);

  React.useEffect(() => {
    if (finished) {
      setStartTimer(false);
      navigation.navigate('Home');
    }
  }, [finished]);

  const handleCancelJourney = async () => {
    try {
      const response = await cancelJourney(journeyInfo);
      console.log('response:', response);
      if (!(response === null)) {
        if (response.status == 'cancelled') {
          setFinished(true);
          alert('Viaje cancelado exitosamente');
        }
      } else {
        alert('Error al cancelar viaje');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  React.useEffect(() => {
    const handleGetJourneyInfo = async () => {
      const response = await getJourneyInfo(journeyInfo.id);
      if (response.status == 'cancelled') {
        console.log('response:' + response.status);
        setFinished(true);
        alert('Tu viaje ha sido cancelado');
      }
    };
    handleGetJourneyInfo();
  });

  return (
    <>
      <View style={styles.appBar}>
        <View style={styles.profile}>
          <Image
            style={styles.image}
            source={{uri: userInfo.picture}}/>
          <Text>{userInfo.name}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <TimerJourney
          isStopwatchStart={startTimer}
          resetStopwatch={resetTimer}
        />
        <MapView
          style={styles.map}
          region={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            draggable
            coordinate={origin}
            onDragEnd={(direction) =>
              setOrigin(direction.nativeEvent.coordinate)} />
          <Marker
            draggable
            coordinate={destination}
            onDragEnd={(direction) =>
              setDestination(direction.nativeEvent.coordinate)} />
          <Polyline
            coordinates={routeCoords}
            strokeColor="red"
            strokeWidth={5} />
        </MapView>
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
      </View>
    </>
  );
};

export default RoadTripView;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '10%',
    marginTop: 50,
    margin: 10,
  },
  profile: {
    alignItems: 'center',
    padding: 5,
  },
  map: {
    width: '95%',
    height: '70%',
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
  image: {
    width: 60,
    height: 60,
  },
});

