import AsyncStorage from '@react-native-async-storage/async-storage'; 
import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ComponenteArray, { ArrayEm }  from '../Componentes/array';
import {obtenerEmociones} from '../BaseDeDatos/fireBaseCRUD'
import { useNavigation } from '@react-navigation/native';



  
        
  const vistaEmociones = () => {
    const navigation = useNavigation();
    const [emociones, setEmociones] = useState([]); 

  useEffect(() => {
    const cargarEmociones = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (!storedUser) {
          console.error("No se encontró un usuario autenticado.");
          return;
        }
        const usuario = JSON.parse(storedUser);
        const usuarioId = usuario.uid;

        const datos = await obtenerEmociones(usuarioId); // Llamar tu función programada
        const emocionesMapeadas = datos.map((emocion) => ({
          id: emocion.id,
          nombre: emocion.nombre,
          descripcion: emocion.descripcion, // Otras propiedades que quieras mostrar
        }));

        setEmociones(emocionesMapeadas)
      } catch (error) {
        console.error("Error al cargar emociones:", error);
      }
    };
    cargarEmociones();
  }, []);

  const handlePress = (id) => {
    navigation.navigate('DetalleEmocion', { id }); // Pasar el id directamente
  };

  const irCrearEmocion = () => {
    console.log("Botón flotante presionado");
    navigation.navigate('NuevaEmocion');
  };

    return(
    <View style = {{flex:1}}>
        <ArrayEm
        data={emociones}
        onPress={handlePress}
        />
        <TouchableOpacity style={estilos.botonFlotante} onPress={irCrearEmocion}>
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

  export default vistaEmociones;
  