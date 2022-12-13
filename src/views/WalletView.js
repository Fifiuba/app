import React, {useContext, useState, useEffect} from 'react';

import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import {TextInput, Snackbar,Button,Colors} from 'react-native-paper';
import {UserContext} from '../context/UserContext';
import getWalletAmount from '../services/GetWalletAmount';
import getWalletBalance from '../services/GetWalletBalance';

export default function WalletView() {
  const user = useContext(UserContext);
  const userInfo = user.userInfo;
  const [amount, setAmount] = useState('0 ETH');
  const [address, setAddress] = useState('No encontrado');
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');

  const getWallet = async () => {
    try {
      const wallet = await getWalletAmount(userInfo.id);
      setAddress(wallet.address);
    } catch (error) {
      setVisible(true);
      setText('No se ha podido obtener informacion sobre la billetera');
      setAddress('');
    }
  };

  const getBalance = async () =>{
    try {
      const balance = await getWalletBalance(userInfo.id)
      setAmount(` ${balance.balance} ETH`);
    } catch (error) {
      setVisible(true);
      setText('No se ha podido obtener informacion sobre el balance');
      setAmount('No encontrado');
    }

  }

  useEffect(() =>{
    getWallet();
  }, [address]);

  useEffect(() =>{
    getBalance();
  }, [amount]);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar}
          source={{uri: userInfo.picture}}/>
        <View style={ styles.bodyReduced}>
          <Text style={styles.name}>{userInfo.name}</Text>
          <View style={styles.bodyContent}>
            <TextInput
              disabled={true}
              style={styles.info}
              label="Nombre"
              mode="outline"
              defaultValue={userInfo.name}
            />

            <Text style={{fontSize: 22}}>
                    Saldo disponible
            </Text>
            <Text>
              {`${address.substring(0, 6)}...${address.substring(address.length -6, address.length -1)}`}
            </Text>
            <TextInput
              disabled={true}
              style={styles.info}
              mode="outline"
              value={amount}
            />
            <Button
              color={Colors.green800}
              mode="contained"
              style={{marginVertical: 10,borderRadius: 30}}
              onPress={getBalance}
              >Actualizar balance</Button>
            
          </View>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
          setAmount('0 ETH');
        }}
        action={{
          label: 'Ok',
          onPress: () => {
            setAmount('0 ETH');
          },
        }}>
        {text}
      </Snackbar>
    </ScrollView>
  );
}

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
});
