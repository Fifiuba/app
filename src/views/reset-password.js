import React from 'react';
import { useState } from 'react';
import {View, StyleSheet} from 'react-native'
import { Text,TextInput,Button } from 'react-native-paper';
import resetPassword from '../services/reset-password';


const ResetPasswordView = (navigation) => {
    const [email, setEmail] = useState('');
    return (
        <View style={style.container}>
            <View style={style.card}>
                <Text style={style.title}> Recuperar contraseña </Text>
                <TextInput
                    label="Email"
                    type='email'
                    mode= "outlined"
                    onChangeText={text => setEmail(text)}
                    style={style.emailField}
                />
                <Button
                    mode="outlined"
                    style={style.button}
                    onPress={() => resetPassword(email)} 
                >
                <Text style={{
                    color:'white'
                }}> enviar </Text>
                </Button>
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#16222e',
       
    },
    card: {
        height:200,
        width:350,
        padding: 32,
        backgroundColor: 'white',
        borderRadius:16,
    },
    emailField:{
        height:40,
        fontSize: 13,
    },
    title: {
        fontSize:20,
        marginBottom: 1,
        textAlign:'center',
    },
    button: {
        marginTop:20,
        width:'100%',
        alignSelf: 'center',
        backgroundColor:'#1f7a50'
    }
})

export default ResetPasswordView;
