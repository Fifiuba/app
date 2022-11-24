import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Text,
  Button,
  Colors,
} from 'react-native-paper';
import MapView, {Marker, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';

import SearchBar from './SearchBar';
import getRoute from '../services/GetRoute';
import createJourney from '../services/CreateJourney';
import {UserContext} from '../context/UserContext';
import getJourneyPrice from '../services/GetJourneyPrice';

const PassengerJourney = ({navigation}) => {
  const user = useContext(UserContext);
  const userInfo = user.userInfo;

  const [origin, setOrigin] = useState({
    latitude: -34.59908,
    longitude: -58.38186,
  });
  const [destination, setDestination] = useState({
    latitude: -34.59908,
    longitude: -68.38186,
  });
  const [route, setRoute] = useState([]);

  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [clicked, setClicked] = useState(false);

  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceSetted, setPriceSetted] = useState(false);

  useEffect(() => {
    getLocationPermission();
    setSearchOrigin('');
    setSearchDestination('');
    setPrice(0);
  }, []);

  async function getLocationPermission() {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      enableHighAccuracy: true,
      timeInterval: 5,
    });
    setOrigin({latitude: location.coords.latitude,
      longitude: location.coords.longitude});
  }

  const setJourneyInfo = (route, distance) => {
    setDistance(distance);
    setRoute(route);
    setOrigin(route[0]);
    setDestination(route[(route.length)-1]);
    console.log('distance:', distance);
    console.log('origin:', origin);
    console.log('destination:', destination);
  };

  const handleGetInfoJourney = async () => {
    try {
      const response = await getRoute(searchOrigin, searchDestination);
      setPriceSetted(false);
      if (!(response === null)) {
        const distance = response[1];
        setJourneyInfo(response[0], distance);
        const journeyPrice = await getJourneyPrice(distance);       
        if (!(journeyPrice === null)) {
          if (journeyPrice != 0) {
            setPrice(journeyPrice);
            setPriceSetted(true);
            console.log('price distinto de 0');
          }
        }
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const handleCreateJourney = async () => {
    try {
      const journeyInfo =
        await createJourney(origin, destination, userInfo.id, distance);
      console.log('Response CreateJourney', journeyInfo);
      navigation.navigate('Viajes', {
        'journeyInfo': {
          'id': journeyInfo._id,
          'status': journeyInfo.status,
          'idPassenger': journeyInfo.idPassenger,
          'price': journeyInfo.price,
          'startOn': journeyInfo.startOn,
          'finishOn': journeyInfo.__finishOn,
          'from': journeyInfo.from,
          'to': journeyInfo.to,
        },
        'coords': {route},
      });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  React.useEffect(() => {
    setSearchOrigin('');
    setSearchDestination('');
    setPriceSetted(false);
  }, []);

  return (
    <View style={styles.journeyContainer}>
      <Text style={styles.title}>¿Deseas iniciar un viaje?</Text>
      <View style={styles.container}>
        <SearchBar
          searchPhrase={searchOrigin}
          setSearchPhrase={setSearchOrigin}
          clicked={clicked}
          setClicked={setClicked}
          placeholderValue="Buscar origen"
        />
      </View>
      <View style={styles.container}>
        <SearchBar
          searchPhrase={searchDestination}
          setSearchPhrase={setSearchDestination}
          clicked={clicked}
          setClicked={setClicked}
          placeholderValue="Buscar destino"
        />
      </View>
      <MapView
        style={priceSetted ? styles.mapReduced : styles.map}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          draggable
          coordinate={origin}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker
          draggable
          coordinate={destination}
          onDragEnd={(direction) =>
            setDestination(direction.nativeEvent.coordinate)}
        />
        <Polyline
          coordinates={route}
          strokeColor="red"
          strokeWidth={5}
        />
      </MapView>
      { priceSetted &&
        <View style={styles.priceContainer}>
          <Text style={styles.label}>El precio del viaje es ${price}</Text>
        </View>
      }
      <View style={styles.buttonHolder}>
        <Button
          style={styles.button}
          color={Colors.blue800}
          mode="contained"
          onPress={handleGetInfoJourney}>
          <Text style={styles.titleButton}>Buscar</Text>
        </Button>
        <Button
          disabled={!priceSetted}
          style={styles.journeyButton}
          color={Colors.grey400}
          mode="contained"
          onPress={() => {
            console.log('Solicitar viaje');
            handleCreateJourney();
          }}>
          <Text style={styles.titleButton}>Solicitar viaje</Text>
        </Button>
      </View>
    </View>
  );
};

export default PassengerJourney;

const styles = StyleSheet.create({
  journeyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 28,
  },
  container: {
    flexDirection: 'row',
    width: '95%',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    width: '85%',
  },
  titleButton: {
    fontSize: 17,
    color: 'white',
  },
  priceContainer: {
    height: 50,
    justifyContent: 'center',
    width: '70%',
    backgroundColor: '#cfd8dc',
    marginTop: 20,
    borderRadius: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#37474f',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 3,
    paddingHorizontal: 0,
    width: 170,
    height: 50,
    marginTop: 10,
  },
  journeyButton: {
    paddingVertical: 3,
    paddingHorizontal: 0,
    width: 200,
    height: 50,
    marginTop: 10,
  },
  map: {
    margin: 5,
    marginTop: 20,
    width: '95%',
    height: '50%',
  },
  mapReduced: {
    margin: 5,
    marginTop: 20,
    width: '95%',
    height: '40%',
  },
  buttonHolder: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
