import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeView from '../views/HomeView';
import ProfileView from '../views/ProfileView';
import getProfile from '../services/GetProfile';
import {UserContext} from '../context/UserContext';

const Stack = createNativeStackNavigator();
const DEFAULT_URL_USER_PICTURE = 'https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png';

export default function LoggedNav() {
  const [userInfo, setUserInfo] = useState('');
  const [userTypeInfo, setUserTypeInfo] = useState('');

  React.useEffect(() => {
    const handleProfile = async () => {
      try {
        const userInfo = await getProfile();
        if (userInfo) {
          if (userInfo[0].picture === null) {
            userInfo[0].picture = DEFAULT_URL_USER_PICTURE;
          }
          if (userInfo[0].age === null) {
            userInfo[0].age = '';
          }
          setUserInfo(userInfo[0]);
          setUserTypeInfo(userInfo[1]);
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };
    handleProfile();
    console.log('user info:', userInfo);
    console.log('user type info:', userTypeInfo);
  }, []);

  return (
    <UserContext.Provider value={{userInfo, userTypeInfo}}>
      <Stack.Navigator>
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
