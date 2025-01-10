import React, { useState } from 'react';
import { View, Button, TouchableOpacity, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import fireBase from '../BaseDeDatos/fireBase.js';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../Constantes/AuthContext.js';


const SignUp = (props) => {
  const navigation = useNavigation()
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const registerUser = async () => {
    const { email, password, confirmPassword } = state;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Verificar que el correo no esté vacío
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingrese un correo y una contraseña');
      return;
    }

    try {
      // Crear el usuario en Firebase Authentication
      await register(email, password); 
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      console.log('Usuario creado:', user);
      navigation.navigate('Home');


      // Aquí puedes navegar a otra pantalla o realizar alguna acción adicional
    } catch (error) {
      // Manejo de errores (usuario ya registrado, problemas con la red, etc.)
      console.error('Error al registrar el usuario:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el usuario');
    }
  };

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.input}
        placeholder="Correo electrónico"
        value={state.email}
        onChangeText={(value) => handleChangeText('email', value)}
      />
      <TextInput
        style={estilos.input}
        placeholder="Contraseña"
        value={state.password}
        secureTextEntry={true}
        onChangeText={(value) => handleChangeText('password', value)}
      />
      <TextInput
        style={estilos.input}
        placeholder="Confirmar contraseña"
        value={state.confirmPassword}
        secureTextEntry={true}
        onChangeText={(value) => handleChangeText('confirmPassword', value)}
      />
      <Button title="Registrar" onPress={registerUser} />
      <TouchableOpacity style={estilos.switcherButton} onPress={() => navigation.navigate('Login')}>
  <Text style={estilos.switcherText}>¿Ya tienes cuenta? Inicia sesión</Text>
</TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
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

export default SignUp;
