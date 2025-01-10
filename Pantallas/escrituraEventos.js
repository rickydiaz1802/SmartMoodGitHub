import React, {useState} from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet, Text} from 'react-native'
import { agregarEvento } from '../BaseDeDatos/fireBaseCRUD';
import AsyncStorage from '@react-native-async-storage/async-storage'; 



const EscrituraEv = (props) => {

    const [state, setState] = useState({
       descripcion:'',
       nombre:''
    });

    const handleChangeText = (name,value) =>{
        setState({...state,[name]:value})
    }

    const guardarEvento = async() => {
        
        const storedUser = await AsyncStorage.getItem('user');
        if(storedUser){
            const usuario = JSON.parse(storedUser);
            const usuarioId = usuario.uid;

        if(state.nombre === '')
        {
            alert('Nombre su evento recurrente por favor')
            return;
        }
        else{
            agregarEvento(state.nombre, state.descripcion,usuarioId)
         .then(id => {
        console.log("Evento agregado con ID:", id);
  })
  .catch(error => {
    console.error("Error al agregar entrada:", error);
  });
        }}
        else{
            alert('No se encontró usuario registrado')
        }
    }

    return (
        <View style={estilos.container}> 
          {/* Primer View: Botones arriba */}
          <View style={estilos.header}> 
            <Button title="Derecha" onPress={() => alert('Botón Derecha')} />
          </View>
    
          {/* Segundo View: Botón en el centro */}
          <View style={estilos.middle}>
          <View style = {estilos.inputGroup}>
          <TextInput placeholder="Nombre de evento"
                style={estilos.inputText}
                onChangeText={(value) => handleChangeText('nombre', value)}/>

                <TextInput placeholder="Descripción"
                style={estilos.inputText}
                onChangeText={(value) => handleChangeText('descripcion', value)}/>
            </View>
            <View>
                <Button title="Guardar Evento" onPress={guardarEvento}/>
            </View>
          </View>
    
          {/* Tercer View: Botón debajo del centro */}
          <View style={estilos.footer}>
          </View>
        </View>
      );
}


const estilos = StyleSheet.create({
    inputGroup: {
        padding: 10,
        marginBottom: 15,
        borderWidth: 1, // Cambiar a un borde completo
        borderColor: '#cccccc', // Borde gris claro
        backgroundColor: '#fff8d6', // Fondo amarillo claro
        borderRadius: 8, // Bordes redondeados para que parezca una caja
        justifyContent: 'flex-start', // Alinea el contenido al principio (arriba)
        height: 100, // Altura ajustada para hacerlo más grande verticalmente
      },
      inputText: {
        textAlignVertical: 'top',  // Alinea el texto en la parte superior
        textAlign: 'left',         // Alinea el texto a la izquierda
        fontSize: 16,              // Ajusta el tamaño del texto si es necesario
        paddingTop: 10,            // Añade espacio arriba del texto
      },
      
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
        justifyContent: 'flex-end',
        alignItems: 'center', 
        marginBottom: 20, 
      },
      footer: {
        alignItems: 'center',
        marginTop: 20, // Espaciado respecto al botón del centro
      }
})

export default EscrituraEv
 
 


      