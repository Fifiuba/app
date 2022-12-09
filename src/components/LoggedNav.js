import React, {useState, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeView from '../views/HomeView';
import ProfileView from '../views/ProfileView';
import getProfile from '../services/GetProfile';
import JourneyView from '../views/JourneyView';
import RoadTripView from '../views/RoadTripView';
import DriverJourneyView from '../views/DriverJourneyView';
import MyProfileView from '../views/MyProfileView';
import ScoreView from '../views/ScoreView';

import {UserContext} from '../context/UserContext';
import {TokenContext} from '../context/TokenContext';
import {LoginContext} from '../context/LoginContext';
import sentTokenInfo from '../services/SendTokenInfo';
import {constants} from '../utils/Constants';
import UserProfileView from '../views/UserProfileView';
import DriverProfileView from '../views/DriverProfileView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletView from '../views/WalletView';
import DepositView from '../views/DepositView';
import PaymentView from '../views/PaymentView';

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
        alert('Se ha producido un error al buscar el usuario');
        await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
        onLogin(false);
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
            name="ViajePasajero"
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
          <Stack.Screen
            options={{title: ''}}
            name="PerfilChofer"
            component={DriverProfileView}
          />
          <Stack.Screen
            options={{title: ''}}
            name="Billetera"
            component={WalletView}
          />
          <Stack.Screen
          options={{title: '', headerShown: false}}
          name="Deposito"
          component={DepositView}
          />
          <Stack.Screen
          options={{title: '', headerShown: false}}
          name="Pago"
          component={PaymentView}
          />
        </Stack.Navigator>
      </UserContext.Provider>
    </LoginContext.Provider>
  );
}
