import React, {useState} from 'react';
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

export const Journey = () => {
  const [origin, setOrigin] = useState({
    latitude: -34.5872,
    longitude: -58.4266,
  });
  const [destination, setDestination] = useState({
    latitude: -38.05077,
    longitude: -57.54162,
  });

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
    getLocationPermission();
    console.log('origin:', origin);
  }, []);

  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

  return (
    <View>
      <Text style={styles.title}>¿Deseas iniciar un viaje?</Text>
      <View style={styles.container}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
      </View>
      <Button
        style={styles.button}
        color={Colors.blue800}
        mode="contained"
        onPress={() => console.log('Press on')}>
        <Text style={styles.titleButton}>Buscar</Text>
      </Button>
      <MapView
        style={styles.map}
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
          coordinates={[origin, destination]}
          strokeColor="red"
          strokeWidth={5}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 50,
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
  button: {
    padding: 5,
    width: 170,
    height: 50,
    marginLeft: 115,
    marginTop: 10,
  },
  map: {
    margin: 10,
    marginTop: 20,
    width: '95%',
    height: '40%',
  },
});
