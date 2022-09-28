import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import {useTheme, Colors, Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const {colors} = useTheme();
  const route = useRoute();

  const [state, setState] = useState({
    name: '',
    phone: '',
    email: '',
  })

  const handleChangeName = (value) => {
    route.params.user.name = value
  }

  const handleChangeEmail = (value) => {
    route.params.user.email = value
  }

  const handleChangePhone = (value) => {
    route.params.user.phone = value
  }

  const navigation = useNavigation();
  const goToProfileScreen = () => {
    var user = route.params.user
    console.log(user);
    navigation.navigate('Mi perfil', {
      user,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{route.params.user.name}</Text>
        <Image
          source={{uri: 'https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png'}}
          style={styles.image}
        />
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={25} />
          <TextInput
            placeholder={route.params.user.name}
            autoCorrect={false}
            onChangeText={(value) => handleChangeName(value)}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
        <Icon name="phone" size={30}/>
          <TextInput
            placeholder={route.params.user.phone}
            keyboardType="number-pad"
            autoCorrect={false}
            onChangeText={(value) => handleChangePhone(value)}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={25} />
          <TextInput
            placeholder={route.params.user.email}
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={(value) => handleChangeEmail(value)}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
      </View>
      <Button
        style={styles.buttonEdit}
        color={Colors.blue800}
        mode="contained"
        onPress={goToProfileScreen}>
        <Text style={{fontSize: 20}}>Guardar</Text>
      </Button>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginTop: 40,
  },
  subcontainer: {
    marginTop: 25,
  },
  title: {
    fontSize: 28,
  },
  textInput: {
    flex: 1,
    paddingLeft: 20,
    color: '#777777',
    fontSize: 20,
  },
  action: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 35,
  },
  buttonEdit: {
    marginTop: 45,
    padding: 5,
    width: 190,
    height: 50,
    marginLeft: 75,
    alignItems: 'center',
  },
  image: {
    marginTop: 35,
    width: 130,
    height: 130,
    marginLeft: 10,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
});
