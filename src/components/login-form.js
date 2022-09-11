import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Checkbox, Menu, Text, Appbar, Navbar, FAB, RadioButton } from 'react-native-paper';

const MyComponent = () => {
    const [checked, setChecked] = React.useState(false);

    return (
    <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
        setChecked(!checked);
        }}
    />
    );
};

export default () => {
    return(
        <View style={signUpStyle.container}>
            <TextInput
                mode="outlined"
                label="Correo electrónico"
                placeholder="Correo electrónico"
            />
            <TextInput
                mode="outlined"
                label="Contraseña"
                placeholder="Contraseña"
            />
            <Button style={signUpStyle.button} mode="contained" onPress={() => console.log('Pressed')}>
                Iniciar sesión
            </Button>
        </View>
    );
};

const signUpStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 15
    },
    button: {
        marginTop:5,
        padding:7
    },
});