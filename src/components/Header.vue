<template>
    <v-toolbar :elevation="10" color="black" class="pt-1">
        <router-link to="/">
            <Icon color="white" size="75" />
        </router-link>
        <div class="d-flex flex-column align-xs-center">       
            <span :class="size">Real Estate Care</span>
            <span :class="size2">Caring is in our nature</span>
        </div>
        <v-spacer />        
        <v-btn @click="goback" title="back" size="small"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-btn :to="{name: 'settings'}" title="settings" size="small"><v-icon>mdi-cog</v-icon></v-btn>   
    </v-toolbar>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Icon from './icons/icon.vue';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const {name} = useDisplay()

const size = computed (() => {
    switch(name.value) {
        case 'xs': return "text-subtitle-1"
    }
    return "text-h5"
})

const size2 = computed(() => {
    switch(name.value) {
        case 'xs': return "text-caption"
    }
    return "text-subtitle-2"
})

const router = useRouter()

function goback() {
    router.back();
}

</script>

<style scoped>
.text-subtitle-1 {
    font-size: .8rem !important;
}
.text-caption {
    font-size: .60rem !important;
}
</style>