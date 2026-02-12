<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { ref } from 'vue';

const color = ref("hsl(177, 100%, 40%)")
const icons = [
  {name: "square"}, 
  {name: "circle"},
  {name: "triangle-down"}
  ]
</script>

<template>
  <v-app>
    <v-sheet class="d-flex justify-end" height="28" color="custom-color">
      <div v-for="icon in icons" :key="icon.name">
        <v-icon size="small" :color="color" :icon="`mdi-${icon.name}`" class="mx-1" />
      </div>
    </v-sheet>
    <Header />
    <v-main>
      <router-view/>
    </v-main>
    
    <Footer/>
  </v-app>
</template>