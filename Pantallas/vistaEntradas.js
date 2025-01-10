import AsyncStorage from '@react-native-async-storage/async-storage'; 
import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ComponenteArray from '../Componentes/array';
import {obtenerEntradas} from '../BaseDeDatos/fireBaseCRUD'
import { useNavigation } from '@react-navigation/native';



const items = ["Bola", "Dandadan", "Hang", "phosphoru"];

  
        
  const vistaEntradas = () => {
    const navigation = useNavigation();
    const [entradas, setEntradas] = useState([]); 

  useEffect(() => {
    const cargarEntradas = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (!storedUser) {
          console.error("No se encontró un usuario autenticado.");
          return;
        }
        const usuario = JSON.parse(storedUser);
        const usuarioId = usuario.uid;

        const datos = await obtenerEntradas(usuarioId); // Llamar tu función programada
        const entradasMapeadas = datos.map((entrada) => ({
          id: entrada.id,
          titulo: entrada.titulo,
          contenido: entrada.contenido, // Otras propiedades que quieras mostrar
        }));

        setEntradas(entradasMapeadas)
      } catch (error) {
        console.error("Error al cargar entradas:", error);
      }
    };
    cargarEntradas();
  }, []);

  const handlePress = (id) => {
    navigation.navigate('DetalleEntrada', { id }); // Pasar el id directamente
  };

  const irCrearEntrada = () => {
    console.log("Botón flotante presionado");
    navigation.navigate('Escritura');
  };

    return(
    <View style = {{flex:1}}>
        <ComponenteArray
        data={entradas}
        onPress={handlePress}
        />
        <TouchableOpacity style={estilos.botonFlotante} onPress={irCrearEntrada}>
        <Text style={estilos.textoBoton}>+</Text>
      </TouchableOpacity>
    </View>);
  };

  const estilos = StyleSheet.create({
    container: {
      flex: 1,
    },
    botonFlotante: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#6200EE',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // Sombra en Android
      shadowColor: '#000', // Sombra en iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    textoBoton: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

  export default vistaEntradas;
  