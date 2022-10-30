import React, {useState} from 'react';
/* eslint-disable max-len */
import {View,StyleSheet, SafeAreaView, FlatList, Image} from 'react-native';
import {Button,Text, Colors, ActivityIndicator, Card, Title, Paragraph} from 'react-native-paper';
import getAddrsFromCoords from '../services/GetAddressFromCoords';

const HomeDriver = ({navigation}) => {
  const [avaliableJourneys, setAvaliableJourneys] = useState([]);
  const [loading, setLoading] = useState(false);


  const DATA = [
    {
      _id: '635dab0a3b01330d59fbc742',
      status: 'requested',
      idPassenger: 10,
      driver: {
        idDriver: 1,
        vip: false,
      },
      price: 20,
      from: [-34.5860531, -58.399662],
      to: [-34.578827, -58.5005147],
    },
    {
      _id: '0d59fbc742',
      status: 'requested',
      idPassenger: 10,
      driver: {
        idDriver: 1,
        vip: true,
      },
      price: 20,
      from: [-34.5860531, -58.399662],
      to: [-34.56769920645015, -58.45129259340773],
    },
    {
      _id: 'aadadaddabaq3',
      status: 'requested',
      idPassenger: 10,
      driver: {
        idDriver: 1,
        vip: false,
      },
      price: 20,
      from: [-34.567699206, -58.45129259],
      to: [-34.578827, -58.5005147],
    },
  ];

  function getAddres(items) {
    try {
      const addresses= [];
      setLoading(true);
      
      DATA.forEach(async (journey) => {
        console.log('entra');
        const fromStreet = await getAddrsFromCoords(journey.from[0], journey.from[1]);
        const toStreet = await getAddrsFromCoords(journey.to[0], journey.to[1]);
        addresses.push({
          _id: journey._id,
          from: fromStreet,
          to: toStreet,
          price: journey.price,
          vip: journey.driver.vip,
          fromCoords: journey.from,
          toCoords: journey.to,
        });
        console.log('andó');
        setLoading(false);
        setAvaliableJourneys(addresses);
      });
    } catch (err) {
      setLoading(true);
      alert(err);
    }
  }

  const ShowDataContainer = () => {
    if (loading) {
      return (
        <ActivityIndicator
          style={{justifyContent: 'center', alignSelf: 'center',padding:5}}
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
      />);
  };


  const renderItem = ({item}) => (

    <Card style={item.vip ? styles.vip : styles.item} key={item.key}>
      <Card.Title title={item.vip ? 'VIP': 'Standar'} />
      <Card.Content>
        <Text variant="headlineMedium"> Desde: {item.from}</Text>
        <Text variant="headlineMedium"> Hasta: {item.to}</Text>
        <Text variant="headlineMedium"> Ganancia: $ {item.price}</Text>
      </Card.Content>
      <Card.Actions style={{alignSelf: 'center'}}>
        <Button color={Colors.blue800}
          onPress={() => navigation.navigate('ViajeChofer',{'from': item.fromCoords, 'to': item.toCoords, 'carType': item.vip})}
        >Aceptar</Button>
      </Card.Actions>
    </Card>
  );


  return (
    <View style={styles.container}>

      <Title style={{textAlign: 'center', paddingBottom:5, fontSize:22}}>
                  Viajes Disponibles
      </Title>
      <SafeAreaView style={styles.dataContainer}>
        <ShowDataContainer/>
      </SafeAreaView>
      <Button
        style={styles.button}
        color={Colors.blue800}
        mode="contained"
        onPress={getAddres}
      >
        <Text> Buscar Viajes </Text>
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3.5,
    flexDirection:'column',
    alignItems: 'center',
    width: '100%',
  },
  dataContainer: {
    height: '70%',
    width: '90%',
    borderColor:'black',
    borderRadius: '5%',
  },
  item: {
    marginVertical:5
  },
  vip: {
    backgroundColor:'#FFF9B0',
    marginVertical:5
  },
  button: {
    marginTop:'5%',
    width: '50%',
  },
});


export default HomeDriver;
