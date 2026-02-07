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
    <line class="d-flex justify-end">
      <div v-for="icon in icons" :key="icon.name">
        <v-icon size="small" :color="color" :icon="`mdi-${icon.name}`" class="pr-1" />
      </div> 
    </line>
    <Header />
    <router-view/>
    <Footer/>
  </v-app>
</template>

<style>
line {
  display: block;
  background: hsl(177, 100%, 34%);
  height: 28px;
}
</style>