/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {Appbar, Avatar, Button, Colors, FAB} from 'react-native-paper';
import MapView, {Marker, Polyline} from 'react-native-maps';
import PolylineMaker from '../services/PolyLineMaker';
import * as Location from 'expo-location';

const blueCar = require('../../assets/icon-car-standard.png');
const proCar = require('../../assets/icon-car-vip.png');
const locationIcon = require('../../assets/location.png');

/* eslint-disable new-cap */
const DriverJourney = ({navigation, route}) => {
  const journey = route.params
  const myLocation = journey.myLocation;
  const [directions, setDirections] = useState();
  const [arrived, setInplace] = useState(false);
  const mapRef = React.createRef();
  const [desde, setDesde] = useState(myLocation);
  const [hasta, setHasta] = useState(myLocation);


  const goToPassenger = () => {
    const from = `${myLocation.latitude}, ${myLocation.longitude}`;
    const to = `${journey.from[0]}, ${journey.from[1]}`;

    PolylineMaker(from, to)
        .then(
            (result) => {
              const end = result[result.length-1];
              setDirections(result);
              setDesde(myLocation);
              setHasta(end);
              setInplace(true);
            },
        )
        .catch(
            (err) => setDirections(err),
        );
  };

  const startJourney = () => {
    const from = `${journey.from[0]}, ${journey.from[1]}`;
    const to = `${journey.to[0]}, ${journey.to[1]}`;
    PolylineMaker(from, to)
        .then(
            (result) => {
              const start = result[0];
              const end = result[result.length -1];
              setDirections(result);
              setDesde(start);
              setHasta(end);
            },
        )
        .catch(
            (err) => setDirections(err),
        );
  };

  function car() {
    if (journey.carType) {
      return proCar;
    }
    return blueCar;
  }

  const goToMyLocation = async () => {
    console.log('Pressed!');
    mapRef.current.animateCamera({center: myLocation});
  };

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

        <Marker
          coordinate={myLocation}
          title="Aqui estas tú"
        >
          <Image
            source={car()}
            style={{width: 70, height: 70}}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          coordinate={desde}
          title="Aqui estas tú"
        >
        </Marker>
        <Marker
          coordinate={hasta}
          title="Aqui estas tú"
        >
        </Marker>

        <Polyline
          coordinates={directions}
          strokeWidth={2}
        />
        <FAB
          icon={locationIcon}
          style={styles.fab}
          onPress={goToMyLocation}
        />
      </MapView>
      <View style={styles.buttonsBox}>
        <Button
          mode="contained"
          style={styles.startButton}
          disabled={!arrived}
          onPress={startJourney}>
          <Text>Comenzar</Text>
        </Button>
        <Button

          mode="contained"
          style={styles.startButton}
          onPress={goToPassenger}
          disabled={arrived}
          color={Colors.green600}>
          <Text>ir</Text>
        </Button>
        <Button
          mode="contained"
          color={Colors.red600}
          disabled={!arrived}
          style={styles.finishButton}
          onPress={() => {
            setDirections([])
            setInplace(false)
            navigation.navigate('HomeDriver')
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
    backgroundColor: '#bebeb6',

  },
  map: {
    width: '100%',
    height: '80%',
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
