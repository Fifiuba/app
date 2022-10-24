import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeView from '../views/HomeView';
import ProfileView from '../views/ProfileView';
import getProfile from '../services/GetProfile';
import {UserContext} from '../context/UserContext';
import {constants} from '../utils/Constants';

const Stack = createNativeStackNavigator();

export default function LoggedNav() {
  const [userInfo, setUserInfo] = useState('');
  const [userTypeInfo, setUserTypeInfo] = useState('');

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
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };
    handleProfile();
  }, []);

  return (
    <UserContext.Provider value={{userInfo, userTypeInfo}}>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          options={{title: '', headerShown: false}}
          name="Home"
          component={HomeView}
        />
        <Stack.Screen
          options={{title: ''}}
          name="MiPerfil"
          component={ProfileView}
        />
      </Stack.Navigator>
    </UserContext.Provider>
  );
}
