<template>
    <div class="container">
      <p v-if="resultado !== null">{{ resultado }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const resultado = computed(() => store.state.Monto);
  </script>
  
  <style scoped lang="scss">
  @import '@/assets/scss/estilos.modules.scss';
  </style>
  