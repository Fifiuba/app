import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import getProfile from '../services/get-profile';

//import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState('');

  const setUserInfo = (userInfo) => {
    const keys = Object.getOwnPropertyNames(userInfo);
    for (let idx = 0; idx < keys.length; idx++) {
        let key = keys[idx];
        let value = userInfo[key];
        console.log('value:', value)
        if (value) {
          if (key == 'name') {
            setName(value);
          } 
          if (key == 'email') {
            setEmail(value);
          } 
          if (key == 'age') {
            setAge(value);
          } 
          if (key == 'phone_number' || key == 'phone') {
            setPhone(value);
          }
        } else {
          if (key == 'age') {
            setAge('Edad Desconocida');
          } 
          if (key == 'phone_number') {
            setPhone('Teléfono Indefinido');
          }
        }
    }
  }

  React.useEffect(() => {
    const handleProfile = async () => {
      try {
        const userInfo = await getProfile();
        console.log('user_info:', userInfo);
        if (userInfo) {
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };
    handleProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <Title style={styles.title}>{name}</Title>
        <Image
          source={{uri: 'https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png'}}
          style={styles.image}
        />
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.action}>
          <Text style={styles.textInput}>Nombre: {name}</Text>
        </View>
        <View style={styles.action}>
          <Text style={styles.textInput}>Edad: {age}</Text>
        </View>
        <View style={styles.action}>
          <Text style={styles.textInput}>Email: {email}</Text>
        </View>
        <View style={styles.action}>
          <Text style={styles.textInput}>Teléfono: {phone}</Text>
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
          onPress={() => props.onNavigation.navigate('Editar perfil')}>
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
    marginLeft: 88,
  },
  caption: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '500',
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
  textInput: {
    flex: 1,
    paddingLeft: 20,
    color: 'black',
    fontSize: 20,
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
    marginLeft: 115,
  },
  action: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 7,
  },
});
