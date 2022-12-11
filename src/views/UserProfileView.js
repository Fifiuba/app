import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const fondo = require('../../assets/icon-app.png');

export default function UserProfileView({route}) {
  const user = route.params.data;
  const opinions = route.params.opinions;

  const item = ({item}) => (
    <View style={{margin: 2}} >
      <Paragraph>Puntaje: {item.rating}</Paragraph>
      <Paragraph>Comentarios: {item.opinion}</Paragraph>
    </View>
  );


  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={fondo} />

        <Title>{user.name}</Title>
        <Paragraph>Email: { user.email}</Paragraph>
        <Paragraph>
          Edad: { user.age != null ? user.age : 'No especificado!'}
        </Paragraph>

        <Title>Comentarios</Title>
        <FlatList
          data={opinions}
          renderItem={item}
          ListEmptyComponent={<Text style={{textAlign: 'center', fontSize: 16}}>
          No hay opiniones de esta persona
          </Text>}
        />
      </Card>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    padding: 15,
    height: '80%',
    width: '90%',
  },
});
