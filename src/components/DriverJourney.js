/* eslint-disable max-len */
import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Avatar, Button, Colors, Snackbar} from 'react-native-paper';
import MapView, {Marker, Polyline} from 'react-native-maps';
// import schedulePushNotification from '../utils/PushNotifications';

import PolylineMaker from '../services/PolyLineMaker';
import startJourney from '../services/StartJourney';
import finishJourney from '../services/FinishJourney';
import getUserInfo from '../services/GetUserInfo';
import getOpinion from '../services/GetOpinions';

import {NotificationContext} from '../context/NotificationContext';

const blueCar = require('../../assets/icon-car-standard.png');
const proCar = require('../../assets/icon-car-vip.png');

import InfoModal from './InfoModal';

import {UserContext} from '../context/UserContext';
import {error} from '../utils/HandleError';

/* eslint-disable new-cap */
const DriverJourney = ({navigation, route}) => {
  const journey = route.params;
  const myLocation = journey.myLocation;
  const [directions, setDirections] = useState([]);
  const [arrived, setInplace] = useState(false);
  const [started, setStarted] = useState(false);
  const mapRef = React.createRef();
  const [fromLocation, setFrom] = useState(myLocation);
  const [toLocation, setTo] = useState(myLocation);
  const notification = useContext(NotificationContext);

  const user = useContext(UserContext);
  const userInfo = user.userInfo;

  const [cancelled, setCancelled] = useState(false);
  const [text, setText] = useState('');

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');

  React.useEffect(() => {
    console.log(notification);
    if (notification) {
      const data = notification.request.content.data;
      if (data !== undefined) {
        if (data.status == 'cancelled' && data.id == journeyInfo.id) {
          setCancelled(true);
          setText('El viaje ha sido cancelado');
          navigation.navigate('HomeDriver');
        }
      }
    }
  }, [notification]);

  const goToPassenger = () => {
    const from = `${myLocation.latitude}, ${myLocation.longitude}`;
    const to = `${journey.from[0]}, ${journey.from[1]}`;

    PolylineMaker(from, to)
        .then((result) => {
          const end = result[result.length - 1];
          setDirections(result);
          setFrom(myLocation);
          setTo(end);
          setInplace(true);
          setStarted(true);
        })
        .catch((err) => setDirections(err));
  };

  const handleStartJourney = async () => {
    try {
      await startJourney(journey);
      const from = `${journey.from[0]}, ${journey.from[1]}`;
      const to = `${journey.to[0]}, ${journey.to[1]}`;
      const result = await PolylineMaker(from, to);

      const start = result[0];
      const end = result[result.length - 1];
      setDirections(result);
      setFrom(start);
      setTo(end);
      setStarted(false);
    } catch (err) {
      setVisible(true);
      setMsg(error.SHOW_ROUTE_ERROR);
    }
  };

  const handleViewUserInfo = async () => {
    try {
      const response = await getUserInfo(journey.idPassenger);
      const comments = await getOpinion(journey.idPassenger, 'passenger');
      console.log('response', response);
      navigation.navigate('PerfilUsuario', {'data': response, 'opinions': comments});
    } catch (err) {
      console.log(err.message);
      setText(error.GENERAL_ERROR);
    }
  };

  const handleFinishJourney = async () => {
    try {
      await finishJourney(journey);
      setDirections([]);
      setInplace(false);
      navigation.navigate('Pago', {'id': userInfo.id, 'score_id': journey.idPassenger, 'eth': journey.price});
    } catch (err) {
      console.log(err);
      setMsg(error.JOURNEY_FINISHED_ERROR);
      setVisible(true);
    }
  };

  function car() {
    if (journey.carType) {
      return proCar;
    }
    return blueCar;
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <View style={styles.profile}>
          <Avatar.Image size={45} source={{uri: userInfo.picture}} />
          <Text>{userInfo.name}</Text>
        </View>
        <View style={styles.profileButton}>
          <Button
            mode="contained"
            color={Colors.blue700}
            onPress={handleViewUserInfo}
            style={styles.button}>
            <Text>Ver perfil</Text>
          </Button>
        </View>
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: myLocation.latitude,
          longitude: myLocation.longitude,
          latitudeDelta: 0.004733688902177846,
          longitudeDelta: 0.004036916859504913,
        }}
        ref={mapRef}
        showsUserLocation={false}
        loadingEnabled={true}
      >
        <Marker coordinate={myLocation} title="Aqui estas tú">
          <Image
            source={car()}
            style={{width: 70, height: 70}}
            resizeMode="contain"
          />
        </Marker>
        <Marker coordinate={fromLocation} title="Aqui estas tú"></Marker>
        <Marker coordinate={toLocation} title="Aqui estas tú"></Marker>

        <Polyline coordinates={directions} strokeWidth={2} />
      </MapView>
      <View style={styles.buttonsBox}>
        <Button
          mode="contained"
          color={Colors.green700}
          style={styles.button}
          disabled={!started}
          onPress={handleStartJourney}
        >
          <Text>Comenzar</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={goToPassenger}
          disabled={arrived}
          color={Colors.green700}
        >
          <Text>ir</Text>
        </Button>
        <Button
          mode="contained"
          color={Colors.red700}
          disabled={!arrived}
          style={styles.button}
          onPress={handleFinishJourney}
        >
          <Text>Terminar</Text>
        </Button>
        <Button
          style={styles.cancelButton}
          color={Colors.red700}
          mode="contained"
          onPress={() => {
            console.log('Cancel journey');
          }}>
          <Text style={styles.buttonText}>Cancelar viaje</Text>
        </Button>
      </View>
      { cancelled && <InfoModal modalText={text}/>}
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
    flexDirection: 'column',
    backgroundColor: '#f1faee',
  },
  map: {
    width: '100%',
    height: '75%',
  },
  buttonsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 2,
    borderRadius: 20,
  },
  cancelButton: {
    height: 45,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 20,
  },
  buttonText: {
    color: 'white',
  },
  appBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 5,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#ffff',
    margin: 10,
    right: 0,
    bottom: 0,
  },
  profileButton: {
    alignSelf: 'center',
  },
});

export default DriverJourney;
