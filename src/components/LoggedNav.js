import React, {useState, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeView from '../views/HomeView';
import ProfileView from '../views/ProfileView';
import getProfile from '../services/GetProfile';
import JourneyView from '../views/JourneyView';
import RoadTripView from '../views/RoadTripView';
import DriverJourneyView from '../views/DriverJourneyView';
import HomeDriverView from '../views/HomeDriverView';
import HomePassengerView from '../views/HomePassengerView';
import MyProfileView from '../views/MyProfileView';
import ScoreView from '../views/ScoreView';

import {UserContext} from '../context/UserContext';
import {TokenContext} from '../context/TokenContext';
import {LoginContext} from '../context/LoginContext';
import sentTokenInfo from '../services/SendTokenInfo';
import {constants} from '../utils/Constants';
import UserProfileView from '../views/UserProfileView';

const Stack = createNativeStackNavigator();

export default function LoggedNav({onLogin}) {
  const [userInfo, setUserInfo] = useState('');
  const [userTypeInfo, setUserTypeInfo] = useState('');

  const token = useContext(TokenContext);

  const setEmpty = (data) => {
    const keys = Object.getOwnPropertyNames(data);
    for (let idx = 0; idx < keys.length; idx++) {
      const key = keys[idx];
      const value = data[key];
      if (value === null) {
        if (key == 'picture') {
          data[key] = constants.DEFAULT_URL_USER_PICTURE;
        } else {
          data[key] = '';
        }
      }
    };
    return data;
  };

  React.useEffect(() => {
    const handleProfile = async () => {
      try {
        const userInfo = await getProfile();
        if (userInfo) {
          setUserInfo(setEmpty(userInfo[0]));
          setUserTypeInfo(setEmpty(userInfo[1]));
          await sentTokenInfo(userInfo[0].id, token);
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };
    handleProfile();
  }, []);

  return (
    <LoginContext.Provider value={onLogin}>
      <UserContext.Provider value={{userInfo, userTypeInfo}}>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen
            options={{title: '', headerShown: false}}
            name="Home"
            component={HomeView}
          />
          <Stack.Screen
            options={{title: '', headerShown: false}}
            name="HomeDriver"
            component={HomeDriverView}
          />
          <Stack.Screen
            options={{title: '', headerShown: false}}
            name="HomePassenger"
            component={HomePassengerView}
          />
          <Stack.Screen
            options={{title: ''}}
            name="EditarPerfil"
            component={ProfileView}
          />
          <Stack.Screen
            options={{title: ''}}
            name="MiPerfil"
            component={MyProfileView}
          />
          <Stack.Screen
            options={{title: ''}}
            name="Viajes"
            component={JourneyView}
          />
          <Stack.Screen
            options={{title: '', headerShown: false}}
            name="EnViaje"
            component={RoadTripView}
          />
          <Stack.Screen
            options={{title: '', headerShown: false}}
            name="ViajeChofer"
            component={DriverJourneyView}
          />
          <Stack.Screen
            options={{title: '', headerShown: false}}
            name="Calificacion"
            component={ScoreView}
          />
          <Stack.Screen
            options={{title: ''}}
            name="PerfilUsuario"
            component={UserProfileView}
          />
        </Stack.Navigator>
      </UserContext.Provider>
    </LoginContext.Provider>
  );
}
