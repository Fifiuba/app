import React, {useContext, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {Text, Button, Colors, Snackbar} from 'react-native-paper';

import {UserContext} from '../context/UserContext';
import TimerJourney from '../components/TimerJourney';
import getJourneyInfo from '../services/GetJourneyInfo';
import getDriverInfo from '../services/GetDriverInfo';
import getOpinion from '../services/GetOpinions';

import {NotificationContext} from '../context/NotificationContext';
import getUserInfo from '../services/GetUserInfo';
import {error} from '../utils/HandleError';

const RoadTripView = ({navigation, route}) => {
  const info = route.params;
  const coords = info.coords.route;
  const journeyInfo = info.journeyInfo;
  const notification = useContext(NotificationContext);

  const user = useContext(UserContext);
  const userInfo = user.userInfo;

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  const [startTimer, setStartTimer] = useState(false);
  const [finished, setFinished] = useState(false);

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
    const handleResponse = async () => {
      if (finished) {
        setStartTimer(false);
        try {
          const response = await getJourneyInfo(journeyInfo.id);
          navigation.navigate('Deposito',
              {'id': userInfo.id,
                'score_id': response.driver.idDriver,
                'eth': journeyInfo.price});
        } catch (err) {
          setVisible(true);
          setText(error.GENERAL_ERROR);
        }
      }
    };
    handleResponse();
  }, [finished]);

  const handleViewDriverInfo = async () => {
    try {
      const journey = await getJourneyInfo(journeyInfo.id);
      const user = await getUserInfo(journey.driver.idDriver);
      const response = await getDriverInfo(journey.driver.idDriver);
      const comments = await getOpinion(journey.driver.idDriver, 'driver');
      navigation.navigate('PerfilChofer',
          {'data': response,
            'user': user,
            'opinions': comments});
    } catch (err) {
      setMsg(err.GENERAL_ERROR);
      setVisible(true);
    }
  };

  return (
    <>
      <View style={styles.appBar}>
        <View style={styles.profileButton}>
          <Button
            mode="contained"
            color={Colors.blue700}
            onPress={handleViewDriverInfo}
            style={styles.button}>
            <Text style={styles.buttonText}>Ver perfil</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 50,
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
    height: 45,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 20,
  },
  buttonText: {
    color: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileButton: {
    alignSelf: 'flex-end',
  },
});

