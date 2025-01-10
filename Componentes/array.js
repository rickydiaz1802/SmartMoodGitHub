import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ComponenteArray = ({ data, onPress }) => {
  return (
    <View style={estilos.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.itemContainer}
            onPress={() => onPress(item.id)}
          >
            {/* Mostrar título */}
            <Text style={estilos.itemTitle}>{item.titulo}</Text>

            {/* Mostrar contenido */}
            <Text style={estilos.itemText}>{item.contenido}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ArrayEm = ({ data, onPress }) => {
  return (
    <View style={estilos.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.itemContainer}
            onPress={() => onPress(item.id)}
          >
            {/* Mostrar título */}
            <Text style={estilos.itemTitle}>{item.nombre}</Text>

            {/* Mostrar contenido */}
            <Text style={estilos.itemText}>{item.descripcion}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 14, // Título más pequeño
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5, // Espacio entre título y contenido
  },
  itemText: {
    fontSize: 16, // Contenido más grande
    color: '#555',
  },
});

export default ComponenteArray;

export { ArrayEm };
