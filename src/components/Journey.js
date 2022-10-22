import React, {useState} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Text,
  TextInput,
  Button,
  Colors,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import MapView, {Marker, Polyline} from 'react-native-maps';

export const Journey = () => {
  const [origin, setOrigin] = useState({
    latitude: -34.6037,
    longitude: -58.3816,
  });

  const [destination, setDestination] = useState({
    latitude: -34.5872,
    longitude: -58.4266,
  });

  const {control, handleSubmit} = useForm({
    defaultValues: {
      default_address: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('Journey component');
  };

  return (
    <>
      <Text style={styles.title}>Realizar viaje</Text>
      <View style={styles.container}>
        <Controller control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              theme={{colors: {primary: 'grey'}, roundness: 10}}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              label="Destino"
              placeholder="Destino" />
          )}
          name="default_address" />
      </View>
      <Button
        style={styles.button}
        color={Colors.blue800}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        <Text style={{fontSize: 18, color: 'white'}}>Buscar</Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 50,
    fontSize: 28,
    paddingLeft: 110,
  },
  container: {
    flexDirection: 'row',
    width: '95%',
    marginLeft: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    width: '85%',
  },
  button: {
    padding: 5,
    width: 170,
    height: 50,
    marginLeft: 115,
    marginTop: 35,
  },
  map: {
    margin: 10,
    marginTop: 20,
    width: '95%',
    height: '35%',
  },
});
