import React, {useState, useEffect} from 'react';
/* eslint-disable max-len */
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Button, Text, ActivityIndicator, Card, Title} from 'react-native-paper';
import getAddrsFromCoords from '../services/GetAddressFromCoords';
import getNearestJourneys from '../services/GetNearestJourneys';
import * as Location from 'expo-location';

const HomeDriver = ({navigation}) => {
  const [avaliableJourneys, setAvaliableJourneys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myLocation, setLocation] = useState();


  useEffect(() => {
    getLocationPermission();
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
    setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
  }


  const getAddresses = async () => {
    try {
      const journeys = await getNearestJourneys();

      const addresses= [];
      setLoading(true);

      journeys.forEach(async (journey) => {
        try {
          const fromStreet = await getAddrsFromCoords(journey.from[0], journey.from[1]);
          const toStreet = await getAddrsFromCoords(journey.to[0], journey.to[1]);
          console.log(fromStreet);
          console.log(toStreet);

          addresses.push({
            _id: journey._id,
            from: fromStreet,
            to: toStreet,
            price: journey.price,
            fromCoords: journey.from,
            toCoords: journey.to,
          });
          setLoading(false);
          setAvaliableJourneys(addresses);
        } catch (err) {
          setLoading(true);
          alert(err);
        }
      });
    } catch (error) {
      alert(error);
      setLoading(true);
    }
  };

  const ShowDataContainer = () => {
    if (loading) {
      return (
        <ActivityIndicator
          style={{justifyContent: 'center', alignSelf: 'center', padding: 5}}
          size={'larger'}
          animating={loading}
          color={'#2C3333'} />
      );
    }
    return (
      <FlatList
        extraData={avaliableJourneys}
        data={avaliableJourneys}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{textAlign: 'center', fontSize: 16}}>No hay viajes cerca!</Text>}
      />);
  };


  const renderItem = ({item}) => (

    <Card style={styles.item} key={item.key}>
      <Card.Title title={'Nuevo Viaje'} />
      <Card.Content>
        <Text variant="headlineMedium"> Desde: {item.from}</Text>
        <Text variant="headlineMedium"> Hasta: {item.to}</Text>
        <Text variant="headlineMedium"> Precio: $ {item.price}</Text>
      </Card.Content>
      <Card.Actions style={{alignSelf: 'center'}}>
        <Button color={'#073b4c'}
          onPress={() => navigation.navigate('ViajeChofer', {'from': item.fromCoords, 'to': item.toCoords, 'carType': item.vip, 'myLocation': myLocation})}
        >Aceptar</Button>
      </Card.Actions>
    </Card>
  );


  return (
    <View style={styles.container}>

      <Title style={{textAlign: 'center', paddingBottom: 5, fontSize: 22}}>
                  Viajes Disponibles
      </Title>
      <SafeAreaView style={styles.dataContainer}>
        <ShowDataContainer/>
      </SafeAreaView>
      <Button
        style={styles.button}
        color={'#0077b6'}
        mode="contained"
        onPress={() => getAddresses()}
      >
        <Text> Buscar Viajes </Text>
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3.5,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  dataContainer: {
    height: '70%',
    width: '90%',
    borderColor: 'black',
    borderRadius: '5%',
  },
  item: {
    marginVertical: 5,
    backgroundColor: '#caf0f8',
  },
  vip: {
    backgroundColor: '#FFF9B0',
    marginVertical: 5,
  },
  button: {
    marginTop: '5%',
    width: '50%',
  },
});


export default HomeDriver;
