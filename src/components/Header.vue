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
        <v-hover v-slot="{ isHovering, props }">
            <v-btn
            v-bind="props" 
            @click="logout" 
            title="uitloggen" 
            :size="xs ? '25' : (sm ? '35' : '45')"
            :class="[isHovering ? 'bg-white text-custom-color' : 'bg-black', ' rounded-circle']">
                <v-icon :size="xs ? '20' : (sm ? '30' : '35')">mdi-logout</v-icon>
        </v-btn>
        </v-hover>
        <v-hover v-slot="{ isHovering, props}">        
        <v-btn 
        v-bind="props"
        :to="{name: 'Settings'}" 
        title="instellingen" 
        :size="xs ? '25' : (sm ? '35' : '45')" 
        :class="[isHovering ? 'bg-white text-custom-color' : 'bg-black', ' rounded-circle', 'mx-4']">
            <v-icon :size="xs ? '20' : (sm ? '30' : '35')">mdi-cog</v-icon>
        </v-btn>
        </v-hover>   
    </v-toolbar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Icon from './icons/icon.vue'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/auth/login')
}

const { xs, sm } = useDisplay()

</script>