import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from "react-native";
import {obtenerEmocion,modificarNombreEm, modificarDescripcionEm, eliminarEmocion,} from "../BaseDeDatos/fireBaseCRUD";
import { useNavigation } from "@react-navigation/native";

const detalleEmocion = ({ route }) => {
  const { id } = route.params;
  const [emocion, setEmocion] = useState(null);
  const [tituloEditable, setTituloEditable] = useState(false);
  const [contenidoEditable, setContenidoEditable] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoContenido, setNuevoContenido] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const cargarEmocion = async () => {
      try {
        const datos = await obtenerEmocion(id); 
        console.log("Datos obtenidos:", datos);
        setEmocion(datos);
        setNuevoTitulo(datos.nombre); 
        setNuevoContenido(datos.descripcion);
      } catch (error) {
        console.error("Error al cargar la emocion:", error);
      }
    };

    cargarEmocion();
  }, [id]); 

  const handleEliminarEmocion = () => {
    Alert.alert(  
      "Eliminar emoción",
      "¿Estás seguro que quieres eliminar esta emoción?",
      [{text: "Cancelar",style: "cancel",},
        {text: "Eliminar",style: "destructive",
          onPress: async () => {   
            try {
              await eliminarEmocion(id);
              console.log("Emocion eliminada correctamente");
              navigation.goBack();
            } catch (error) {
              console.error("Error al eliminar la emocion:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleActualizar = async () => {
    try {
      if (nuevoTitulo !== emocion.nombre) {
        await modificarNombreEm(id, nuevoTitulo);
      }
      if (nuevoContenido !== emocion.descripcion) {
        await modificarDescripcionEm(id, nuevoContenido);
      }
      Alert.alert("Éxito", "Emocion actualizada correctamente");
      setEmocion({ ...emocion, nombre: nuevoTitulo, descripcion: nuevoContenido });
    } catch (error) {
      console.error("Error al actualizar la emocion:", error);
    }
  };

  if (!emocion) {
    return (
      <View style={estilos.container}>
        <Text>Cargando emoción...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Button
          title="Eliminar emoción"
          onPress={handleEliminarEmocion}
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
          <Text style={estilos.titulo}>{emocion.nombre}</Text>
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
          <Text style={estilos.contenido}>{emocion.descripcion}</Text>
        )}
      </TouchableOpacity>

      {/* Botón de Actualizar */}
      <Button title="Actualizar Emocion" onPress={handleActualizar} />
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

export default detalleEmocion;
