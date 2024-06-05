<template>
  <div class="container">
    <div class="text-input-container">
      <div class="text-input">
        <label>Monto Total</label><br>
        <input type="text" v-model="input1Value" @input="updateStore">
      </div>
      <label>
        <input type="radio" v-model="Persona" value="Oscar" @change="updateStore" name="Persona" checked> Oscar
      </label>
      <label>
        <input type="radio" v-model="Persona" value="Anto" @change="updateStore" name="Persona"> Anto
      </label>
    </div><br>
    <div>
      <label>
        <input type="radio" v-model="tipoDePago" value="dividido" @change="updateStore" name="tipoDePago" checked>
        Dividido
      </label>
      <label>
        <input type="radio" v-model="tipoDePago" value="full" @change="updateStore" name="tipoDePago"> Full
      </label>
    </div><br>
    <button @click="realizarCalculo()">Ingresar en cola</button><br><br>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore();

let input1Value = ref('');
let tipoDePago = ref();
let Persona = ref();



const realizarCalculo = () => {

  // Verificar si el valor ingresado es un número
  if (isNaN(input1Value.value)) {
    alert('Por favor, ingrese un número válido.');
    input1Value.value = "";
    return; // Detener la ejecución de la función si no es un número
  }


  if (!Persona.value) {
    Persona.value = 'Oscar';
  }

  if (!tipoDePago.value) {
    tipoDePago.value = 'dividido';
  }
  let info = { Monto: input1Value.value, Modalidad: tipoDePago.value, Person: Persona.value };

  store.dispatch('MostrarData', info);

  
   input1Value.value = "";
}



</script>

<style scoped lang="scss">
@import '@/assets/scss/estilos.modules.scss';
</style>
