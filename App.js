import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Pantallas/login';
import SignUp from './Pantallas/singUp';
import Home from './Pantallas/home';
import Escritura from './Pantallas/escrituraEntradas';
import EscrituraEv from './Pantallas/escrituraEventos';
import EscrituraEm from './Pantallas/escrituraEmociones';
import vistaEntradas from './Pantallas/vistaEntradas';
import VistaEntradaDetalle from './Pantallas/vistaEntradaDetalle';
import DetalleEmocion from './Pantallas/detalleEmocion';
import eventos from './Pantallas/misEventos';
import emociones from './Pantallas/misEmociones';
import { AuthProvider } from './Constantes/AuthContext';
import React, { useEffect } from 'react';
import 'core-js/features/set-immediate';
import detalleEmocion from './Pantallas/detalleEmocion';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes(){
  return(
    <Drawer.Navigator initialRouteName= "Home"> 
    <Drawer.Screen name = "Home" component={Home} />
    <Drawer.Screen name="VistaEntradas" component={vistaEntradas} />
    <Drawer.Screen name = "Emociones" component={emociones} />
    <Drawer.Screen name = "Eventos" component={eventos} />
    </Drawer.Navigator>
  )
}

function MainStack() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={DrawerRoutes} />
      <Stack.Screen name="VistaEntradas" component={vistaEntradas} />
      <Stack.Screen name="DetalleEntrada" component={VistaEntradaDetalle} />
      <Stack.Screen name="Escritura" component={Escritura} />
      <Stack.Screen name="NuevaEmocion" component={EscrituraEm} />
      <Stack.Screen name="NuevoEvento" component={EscrituraEv} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SingUp" component={SignUp} />
      <Stack.Screen name="Emociones" component={emociones} />
      <Stack.Screen name="DetalleEmocion" component={detalleEmocion} />
      <Stack.Screen name="Eventos" component={eventos} />
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <AuthProvider>  
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AuthProvider>
  );
}



