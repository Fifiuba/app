import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const fondo = require('../../assets/icon-app.png');

export default function DriverProfileView({route, navigation}) {
  const user = route.params.user;
  const data = route.params.data;
  const opinions = route.params.opinions;

  const item = ({item, key}) => (
    <View style={{margin: 2}} >
      <Paragraph>Puntaje: {item.rating}</Paragraph>
      <Paragraph>Comentarios: {item.opinion}</Paragraph>
    </View>
  );

  /* eslint-disable max-len */
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={fondo} />

        <Title>{user.name}</Title>
        <Paragraph>Email: { user.email}</Paragraph>
        <Paragraph>
          Edad: { user.age != null ? user.age : 'No especificado!'}
        </Paragraph>
        <Paragraph>Modelo de auto:
          { data.car_model != null ? data.car_model : 'No especificado!'}
        </Paragraph>
        <Paragraph>
          Matricula: { data.license_plate != null ? data.license_plate : 'No especificado!' }
        </Paragraph>
        <Paragraph>Calificacion: { data.score}</Paragraph>

        <Title>Comentarios</Title>
        <FlatList
          data={opinions}
          renderItem={item}
          ListEmptyComponent={<Text style={{textAlign: 'center', fontSize: 16}}>
          No hay opiniones de esta persona
          </Text>}/>
      </Card>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    padding: 15,
    height: '50%',
    width: '90%',
  },
});
