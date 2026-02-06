<template>
    <v-app-bar class="pt-1">
        <v-container fluid>
            <v-row align="center">
                <router-link to="/">
                    <Icon size="75" />
                </router-link>
                <v-spacer></v-spacer>
                <div class="card" @click="goback" title="Page back">  
                    <v-btn icon="mdi-arrow-left" title="back"></v-btn>
                </div>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Icon from './icons/icon.vue';

const router = useRouter()

function goback() {
    router.back();
}

</script>