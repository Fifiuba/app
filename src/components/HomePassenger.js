import React, {useState, useContext} from 'react';
/* eslint-disable max-len */
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Button, Text, ActivityIndicator, Card, Title, Colors,Snackbar} from 'react-native-paper';

import getAddressFromCoords from '../services/GetAddressFromCoords';
import {UserContext} from '../context/UserContext';
import getLastJourneysInfo from '../services/GetLastJourneysInfo';
import {error} from '../utils/HandleError';

const HomePassenger = () => {
  const [lastJourneys, setLastJourneys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');
  const user = useContext(UserContext);
  const userInfo = user.userInfo;

  const isNotInLatestJourneys = (journey) => {
    for (let idx = 0; idx < lastJourneys.length; idx++) {
      if (lastJourneys[idx].id == journey._id) {
        return false;
      }
    }
    return true;
  };

  const getLastJourneys = async () => {
    try {
      const journeys = await getLastJourneysInfo();
      setLoading(true);
      if (journeys.length == 0) setLoading(false);
      journeys.forEach(async (journey) => {
        try {
          const fromStreet = await getAddressFromCoords(journey.from[0], journey.from[1]);
          const toStreet = await getAddressFromCoords(journey.to[0], journey.to[1]);
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
          setMsg(error.GENERAL_ERROR);
          setVisible(true);
        }
      });
    } catch (e) {
      setLoading(false);
      setMsg(error.GENERAL_ERROR);
      setVisible(true);
    }
  };

  const ShowDataContainer = () => {
    if (loading) {
      return (
        <ActivityIndicator
          style={{justifyContent: 'center', alignSelf: 'center', padding: 5}}
          size={'small'}
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
        style={styles.flatList}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            Toca para ver tus ultimos viajes!
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
        color={Colors.blue700}
        mode="contained"
        onPress={getLastJourneys}
      >
        <Text style={styles.buttonText}> Buscar últimos viajes </Text>
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
          },
        }}>
        {msg}
      </Snackbar>
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
    marginTop: 100,
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
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    margin: 40,
  },
});

export default HomePassenger;