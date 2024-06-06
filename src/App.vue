<template>
  <nav>
    <router-link :to="{name: 'home'}">Home</router-link> |
    <router-link :to="{name: 'Zacoa'}">Zacoa</router-link><br>
    <button @click="goToLoginPage" class="login-button">Login</button>
  </nav>
  <router-view/>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; 
const store = useStore();
const router = useRouter();
// Llama a la acción para obtener el último documento al montar la aplicación
store.dispatch('fetchLastDocument');
store.dispatch('fetchLastNotes');

const goToLoginPage = () => {
  router.push({ name: 'Login' });
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
