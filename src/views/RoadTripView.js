import React, {useContext, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {Text, Button, Colors} from 'react-native-paper';

import {UserContext} from '../context/UserContext';
import TimerJourney from '../components/TimerJourney';
import cancelJourney from '../services/CancelJourney';
import getJourneyInfo from '../services/GetJourneyInfo';
import getDriverInfo from '../services/GetDriverInfo';

import {NotificationContext} from '../context/NotificationContext';
import getUserInfo from '../services/GetUserInfo';


const RoadTripView = ({navigation, route}) => {
  const info = route.params;
  const coords = info.coords.route;
  const journeyInfo = info.journeyInfo;
  const notification = useContext(NotificationContext);
  const user = useContext(UserContext);
  const userInfo = user.userInfo;
  const [startTimer, setStartTimer] = useState(false);
  const [finished, setFinished] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [id, setId] = useState('');

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

  React.useEffect(() => {
    console.log(notification);
    if (notification) {
      const data = notification.request.content.data;
      if (data !== undefined) {
        if (data.status == 'started' && data.id == journeyInfo.id) {
          setStartTimer(true);
          setCancelled(true);
        }
      }
    }
  }, [notification]);

  

  React.useEffect(() => {
    console.log(notification);
    if (notification) {
      const data = notification.request.content.data;
      if (data !== undefined) {
        if (data.status == 'finish' && data.id == journeyInfo.id) {
          setFinished(true);
        }
      }
    }
  }, [notification]);

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
          setCancelled(true);
          alert('Viaje cancelado exitosamente');
        }
      } else {
        alert('Error al cancelar viaje');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleViewDriverInfo = async () => {
    try {
      var response = await getJourneyInfo(journeyInfo.id);
      let user = await getUserInfo(response.driver.idDriver)
      response = await getDriverInfo(response.driver.idDriver);
      console.log('response:'+ response);
      navigation.navigate('PerfilChofer', {'data': response,'user':user});
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <>
      <View style={styles.appBar}>
        <View style={styles.profileButton}>
          <Button
            mode="contained"
            color={Colors.blue600}
            onPress={handleViewDriverInfo}>
            <Text>Ver perfil</Text>
          </Button>
        </View>
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
        />
        <MapView
          style={styles.map}
          region={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          loadingEnabled={true}
          >
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
          disabled={cancelled}
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
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop:50
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
  profileButton: {
    alignSelf: 'flex-end',
  },
});

