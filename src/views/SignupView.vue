<template>
    <div class="signup-container">
      <h2>Regístrate</h2>
      <form @submit.prevent="signup">
        <input type="text" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Regístrate</button>
      </form>
      <p>Ya tienes una cuenta? <router-link :to="{ name: 'login' }">Inicia sesión aquí</router-link></p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../firebaseConfig';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      // Nuevo usuario registrado correctamente
      const user = userCredential.user;
      console.log('Nuevo usuario registrado:', user);
      // Redirigir a Login después del registro exitoso
      router.push({ name: 'login' });
    } catch (error) {
      // Manejar errores de registro
      errorMessage.value = error.message;
      console.error('Error al registrar usuario:', error);
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    text-align: center;
  }
  </style>
  