<template>
    <v-toolbar :elevation="10" color="hsl(0, 0%, 12%)">
        <router-link to="/">
            <v-img 
                src="/src/assets/LogoWithText.png"
                :width=" xs ? 150 : 250"
                contain
            />
        </router-link>
        <v-alert
        v-if="errorMsg"
        type="error"
        class="mx-4"
        elevation="2">
            {{ errorMsg }}
        </v-alert>
        <template v-else>
            <v-spacer />
        </template>        
        <v-hover v-slot="{ isHovering, props }">
            <v-btn
            v-bind="props" 
            @click="logout" 
            title="uitloggen" 
            :size="xs ? '25' : (sm ? '35' : '45')"
            :class="[isHovering ? 'bg-white text-custom-color' : 'bg-cardBg', ' rounded-circle']">
                <v-icon :size="xs ? '20' : (sm ? '30' : '35')">mdi-logout</v-icon>
        </v-btn>
        </v-hover>
        <v-hover v-slot="{ isHovering, props}">        
        <v-btn 
        v-bind="props"
        @click="router.push({name: 'Settings'})" 
        title="instellingen" 
        :size="xs ? '25' : (sm ? '35' : '45')" 
        :class="[isHovering ? 'bg-white text-custom-color' : 'bg-cardBg', ' rounded-circle', 'mx-4']">
            <v-icon :size="xs ? '20' : (sm ? '30' : '35')">mdi-cog</v-icon>
        </v-btn>
        </v-hover>   
    </v-toolbar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth'
import { useInspectionStore } from '@/stores/inspection'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/auth/login')
}

const { xs, sm } = useDisplay()

const store = useInspectionStore()
const { errorMsg } = storeToRefs(store)


</script>
