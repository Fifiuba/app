import React from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {Icon} from 'react-native-elements';

const Profile = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <Title style={styles.title}>{props.name}</Title>
        <Image
          source={{uri: 'https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png'}}
          style={styles.image}
        />
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="phone" size={30}/>
          <Text style={styles.text}>{props.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" size={30}/>
          <Text style={styles.text}>{props.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
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
        <TouchableRipple
          onPress={() =>
            props.onNavigation.navigate('Editar perfil')
          }>
          <View style={styles.menuItem}>
            <Icon name="edit" size={25}/>
            <Text style={styles.menuItemText}>Editar perfil</Text>
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
            <Icon name="help" color="black" size={25}/>
            <Text style={styles.menuItemText}>Ayuda</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
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
    fontSize: 18,
  },
  menuItemText: {
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 30,
  },
  text: {
    color: '#777777',
    marginLeft: 20,
    fontSize: 20,
    lineHeight: 30,
  },
  button: {
    marginTop: 15,
    padding: 5,
    width: 220,
    height: 50,
    marginLeft: 40,
  },
  image: {
    marginTop: 35,
    width: 130,
    height: 130,
    marginLeft: 100,
    marginBottom: 10,
  },
});
