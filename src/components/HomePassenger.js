import React, {useState, useContext} from 'react';
/* eslint-disable max-len */
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Button, Text, ActivityIndicator, Card, Title} from 'react-native-paper';

import getAddressFromCoords from '../services/GetAddressFromCoords';
import {UserContext} from '../context/UserContext';
import getLastJourneysInfo from '../services/GetLastJourneysInfo';

const HomePassenger = ({navigation}) => {
  const [lastJourneys, setLastJourneys] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useContext(UserContext);
  const userInfo = user.userInfo;
  console.log('id user context:', userInfo.id);

  const isNotInLatestJourneys = (journey) => {
    for (let idx = 0; idx < lastJourneys.length; idx++) {
      if (lastJourneys[idx].id == journey._id) {
        return false;
      }
    }
    return true;
  };

  const getLastJourneys = async () => {
    console.log('get last journeys');
    try {
      const journeys = await getLastJourneysInfo();
      setLoading(true);
      console.log('cant viajes:', journeys.length);
      if (journeys.length == 0) setLoading(false);
      journeys.forEach(async (journey) => {
        try {
          const fromStreet = await getAddressFromCoords(journey.from[0], journey.from[1]);
          const toStreet = await getAddressFromCoords(journey.to[0], journey.to[1]);
          console.log('journey passenger id:', journey.idPassenger);
          if (journey.idPassenger == userInfo.id) {
            if (isNotInLatestJourneys(journey)) {
              lastJourneys.push({
                id: journey._id,
                from: fromStreet,
                to: toStreet,
                price: journey.price,
              });
            }
          }
          setLoading(false);
          setLastJourneys(lastJourneys);
        } catch (error) {
          setLoading(false);
          console.error(error.message);
          alert('Se ha producido un error al intentar buscar los viajes!');
        }
      });
    } catch (error) {
      setLoading(false);
      alert(error);
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
        data={lastJourneys}
        extraData={lastJourneys}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            No has realizado ningún viaje aún!
          </Text>}
      />);
  };

  const renderItem = ({item}) => (

    <Card style={styles.item} key={item.key}>
      <Card.Title title={'Viaje realizado'} />
      <Card.Content>
        <Text variant="headlineMedium"> Desde: {item.from}</Text>
        <Text variant="headlineMedium"> Hasta: {item.to}</Text>
        <Text variant="headlineMedium"> Precio: $ {item.price}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
                  Últimos viajes realizados
      </Title>
      <SafeAreaView style={styles.dataContainer}>
        <ShowDataContainer/>
      </SafeAreaView>
      <Button
        style={styles.button}
        color={'#0077b6'}
        mode="contained"
        onPress={getLastJourneys}
      >
        <Text style={styles.buttonText}> Buscar últimos viajes </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    marginLeft: 10,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 25,
    fontSize: 22,
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
    width: '93%',
  },
  button: {
    marginTop: '5%',
    width: '60%',
    height: '5%',
  },
  buttonText: {
    color: 'white',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16},
});

export default HomePassenger;
