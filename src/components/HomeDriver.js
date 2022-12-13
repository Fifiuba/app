import React, {useState, useEffect, useContext} from 'react';
/* eslint-disable max-len */
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Button, Text, ActivityIndicator, Card, Title, Snackbar, Colors} from 'react-native-paper';

import getAddressFromCoords from '../services/GetAddressFromCoords';
import getNearestJourneys from '../services/GetNearestJourneys';
import acceptJourney from '../services/AcceptJourney';
import * as Location from 'expo-location';
import {UserContext} from '../context/UserContext';

const HomeDriver = ({navigation}) => {
  const [avaliableJourneys, setAvaliableJourneys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myLocation, setLocation] = useState();
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');

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
      const journeys = await getNearestJourneys(myLocation);
      setAvaliableJourneys([]);

      const addresses= [];
      setLoading(true);

      if (journeys.length == 0) setLoading(false);
      journeys.forEach(async (journey) => {
        try {
          const fromStreet = await getAddressFromCoords(journey.from[0], journey.from[1]);
          const toStreet = await getAddressFromCoords(journey.to[0], journey.to[1]);

          addresses.push({
            id: journey._id,
            from: fromStreet,
            to: toStreet,
            idPassenger: journey.idPassenger,
            price: journey.price,
            fromCoords: journey.from,
            toCoords: journey.to,
          });
          setLoading(false);
          setAvaliableJourneys(addresses);
        } catch (err) {
          setLoading(false);
          setText('Se ha producido un error al intentar buscar los viajes!.\n Reitente');
          setVisible(true);
        }
      });
    } catch (error) {
      setLoading(false);
      setText('Se ha producido un error al intentar buscar los viajes!.\n Reitente');
      setVisible(true);
    }
  };

  const user = useContext(UserContext);
  const userInfo = user.userInfo;

  const accept = async (journey) => {
    try {
      const response = await acceptJourney(journey, userInfo.id);
      if (response.status === 'accepted') {
        navigation.navigate('ViajeChofer', {'id': journey.id,'price':response.price ,'from': journey.fromCoords, 'to': journey.toCoords, 'carType': journey.vip, 'myLocation': myLocation, 'idPassenger': journey.idPassenger});
      } else {
        setText('El viaje ya fue tomado por otro conductor');
        setVisible(true);
      }
    } catch (error) {
      setText('No pudimos realizar la request correctamente');
      setVisible(true);
    }
  };

  const reject = (id) => {
    const filteredData = avaliableJourneys.filter((item) => item.id !== id);
    setAvaliableJourneys(filteredData);
  };

  const ShowDataContainer = () => {
    if (loading) {
      return (
        <ActivityIndicator
          animating={loading}
          color="#757575"
          style={{marginTop: 10}}
        />
      );
    }
    return (
      <FlatList
        data={avaliableJourneys}
        extraData={avaliableJourneys}
        keyExtractor={(item) => item.id}
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
          onPress={() => accept(item)}
        >Aceptar</Button>
        <Button color={'#e63946'}
          onPress={() => reject(item.id)}
        >Rechazar</Button>
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
        color={Colors.blue700}
        mode="contained"
        onPress={() => getAddresses()}
      >
        <Text style={{color: 'white'}}> Buscar Viajes </Text>
      </Button>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dataContainer: {
    height: '70%',
    width: '90%',
    borderColor: 'black',
    borderRadius: 5,
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
    height: 45,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});


export default HomeDriver;
