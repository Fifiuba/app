import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Colors, TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../context/UserContext';
import {LoginContext} from '../context/LoginContext';

const MyProfile = ({navigation}) => {
  const [isDriver, setIsDriver] = useState(false);

  const user = useContext(UserContext);
  const userInfo = user.userInfo;
  const userTypeInfo = user.userTypeInfo;

  const onLogin = useContext(LoginContext);

  React.useEffect(() => {
    const setUserType = async () => {
      const userType = await AsyncStorage.getItem('user_type');
      if (userType == 'driver') {
        setIsDriver(true);
      }
    };
    setUserType();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar}
          source={{uri: userInfo.picture}}/>
        <View style={isDriver ? styles.body: styles.bodyReduced}>
          <Text style={styles.name}>{userInfo.name}</Text>
          <View style={styles.bodyContent}>
            <TextInput
              disabled={true}
              style={styles.info}
              label="Nombre"
              mode="outline"
              value={userInfo.name}
            />
            <TextInput
              disabled={true}
              style={styles.info}
              label="Correo electrónico"
              mode="outline"
              value={userInfo.email}
            />
            <TextInput
              disabled={true}
              style={styles.info}
              label="Teléfono"
              mode="outline"
              value={userInfo.phone_number}
            />
            <TextInput
              disabled={true}
              style={styles.info}
              label="Edad"
              mode="outline"
              value={userInfo.age}
            />
            { !isDriver &&
                <TextInput
                  disabled={true}
                  style={styles.info}
                  label="Dirección"
                  mode="outline"
                  value={userTypeInfo.default_address}
                />}
            { isDriver &&
                  <View style={styles.driverContainer}>
                    <TextInput
                      disabled={true}
                      style={styles.info}
                      label="Patente del vehículo"
                      mode="outline"
                      value={userTypeInfo.license_plate}
                    />
                    <TextInput
                      disabled={true}
                      style={styles.info}
                      label="Modelo del vehículo"
                      mode="outline"
                      value={userTypeInfo.car_model}
                    />
                  </View>}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.editButton}
            color={Colors.blue800}
            mode="contained"
            onPress={() => {
              console.log('navigate to editProfile');
              navigation.navigate('EditarPerfil');
            }}>
            <Text style={styles.editButtonText}>Editar</Text>
          </Button>
          <Button
            style={styles.signOutButton}
            color={Colors.blue800}
            mode="contained"
            onPress={() => {
              console.log('PressOn SignOut');
              onLogin(false);
            }}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 900,
  },
  header: {
    height: 100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 60,
  },
  bodyReduced: {
    marginTop: 65,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    marginTop: 65,
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    height: '10%',
    marginBottom: 20,
  },
  bodyContent: {
    height: '90%',
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    height: 55,
    width: '90%',
    margin: 10,
  },
  driverContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.grey300,
    margin: 10,
  },
  editButton: {
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.blue700,
    margin: 10,
  },
  editButtonText: {
    color: 'white',
  },
  buttonText: {
    color: '#696969',
  },
  editButtonText: {
    color: 'white',
  },
});
