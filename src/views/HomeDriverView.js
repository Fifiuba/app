import React from 'react';
import {View, StyleSheet} from 'react-native';


import Home from '../components/HomePassenger';
import HomeDriver from '../components/HomeDriver';

export default function HomeDriverView({navigation}) {
  return (
    <View style={styles.container}>
      <Home style={styles.home} navigation={navigation}/>
      <HomeDriver style={styles.driver} navigation={navigation}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

});


