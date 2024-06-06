<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>No tienes una cuenta? <router-link :to="{ name: 'Signup' }">Regístrate aquí</router-link></p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        // Usuario autenticado correctamente
        const user = userCredential.user;
        console.log('Usuario autenticado:', user);
        // Redirigir a Zacoa después del inicio de sesión exitoso
        router.push({ name: 'Zacoa' });
    } catch (error) {
        // Manejar errores de inicio de sesión
        errorMessage.value = error.message;
        console.error('Error al iniciar sesión:', error);
    }
};
</script>

<style scoped>
.login-container {
    text-align: center;
}
</style>
