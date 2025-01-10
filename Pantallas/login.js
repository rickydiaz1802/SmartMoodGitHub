import React, { useState } from 'react';
import { View, TouchableOpacity, Button, TextInput, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import fireBase from '../BaseDeDatos/fireBase';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../Constantes/AuthContext';



const Login = () => {
    const navigation = useNavigation(); // Para navegar a la pantalla Home
    const {login} = useAuth();
    const [state, setState] = useState({
        usuario: '',
        contrasena: ''
    });

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const loginRequest = async () => {
        const { usuario, contrasena } = state;

        // Verificar que los campos no estén vacíos
        if (!usuario || !contrasena) {
            Alert.alert('Error', 'Por favor ingrese un correo y una contraseña');
            return;
        }

        try {
            await login(usuario, contrasena)
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
    };

    return (
        <ScrollView style={estilos.contenedor}>
            <View style={estilos.input}>
                <TextInput 
                    placeholder="Correo" 
                    onChangeText={(value) => handleChangeText('usuario', value)} 
                    value={state.usuario} 
                />
            </View>
            <View style={estilos.input}>
                <TextInput 
                    placeholder="Contraseña" 
                    secureTextEntry={true}
                    onChangeText={(value) => handleChangeText('contrasena', value)} 
                    value={state.contrasena} 
                />
            </View>
            <View>
                <Button title="Iniciar sesión" onPress={loginRequest} />
                <TouchableOpacity style={estilos.switcherButton} onPress={() => navigation.navigate('SingUp')}>
                    <Text style={estilos.switcherText}>¿Aún no tienes cuenta? Registrate aquí</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const estilos = StyleSheet.create({
    input: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    contenedor: {
        flex: 1,
        padding: 35
    },
    switcherButton: {
        marginTop: 10, // Separa un poco el botón
        alignItems: 'center',
    },
    switcherText: {
        color: '#007BFF', // Azul clásico para enlaces
        fontSize: 14, // Texto un poco más pequeño que el del botón principal
    }
});

export default Login;

