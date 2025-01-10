import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../BaseDeDatos/fireBase';  // Importar firebase (incluyendo auth)
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';


// Ahora puedes acceder a auth desde firebase
const { auth } = firebase;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));  // Si hay usuario, cargarlo
      } else {
        setAnonymousUser();  // Si no hay usuario, establecer usuario anónimo
      }
    };
    loadUser();
  }, []);


  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = { uid: userCredential.user.uid, email: userCredential.user.email };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error en login:', error.message);
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = { uid: userCredential.user.uid, email: userCredential.user.email };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error en registro:', error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      setUser(null);
      setAnonymousUser();
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const setAnonymousUser = async () => {
    const uniqueId = `device-${Date.now()}`;
    const anonymousData = { uid: uniqueId, email: 'invitado', isAnonymous: true };
    await AsyncStorage.setItem('user', JSON.stringify(anonymousData)); // Guardar identificador anónimo
    setUser(anonymousData); // Establecer como usuario actual
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
