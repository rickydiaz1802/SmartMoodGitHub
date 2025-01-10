import { addDoc, doc, setDoc, getDoc, updateDoc, 
    deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
    import { db } from './fireBase';
    import fireBase from '../BaseDeDatos/fireBase';
 

//Operaciones colección entradas 

//Agregar entrada
export const agregarEntrada = async (titulo, contenido, emociones, eventos, userId) => {
    try {
      
      await fireBase.addDoc(fireBase.collection(fireBase.db, 'entradas'),{
        contenido: contenido,
        titulo: titulo,
        emociones: emociones,
        eventos: eventos,
        userId: userId,
        fecha: new Date().toISOString()
    })
      console.log("Entrada agregada");
    } catch (error) {
      console.error("Error al agregar entrada:", error);
      throw error;
    }
  };

  

  //Eliminar entrada 
  export const eliminarEntrada = async (id) => {
    try {
      const docRef = doc(fireBase.db, "entradas", id); 
      await deleteDoc(docRef);
      console.log("Entrada eliminada con ID:", id);
    } catch (error) {
      console.error("Error al eliminar entrada:", error);
      throw error;
    }
  };

  //Recuperar entradas 
  export const obtenerEntradas = async (userId) => {
    try {
      const q = query(fireBase.collection(fireBase.db, "entradas"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const entradas = [];
      querySnapshot.forEach((doc) => {
        entradas.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return entradas;
    } catch (error) {
      console.error("Error al obtener entradas:", error);
      throw error;
    }
  };

  //Recuperar entrada
  export const obtenerEntrada = async (entradaId) => {
    try {
      const docRef = doc(fireBase.db, "entradas", entradaId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        console.log("No se encontró la entrada con el ID proporcionado.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la entrada:", error);
      throw error;
    }
  };

  //Modificar contenido
  export const modificarContenido = async (id, nuevoContenido) => {
    try {
      const docRef = doc(fireBase.db, "entradas", id);
      await updateDoc(docRef, {
        contenido: nuevoContenido,
      });
      console.log("Contenido actualizado con éxito.");
    } catch (error) {
      console.error("Error al modificar contenido:", error);
      throw error;
    }
  };
  
  //Modificar título 
  export const modificarTitulo = async (id, nuevoTitulo) => {
    try {
      const docRef = doc(fireBase.db, "entradas", id);
      await updateDoc(docRef, {
        titulo: nuevoTitulo,
      });
      console.log("Título actualizado con éxito.");
    } catch (error) {
      console.error("Error al modificar título:", error);
      throw error;
    }
  };


//Operaciones colección emociones

//Agregar emoción
export const agregarEmocion = async (nombre, descripcion, color, userId,) => {
  try {
    
    await fireBase.addDoc(fireBase.collection(fireBase.db, 'emociones'),{
      descripcion: descripcion,
      nombre : nombre,
      color: color,
      userId: userId
  })
    console.log("Emocion agregada");
  } catch (error) {
    console.error("Error al agregar emocion:", error);
    throw error;
  }
};

//Eliminar emocion
export const eliminarEmocion = async (id) => {
  try {
    const docRef = doc(fireBase.db, "emociones", id); 
    await deleteDoc(docRef);
    console.log("Emocion eliminada con ID:", id);
  } catch (error) {
    console.error("Error al eliminar emocion:", error);
    throw error;
  }
};

//Recuperar emociones
export const obtenerEmociones = async (userId) => {
  try {
    const q = query(fireBase.collection(fireBase.db, "emociones"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const entradas = [];
    querySnapshot.forEach((doc) => {
      entradas.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return entradas;
  } catch (error) {
    console.error("Error al obtener emociones:", error);
    throw error;
  }
};

  //Recuperar entrada
  export const obtenerEmocion = async (emocionId) => {
    try {
      const docRef = doc(fireBase.db, "emociones", emocionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        console.log("No se encontró la emocion con el ID proporcionado.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la emocion:", error);
      throw error;
    }
  };

  //Modificar contenido
  export const modificarDescripcionEm = async (id, nuevaDescripcion) => {
    try {
      const docRef = doc(fireBase.db, "emociones", id);
      await updateDoc(docRef, {
        descripcion: nuevaDescripcion,
      });
      console.log("Contenido actualizado con éxito.");
    } catch (error) {
      console.error("Error al modificar contenido:", error);
      throw error;
    }
  };
  
  //Modificar título 
  export const modificarNombreEm = async (id, nuevoNombre) => {
    try {
      const docRef = doc(fireBase.db, "emociones", id);
      await updateDoc(docRef, {
        nombre: nuevoNombre,
      });
      console.log("Título actualizado con éxito.");
    } catch (error) {
      console.error("Error al modificar nombre:", error);
      throw error;
    }
  };



//Operaciones colección eventos

//Agregar evento
export const agregarEvento = async (nombre, descripcion, userId) => {
  try {
    
    await fireBase.addDoc(fireBase.collection(fireBase.db, 'eventos'),{
      descripcion: descripcion,
      nombre : nombre,
      userId: userId
  })
    console.log("evento agregado");
  } catch (error) {
    console.error("Error al agregar evento:", error);
    throw error;
  }
};

//Eliminar entrada 
export const eliminarEvento = async (id) => {
  try {
    const docRef = fireBase.doc(fireBase.db, "eventos", id);
    await deleteDoc(docRef);
    console.log("Evento eliminado con ID:", id);
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    throw error;
  }
};

//Recuperar entradas
export const obtenerEventos = async (userId) => {
  try {
    const q = query(fireBase.collection(fireBase.db, "eventos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const entradas = [];
    querySnapshot.forEach((doc) => {
      entradas.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return entradas;
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    throw error;
  }
};

//Modificar contenido 
export const modificarEvento = async (id, nuevoContenido) => {
  try {
    const docRef = fireBase.doc(fireBase.db, "eventos", id);
    await fireBase.updateDoc(docRef, {
      contenido: nuevoContenido,
    });
    console.log("Contenido actualizado con éxito.");
  } catch (error) {
    console.error("Error al modificar emocion:", error);
    throw error;
  }
};


