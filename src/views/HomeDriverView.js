import React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';

import MyProfile from '../components/MyProfile';
import HomeDriver from '../components/HomeDriver';

export default function HomeDriverView({navigation}) {
  const journeyView = () => <HomeDriver navigation={navigation}/>;
  const homeView = () => <Text>Home!!</Text>;
  const profileView = () => <MyProfile navigation={navigation}/>;
  const walletView = () => <Text>Billetera</Text>;


  /* eslint-disable max-len */
  /* eslint-disable new-cap */

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'home', title: 'Home', focusedIcon: 'home'},
    {key: 'journeys', title: 'Viaje', focusedIcon: 'drive_eta'},
    {key: 'profile', title: 'Perfil', focusedIcon: 'person'},
    {key: 'wallet', title: 'Billetera', focusedIcon: 'wallet', unfocusedIcon: 'wallet-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: homeView,
    journeys: journeyView,
    profile: profileView,
    wallet: walletView,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      labeled={false}
    />
  );
}
