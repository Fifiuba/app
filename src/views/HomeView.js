import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PassengerJourney from '../components/PassengerJourney';
import MyProfileView from './MyProfileView';
import HomePassenger from '../components/HomePassenger';
import HomeDriver from '../components/HomeDriver';

/* eslint-disable max-len */
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

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
    <Tab.Navigator>
      {isDriver &&
        <Tab.Screen name="Chofer" component={HomeDriver} navigation={navigation}/>
      }
      {!isDriver &&
        <Tab.Screen name="Chofer" component={HomePassenger} navigation={navigation}/>
      }
      {!isDriver &&
        <Tab.Screen name="Viajes" component={PassengerJourney} navigation={navigation}/>
      }
      <Tab.Screen name="Perfil" component={MyProfileView} navigation={navigation}/>
    </Tab.Navigator>
  );
}
