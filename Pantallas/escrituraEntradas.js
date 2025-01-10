import React, {useState, useEffect} from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { agregarEntrada, obtenerEmociones } from '../BaseDeDatos/fireBaseCRUD';
import AsyncStorage from '@react-native-async-storage/async-storage'; 



const Escritura = (props) => {

    const [state, setState] = useState({
       contenido:'',
       titulo:'Default por ahora',
       eventos:'Default',
    });
    
    const [emociones, setEmociones] = useState([]);
  const [emocionesSeleccionadas, setEmocionesSeleccionadas] = useState([]);

    const handleChangeText = (name,value) =>{
        setState({...state,[name]:value})
    }

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
    
            const datos = await obtenerEmociones(usuarioId); 
            setEmociones(datos);
          } catch (error) {
            console.error("Error al cargar emociones:", error);
          }
        };
        cargarEmociones();
      }, []);

      const seleccionarEmocion = (id) => {
        setEmocionesSeleccionadas((prev) =>
          prev.includes(id) ? prev.filter((emoId) => emoId !== id) : [...prev, id]
        );
      };

    const guardarEntrada = async() => {
        
        const storedUser = await AsyncStorage.getItem('user');
        if(storedUser){
            const usuario = JSON.parse(storedUser);
            const usuarioId = usuario.uid;

        if(state.contenido === '')
        {
            alert('No se pueden registrar entradas vacías')
            return;
        }
        else{
            agregarEntrada(state.titulo, state.contenido, emocionesSeleccionadas, state.eventos, usuarioId)
         .then(id => {
        console.log("Entrada agregada con ID:", id);
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
            <Button title="Aquí irá el bote de basura" onPress={() => alert('Botón Derecha')} />
          </View>
    
          {/* Segundo View: Botón en el centro */}
          <View>
          <View style = {estilos.inputGroup}>
          <TextInput placeholder="Título"
                style={estilos.inputText}
                onChangeText={(value) => handleChangeText('titulo', value)}/>

                <TextInput placeholder="Cuéntamelo todo"
                style={estilos.inputText}
                onChangeText={(value) => handleChangeText('contenido', value)}/>
            </View>
            <View>
                <Button title="Guardar Entrada" onPress={guardarEntrada}/>
            </View>
          </View>
    
          {/* Tercer View: Botón debajo del centro */}
          <View style={estilos.footer}>
          <ScrollView horizontal={true} style={estilos.scrollHorizontal} showsHorizontalScrollIndicator={false}>
          {emociones.map((emocion) => (
            <TouchableOpacity
              key={emocion.id}
              style={[
                estilos.emocion,
                emocionesSeleccionadas.includes(emocion.id) && estilos.emocionSeleccionada,
              ]}
              onPress={() => seleccionarEmocion(emocion.id)}
              accessibilityRole="button" // Esto indica que es un botón para tecnologías asistidas
            accessibilityLabel={`Seleccionar emoción: ${emocion.nombre}`}
            >
              <Text style={estilos.textoEmocion}>{emocion.nombre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
        height: 80, // Limita el espacio para las emociones
    justifyContent: 'center',
      },
      scrollHorizontal: {
        flexGrow: 0,
        marginVertical: 10,
      },
      emocion: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
      },
      emocionSeleccionada: {
        backgroundColor: '#ffdd99',
        borderColor: '#ff9900',
      },
      textoEmocion: {
        fontSize: 14,
        color: '#333',
      },
})

export default Escritura
 
 


      