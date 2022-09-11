import React, { useState } from "react";
import { View, StyleSheet,CheckBox, Text } from 'react-native';
import { TextInput, Button, Colors, Title } from 'react-native-paper';

const App = () => {
  const [isSelected, setSelection] = useState(false);

  return (
        <View style={loginStyle.container}>
            <Text style={loginStyle.title}>Login</Text>
            <TextInput style={loginStyle.input}
                mode="outlined"
                label="Correo electrónico"
                placeholder="Correo electrónico"
            />
            <TextInput 
                style={loginStyle.input}
                secureTextEntry={true}
                mode="outlined"
                label="Contraseña"
                placeholder="Contraseña"
            />
            <View style={loginStyle.checkboxContainer}>
                <CheckBox
                    color={Colors.blue800}
                    value={isSelected}
                    onValueChange={setSelection}
                    style={loginStyle.checkbox}
                />
                <Text style={loginStyle.label}>Recordarme</Text>
            </View>
            <Button style={loginStyle.button} color={Colors.blue800} mode="contained" onPress={() => console.log('Pressed')}>
                Iniciar sesión
            </Button>
        <View style={loginStyle.subcontainerRedes}>
            <Text style={loginStyle.label}>O iniciar sesión con</Text>
            <Button style={loginStyle.button} color={Colors.red800} mode="contained" onPress={() => console.log('Pressed')}>
                Google
            </Button>
            <Button style={loginStyle.button} color={Colors.green800} mode="contained" onPress={() => console.log('Pressed')}>
                WhatsApp
            </Button>
        </View>
    </View>
  );
};

const loginStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        margin: 30,
        padding: 100,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 50,
        fontStyle: 'bold',
        paddingLeft: 450,
        paddingBottom: 30,
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: "row",
        margin: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        fontSize: 'medium',
    },
    subcontainerRedes: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        marginTop: 15,
        padding: 5,
    },
});

export default App;