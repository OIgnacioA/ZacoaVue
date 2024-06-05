<template>
  <div class="container">
    <h4>Historial:</h4>
    <textarea class="note-textarea" v-model="notasText"></textarea>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const notas = computed(() => store.state.Notas);

// Convertir las notas a un formato de texto para mostrarlas en el textarea


const notasText = computed(() => {
  if (Array.isArray(notas.value)) {
    return notas.value.join('\n');
  } else {
    return '';
  }
});




</script>

<style scoped lang="scss">
@import '@/assets/scss/estilos.modules.scss';

.note-textarea {
  width: 90%;
  height: 300px;
}
</style>
