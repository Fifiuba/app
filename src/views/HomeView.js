import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';

import PassengerJourney from '../components/PassengerJourney';
import MyProfileView from './MyProfileView';
import HomePassenger from '../components/HomePassenger';
import HomeDriver from '../components/HomeDriver';

/* eslint-disable max-len */
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import WalletView from './WalletView';

const Tab = createMaterialBottomTabNavigator();

export default function HomeView({navigation}) {
  const [isDriver, setIsDriver] = useState(false);

  React.useEffect(() => {
    const initialRoute = async () => {
      try {
        const userType = await AsyncStorage.getItem('user_type');
        if (userType == 'driver') {
          setIsDriver(true);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    initialRoute();
  }, []);

  return (
    <Tab.Navigator
      shifting={false}>
      {isDriver &&
        <Tab.Screen
          name="Chofer"
          component={HomeDriver}
          navigation={navigation}
          options={{
            tabBarLabel: 'Chofer',
            tabBarIcon: () => {
              return (
                <Ionicons
                  name="md-home"
                  size={20}
                  color={'white'}
                />
              );
            },
          }}
        />
      }
      {!isDriver &&
        <Tab.Screen
          name="Pasajero"
          component={HomePassenger}
          navigation={navigation}
          options={{
            tabBarLabel: 'Pasajero',
            tabBarIcon: () => {
              return (
                <Ionicons
                  name="md-home"
                  size={20}
                  color={'white'}
                />
              );
            },
          }}
        />
      }
      {!isDriver &&
        <Tab.Screen
          name="Viajes"
          component={PassengerJourney}
          navigation={navigation}
          options={{
            tabBarLabel: 'Viajes',
            tabBarIcon: () => {
              return (
                <Ionicons
                  name="car"
                  size={20}
                  color={'white'}
                />
              );
            },
          }}/>
      }
      <Tab.Screen
        name="Billetera"
        component={WalletView}
        options={{
          tabBarLabel: 'Billetera',
          tabBarIcon: () => {
            return (
              <Ionicons
                name="wallet"
                size={20}
                color={'white'}
              />
            );
          },
        }}/>
      <Tab.Screen
        name="Perfil"
        component={MyProfileView}
        navigation={navigation}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: () => {
            return (
              <Ionicons
                name="md-person-circle-outline"
                size={20}
                color={'white'}
              />
            );
          },
        }}/>
    </Tab.Navigator>
  );
}
