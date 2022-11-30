import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <Tab.Screen name="Chofer" component={HomeDriver} navigation={navigation}/>
      }
      {!isDriver &&
        <Tab.Screen name="Pasajero" component={HomePassenger} navigation={navigation}/>
      }
      {!isDriver &&
        <Tab.Screen name="Viajes" component={PassengerJourney} navigation={navigation}/>
      }
      <Tab.Screen
        name="Billetera"
        component={WalletView}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Perfil" component={MyProfileView} navigation={navigation}/>
    </Tab.Navigator>
  );
}
