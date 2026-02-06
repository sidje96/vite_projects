<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <v-app>
    <Header />
    <router-view/>
    <Footer/>
  </v-app>
</template>