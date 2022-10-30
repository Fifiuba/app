import React from 'react';
import {View, StyleSheet} from 'react-native';


import HomePassenger from '../components/HomePassenger';
import HomeDriver from '../components/HomeDriver';

export default function HomeDriverView({navigation}) {
  console.log('navigation: '+navigation)
  return (
    <View style={styles.container}>
      <HomePassenger navigation={navigation}/>
      <HomeDriver navigation={navigation}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

});


