import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const fondo = require('../../assets/icon-app.png');

export default function UserProfileView({route, navigation}) {
  const user = route.params.data;
  console.log(route.params);

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
