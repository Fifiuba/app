import React from 'react';
import {View, StyleSheet} from 'react-native';


import UserProfile from '../components/UserProfile';
import HomeDriver from '../components/HomeDriver';

export default function HomeDriverView({navigation}) {
  return (
    <View style={styles.container}>
      <UserProfile navigation={navigation}/>
      <HomeDriver navigation={navigation}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#f1faee'
  },

});


