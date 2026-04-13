<template>
    <v-toolbar :elevation="10" color="loginBg">
        <router-link to="/">
            <v-img 
                alt="Logo met tekst"
                :src="LogoWithText"
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
        
        <v-menu
            transition="fade-transition"
            >
            <template #activator="{ props: menuProps }">
                <v-hover v-slot="{ isHovering, props: hoverProps }">
                <v-btn
                    v-bind="notifications.count == 0 ? hoverProps : mergeProps(menuProps, hoverProps)"
                    icon
                    title="Notificaties"
                    :size="xs ? '25' : (sm ? '35' : '45')"
                    :class="[
                    isHovering ? 'bg-white text-custom-color' : 'bg-loginBg',
                    'rounded-circle',
                    'ml-4'
                    ]"
                    @click.stop="notifications.count === 0 ? null : (menuOpen = true)"
                >
                    <v-icon :size="xs ? '20' : (sm ? '30' : '35')">mdi-bell</v-icon>

                    <v-badge
                    v-if="notifications.count > 0"
                    offset-y="-15"
                    :content="notifications.count"
                    color="custom-color"
                    overlap
                    />
                </v-btn>
                </v-hover>
            </template>


            <v-card min-width="300" class="pa-2">
                <v-list>
                <v-list-item
                    v-for="n in notifications.notifications"
                    :key="n.id"
                >
                    <v-list-item-title>{{ n.message }}</v-list-item-title>

                    <template #append>
                    <v-btn
                        icon="mdi-delete"
                        color="red"
                        variant="text"
                        @click="notify(() => notifications.remove(n.id))"
                    />
                    </template>
                </v-list-item>
                </v-list>

                <v-divider class="my-2" />

                <v-btn
                block
                color="red"
                @click="notify(() => notifications.clearAll())"
                >
                Alles verwijderen
                </v-btn>
            </v-card>
        </v-menu>

              
        <v-hover v-slot="{ isHovering, props }">
            <v-btn
            v-bind="props" 
            @click="logout" 
            title="uitloggen" 
            :size="xs ? '25' : (sm ? '35' : '45')"
            :class="[isHovering ? 'bg-white text-custom-color' : 'bg-loginBg', ' rounded-circle', 'ml-4']">
                <v-icon :size="xs ? '20' : (sm ? '30' : '35')">mdi-logout</v-icon>
        </v-btn>
        </v-hover>
        <v-hover v-slot="{ isHovering, props}">        
        <v-btn 
        v-bind="props"
        @click="router.push({name: 'Settings'})" 
        title="instellingen" 
        :size="xs ? '25' : (sm ? '35' : '45')" 
        :class="[isHovering ? 'bg-white text-custom-color' : 'bg-loginBg', ' rounded-circle', 'mx-4']">
            <v-icon :size="xs ? '20' : (sm ? '30' : '35')">mdi-cog</v-icon>
        </v-btn>
        </v-hover>   
    </v-toolbar>
    <v-snackbar v-model="snackbar" location="top" color="warning" timeout="5000" close>
        <span>Deze notificaties zijn gesimuleerd en komen terug na een refresh.</span>
        <template v-slot:actions>
        <v-btn
        size="small"
          icon="mdi-close"
          @click="snackbar = false"
        >
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth'
import { useInspectionStore } from '@/stores/inspection'
import { storeToRefs } from 'pinia'
import LogoWithText from '@/assets/LogoWithText.png'
import { useNotificationStore } from '@/stores/notifications'
import { mergeProps, ref } from 'vue'

const notifications = useNotificationStore()

const auth = useAuthStore()
const router = useRouter()
const snackbar = ref(false)

function logout() {
  auth.logout()
  router.push('/auth/login')
}

function notify(action) {
    action()
    snackbar.value = true
}

const { xs, sm } = useDisplay()

const store = useInspectionStore()
const { errorMsg } = storeToRefs(store)
</script>
