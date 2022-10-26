import React, {useState, useContext} from 'react';
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
import searchJourney from '../services/SearchJourney';
import {UserContext} from '../context/UserContext';

const Journey = () => {
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

  const [price, setPrice] = useState(0);
  const [priceSetted, setPriceSetted] = useState(false);

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

  const handleSearchJourney = async () => {
    try {
      const responseRoute = await getRoute(searchOrigin, searchDestination);
      setRoute(responseRoute);
      setOrigin(responseRoute[0]);
      setDestination(responseRoute[(responseRoute.length)-1]);
      console.log('origin:', origin);
      console.log('destination:', destination);
      const responseJourney =
        await searchJourney(origin, destination, userInfo.id);
      console.log('responseJourney', responseJourney);
      setPrice(responseJourney.price);
      setPriceSetted(true);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  React.useEffect(() => {
    // getLocationPermission();
    setPriceSetted(false);
  }, []);

  return (
    <View>
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
      { priceSetted &&
        <View style={styles.priceContainer}>
          <Text style={styles.label}>El precio del viaje es ${price}</Text>
        </View>
      }
      { !priceSetted &&
        <Button
          style={styles.button}
          color={Colors.blue800}
          mode="contained"
          onPress={() => {
            console.log('Buscar viaje');
            handleSearchJourney();
          }}>
          <Text style={styles.titleButton}>Buscar</Text>
        </Button>
      }
      { priceSetted &&
        <Button
          style={styles.journeyButton}
          color={Colors.blue800}
          mode="contained"
          onPress={() => {
            console.log('Iniciar Viaje');
          }}>
          <Text style={styles.titleButton}>Iniciar viaje</Text>
        </Button>
      }
      <MapView
        style={priceSetted ? styles.mapReduced : styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
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
    </View>
  );
};

export default Journey;

const styles = StyleSheet.create({
  title: {
    paddingTop: 30,
    fontSize: 28,
    paddingLeft: 40,
  },
  container: {
    flexDirection: 'row',
    width: '95%',
    marginLeft: 10,
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
    fontSize: 18,
    color: 'white',
  },
  priceContainer: {
    height: 50,
    justifyContent: 'center',
    width: '80%',
    backgroundColor: '#cfd8dc',
    marginLeft: 32,
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
    padding: 5,
    width: 170,
    height: 50,
    marginLeft: 115,
    marginTop: 20,
  },
  journeyButton: {
    padding: 5,
    width: 220,
    height: 50,
    marginLeft: 80,
    marginTop: 20,
  },
  map: {
    margin: 10,
    marginTop: 20,
    width: '95%',
    height: '40%',
  },
  mapReduced: {
    margin: 10,
    marginTop: 20,
    width: '95%',
    height: '30%',
  },
});
