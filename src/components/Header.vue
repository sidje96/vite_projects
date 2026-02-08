<template>
    <v-toolbar :elevation="10" color="black">
        <router-link to="/">
            <Icon color="white" size="64" class="d-flex align-center" />
        </router-link>
        <div class="d-flex flex-column align-xs-center">       
            <span class="text-subtitle-1 text-sm-h6 text-md-h5">Real Estate Care</span>
            <span class="text-caption text-sm-subtitle-2 text-md-subtitle-1">Caring is in our nature</span>
        </div>
        <v-spacer />        
        <v-btn @click="goback" title="back" :size="xs ? '25' : (sm ? '35' : '45')" class="rounded-circle">
            <v-icon :size="xs ? '20' : (sm ? '30' : '40')">mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn :to="{name: 'settings'}" title="settings" :size="xs ? '25' : (sm ? '35' : '45')" class="rounded-circle">
            <v-icon :size="xs ? '20' : (sm ? '30' : '40')">mdi-cog</v-icon>
        </v-btn>   
    </v-toolbar>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Icon from './icons/icon.vue';
import { useDisplay } from 'vuetify';

const router = useRouter()

const { xs, sm } = useDisplay()

function goback() {
    router.back();
}

</script>