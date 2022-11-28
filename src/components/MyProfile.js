import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Colors, TextInput, Button, Title, Caption} from 'react-native-paper';
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

  const logOut = async () => {
    try {
      await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
      onLogin(false);
    } catch (error) {
      alert('No se pudo cerrar sesión correctamente');
    }
  };

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
        { !isDriver &&
        <View style={styles.walletContainer}>
          <View style={styles.walletSubcontainer}>
            <View style={styles.walletInfo}>
              <Title>$100</Title>
              <Caption style={styles.caption}>Billetera</Caption>
            </View>
            <View style={styles.walletSubcontainer}>
              <Button
                style={styles.addMoneyButton}
                color={Colors.blue800}
                mode="contained"
                onPress={() => {
                  console.log('Addd money');
                }}>
                <Text style={styles.addMoneyButtonText}>Agregar</Text>
              </Button>
            </View>
          </View>
        </View>}
        <View style={isDriver ?
          styles.buttonContainerDriver: styles.buttonContainer}>
          <Button
            style={styles.button}
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
    </ScrollView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
  walletContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    flex: 1,
    height: 130,
    marginTop: 30,
    marginBottom: 10,
  },
  walletInfo: {
    alignItems: 'center',
    justifyContent: 'center',
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
  addMoneyButton: {
    height: 40,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.green700,
  },
  addMoneyButtonText: {
    color: 'white',
    fontSize: 14,
  },
});
