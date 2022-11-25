import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const fondo = require('../../assets/icon-app.png');

export default function DriverProfileView({route, navigation}) {
  const user = route.params.user;
  const data = route.params.data;

  console.log(route.params);
  /* eslint-disable max-len */
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={fondo} />
        <Card.Content>
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

        </Card.Content>

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
