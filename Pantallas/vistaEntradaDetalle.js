import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from "react-native";
import {obtenerEntrada,modificarTitulo, modificarContenido,  eliminarEntrada,} from "../BaseDeDatos/fireBaseCRUD";
import { useNavigation } from "@react-navigation/native";

const VistaEntradaDetalle = ({ route }) => {
  const { id } = route.params;
  const [entrada, setEntrada] = useState(null);
  const [tituloEditable, setTituloEditable] = useState(false);
  const [contenidoEditable, setContenidoEditable] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoContenido, setNuevoContenido] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const cargarEntrada = async () => {
      try {
        const datos = await obtenerEntrada(id); // Usa el id para obtener la entrada
        console.log("Datos obtenidos:", datos);
        setEntrada(datos);
        setNuevoTitulo(datos.titulo); 
        setNuevoContenido(datos.contenido);
      } catch (error) {
        console.error("Error al cargar la entrada:", error);
      }
    };

    cargarEntrada();
  }, [id]); 

  const handleEliminarEntrada = () => {
    Alert.alert(  
      "Eliminar entrada",
      "¿Estás seguro que quieres eliminar esta entrada?",
      [{text: "Cancelar",style: "cancel",},
        {text: "Eliminar",style: "destructive",
          onPress: async () => {   
            try {
              await eliminarEntrada(id);
              console.log("Entrada eliminada correctamente");
              navigation.goBack();
            } catch (error) {
              console.error("Error al eliminar la entrada:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleActualizar = async () => {
    try {
      if (nuevoTitulo !== entrada.titulo) {
        await modificarTitulo(id, nuevoTitulo);
      }
      if (nuevoContenido !== entrada.contenido) {
        await modificarContenido(id, nuevoContenido);
      }
      Alert.alert("Éxito", "Entrada actualizada correctamente");
      setEntrada({ ...entrada, titulo: nuevoTitulo, contenido: nuevoContenido });
    } catch (error) {
      console.error("Error al actualizar la entrada:", error);
    }
  };

  if (!entrada) {
    return (
      <View style={estilos.container}>
        <Text>Cargando entrada...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Button
          title="Eliminar entrada"
          onPress={handleEliminarEntrada}
          color="red"
        />
      </View>
       {/* Título */}
       <TouchableOpacity onPress={() => setTituloEditable(true)}>
        {tituloEditable ? (
          <TextInput
            style={estilos.inputTitulo}
            value={nuevoTitulo}
            onChangeText={setNuevoTitulo}
            onBlur={() => setTituloEditable(false)}
            autoFocus
          />
        ) : (
          <Text style={estilos.titulo}>{entrada.titulo}</Text>
        )}
      </TouchableOpacity>
      {/* Contenido */}
      <TouchableOpacity onPress={() => setContenidoEditable(true)}>
        {contenidoEditable ? (
          <TextInput
            style={estilos.inputContenido}
            value={nuevoContenido}
            onChangeText={setNuevoContenido}
            onBlur={() => setContenidoEditable(false)}
            multiline
            autoFocus
          />
        ) : (
          <Text style={estilos.contenido}>{entrada.contenido}</Text>
        )}
      </TouchableOpacity>

      {/* Botón de Actualizar */}
      <Button title="Actualizar Entrada" onPress={handleActualizar} />
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contenido: {
    fontSize: 16,
    color: "#555",
  },
  inputTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  inputContenido: {
    fontSize: 16,
    color: "#555",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  }
});

export default VistaEntradaDetalle;
