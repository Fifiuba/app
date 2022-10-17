import React, {useState} from 'react';
import HomeView from '../views/home-view';
import ProfileView from '../views/profile-view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserContext} from '../context/user-context';
import getProfile from '../services/get-profile';

const Stack = createNativeStackNavigator();
const DEFAULT_URL_USER_PICTURE = 'https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png';

export default function LoggedNav() {
  const [user, setUser] = useState('');

  React.useEffect(() => {
    const handleProfile = async () => {
      try {
        const userInfo = await getProfile();
        console.log('user_info:', userInfo);
        if (userInfo) {
          if (userInfo[0].picture === null) {
            userInfo[0].picture = DEFAULT_URL_USER_PICTURE;
          }
          setUser(userInfo[0]);
          console.log('user:', user);
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };
    handleProfile();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Stack.Navigator>
        <Stack.Screen
          options={{title: '', headerShown: false}}
          name="Home">
          {(navigation) =>
            <HomeView onNavigation={navigation}/>
          }
        </Stack.Screen>
        <Stack.Screen
          options={{title: ''}}
          name="MiPerfil">
          {(navigation) =>
            <ProfileView onNavigation={navigation}/>
          }
        </Stack.Screen>
      </Stack.Navigator>
    </UserContext.Provider>
  );
}
