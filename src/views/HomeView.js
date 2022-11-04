import React, {useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeDriverView from './HomeDriverView';
import HomePassengerView from './HomePassengerView';

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
    <View style={{flex: 1}}>
      {isDriver ? <HomeDriverView navigation={navigation}/> :
        <HomePassengerView navigation={navigation}/>}
    </View>
  );
}

