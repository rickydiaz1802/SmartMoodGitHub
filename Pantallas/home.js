import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../Constantes/AuthContext';
import { useFocusEffect } from '@react-navigation/native';





const Home = () => {
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState('');
    const { logout } = useAuth();

    useFocusEffect(() => {
        const loadUserFromAsyncStorage = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    if (user.isAnonymous) {
                        navigation.navigate('Login'); // Redirige si es anónimo
                    } else {
                        setUserEmail(user.email || ''); // Establecer el correo si existe
                    }
                } else {
                    navigation.navigate('Login'); // Redirige si no hay usuario registrado
                }
            } catch (error) {
                console.error('Error cargando usuario desde AsyncStorage:', error.message);
                navigation.navigate('Login'); // Redirige en caso de error
            }
        };
        loadUserFromAsyncStorage();
    }, [navigation]);

    const handleLogout = async () => {
        await logout();  
        setUserEmail('');  
    };

    return (
        <View style={estilos.container}> 
         {/* <View style={estilos.header}> 
            <Button title="Izquierda" onPress={() => alert('Botón Izquierda')} />
            <Button title="Derecha" onPress={() => alert('Botón Derecha')} />
          </View>*/}
    
         
          <View style={estilos.middle}>
          <Text>¿Qué quieres contarme hoy?</Text>
          <TouchableOpacity style={estilos.switcherButton} onPress={() => navigation.navigate('Escritura')}>
                <Text style={estilos.switcherText}>Nueva entrada</Text>
            </TouchableOpacity>
          </View>
    
          {/* Tercer View: Botón debajo del centro */}
          <View style={estilos.footer}>
          <TouchableOpacity style={estilos.switcherButton} onPress={() => navigation.navigate('Login')}>
                <Text style={estilos.switcherText}>Cambiar usuario</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.switcherButton} onPress={handleLogout}>
                <Text style={estilos.switcherText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
};

const estilos = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: '#f0f0f0', 
    padding: 10,
    },
    email: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    switcherButton: {
        marginTop: 10, // Separa un poco el botón
        alignItems: 'center',
    },
    switcherText: {
        color: '#007BFF',
        fontSize: 14,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20, // Separación del siguiente view
      },
      middle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      footer: {
        alignItems: 'center',
        marginTop: 20, // Espaciado respecto al botón del centro
      }
});

export default Home;


export const navigateToLogin = () => {
    const navigation = useNavigation();
    navigation.navigate('Login');
  };