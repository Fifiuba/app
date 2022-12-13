import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Colors, TextInput, Button, Snackbar} from 'react-native-paper';
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

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');

  const logOut = async () => {
    try {
      await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
      onLogin(false);
    } catch (error) {
      setVisible(true);
      setMsg('No se pudo cerrar sesión correctamente');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.avatar}
          source={{uri: userInfo.picture}}/>
        <Text style={styles.name}>{userInfo.name}</Text>
        <View style={isDriver ? styles.body: styles.bodyReduced}>
          <View style={styles.bodyContent}>
            <TextInput
              disabled={true}
              style={styles.info}
              label="Nombre"
              mode="outline"
              defaultValue={userInfo.name}
            />
            <TextInput
              disabled={true}
              style={styles.info}
              label="Correo electrónico"
              mode="outline"
              defaultValue={userInfo.email}
            />
            <TextInput
              disabled={true}
              style={styles.info}
              label="Teléfono"
              mode="outline"
              defaultValue={userInfo.phone_number}
            />
            <TextInput
              disabled={true}
              style={styles.info}
              label="Edad"
              mode="outline"
              defaultValue={userInfo.age.toString()}
            />
            { !isDriver &&
                <TextInput
                  disabled={true}
                  style={styles.info}
                  label="Dirección"
                  mode="outline"
                  defaultValue={userTypeInfo.default_address}
                />}
            { isDriver &&
                  <View style={styles.driverContainer}>
                    <TextInput
                      disabled={true}
                      style={styles.info}
                      label="Modelo del vehículo"
                      mode="outline"
                      defaultValue={userTypeInfo.car_model}
                    />
                    <TextInput
                      disabled={true}
                      style={styles.info}
                      label="Patente del vehículo"
                      mode="outline"
                      defaultValue={userTypeInfo.license_plate}
                    />
                  </View>}
          </View>
        </View>
        <View style={isDriver ?
          styles.buttonContainerDriver: styles.buttonContainer}>
          <Button
            style={[styles.button, styles.editButton]}
            color={Colors.blue700}
            mode="contained"
            onPress={() => {
              console.log('navigate to editProfile');
              navigation.navigate('EditarPerfil');
            }}>
            <Text style={styles.editButtonText}>Editar</Text>
          </Button>
          <Button
            style={styles.button}
            color={Colors.grey300}
            mode="contained"
            onPress={logOut}>
            <Text style={styles.signOutButtonText}>Cerrar sesión</Text>
          </Button>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
          },
        }}>
        {msg}
      </Snackbar>
    </ScrollView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 60,
  },
  bodyReduced: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    height: '10%',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerDriver: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 10,
  },
  signOutButtonText: {
    color: '#696969',
  },
  editButtonText: {
    color: 'white',
  },
  caption: {
    fontSize: 18,
    fontWeight: '500',
  },
  walletSubcontainer: {
    width: '60%',
    height: '60%',
    margin: 10,
  },
  editButton: {
    marginTop: 30,
  }});
