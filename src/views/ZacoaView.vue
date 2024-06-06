<template>
 <Actual/>
 <Ingreso/>
 <mensaje/>
 <Resultado/>
 <button @click="logout" class="logout-button">Cerrar sesión</button>

</template>


<script setup>

import Actual from "./ActualView.vue"
import Ingreso from "./IngresoNumeroView.vue"
import Resultado from "./ResultadoView.vue"
import Mensaje from "./NotasView.vue"
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; 
import { auth } from '../firebaseConfig'; // Importa el objeto de autenticación de Firebase

const store = useStore();
const router = useRouter();


// Llama a la acción para obtener el último documento al montar la aplicación
store.dispatch('fetchLastDocument');
store.dispatch('fetchLastNotes');
store.dispatch('monitorAuthState');



const logout = async () => {
  try {
    // Cerrar sesión en Firebase
    await auth.signOut();

    // Limpiar el usuario autenticado en Vuex
    store.commit('setUser', null);
    // Limpiar el usuario del almacenamiento local (localStorage)
    localStorage.removeItem('user');
    // Redirigir al usuario a la página principal después de cerrar sesión
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};



</script>