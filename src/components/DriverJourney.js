/* eslint-disable max-len */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Avatar, Button, Colors} from 'react-native-paper';
import MapView, {Marker, Polyline} from 'react-native-maps';
import PolylineMaker from '../services/PolyLineMaker';
import startJourney from '../services/StartJourney';


const blueCar = require('../../assets/icon-car-standard.png');
const proCar = require('../../assets/icon-car-vip.png');

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
    } catch (error) {
      alert(error);
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
          <Avatar.Image size={45} source={require('../../assets/yo.jpg')} />
          <Text>Alejo Villores</Text>
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
          style={styles.startButton}
          disabled={!started}
          onPress={handleStartJourney}
        >
          <Text>Comenzar</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.startButton}
          onPress={goToPassenger}
          disabled={arrived}
          color={Colors.green600}
        >
          <Text>ir</Text>
        </Button>
        <Button
          mode="contained"
          color={Colors.red600}
          disabled={!arrived}
          style={styles.finishButton}
          onPress={() => {
            setDirections([]);
            setInplace(false);
            navigation.navigate('HomeDriver');
          }}
        >
          <Text>Terminar</Text>
        </Button>
      </View>
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
  finishButton: {
    paddingHorizontal: 2,
  },
  startButton: {
    paddingHorizontal: 2,
  },
  appBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  profile: {
    alignItems: 'center',
    padding: 5,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#ffff',
    margin: 10,
    right: 0,
    bottom: 0,
  },
});

export default DriverJourney;