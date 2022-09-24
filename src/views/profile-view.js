import React from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { Icon } from 'react-native-elements';

const MyProfileView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 15}}>
            <Title style={styles.title}>Nombre Apellido</Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={30}/>
          <Text style={styles.text}>Número de teléfono</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={30}/>
          <Text style={styles.text}>Correo electrónico</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>$</Title>
            <Caption style={styles.caption}>Billetera</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>N</Title>
            <Caption style={styles.caption}>Viajes</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="help" color="black" size={25}/>
            <Text style={styles.menuItemText}>Ayuda</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings" size={25}/>
            <Text style={styles.menuItemText}>Configuración</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="edit" size={25}/>
            <Text style={styles.menuItemText}>Editar perfil</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    marginTop: 70,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 25,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 30,
  },
  text: {
    color:"#777777", 
    marginLeft: 20, 
    fontSize: 20,
    lineHeight: 30,
  },
});