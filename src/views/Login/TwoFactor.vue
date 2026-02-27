<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const code = ref('')
const loading = ref(false)
const showAlert = ref(false)

onMounted(() => {
    setTimeout(() => {
        showAlert.value = true
    }, 5000)
})

function verify() {
    loading.value = true
    auth.verifyCode(code.value)
    loading.value = false

    if (auth.isAuthenticated) {
        router.push('/')
    }
}
</script>

<template>
<v-container class="fill-height d-flex align-center justify-center">
    
    <v-card width="380" class="pa-6" color="hsl(0, 0%, 12%)">
        <div class="text-center mb-6">
            <v-img
            src="/src/assets/LogoWithText.png"
            width="100%"
            class="mx-auto"
            contain
            />
        </div>

        <h2 class="text-h5 text-center mb-4 text-custom-color">Verificatiecode</h2>

        <p class="text-body-2 text-center mb-4">
            Voer de 6-cijferige code in die naar je is verzonden.
        </p>

        <v-alert
            v-if="auth.error"
            type="error"
            class="mb-4"
            density="compact"
            closable
        >
            {{ auth.error }}
        </v-alert>
        <v-alert
            v-if="showAlert"
            type="info"
            width="100%"
            class="text-body-2 text-center my-4"
            closable
        >
            Je verificatiecode is: <strong>{{ auth.generatedCode }}</strong>
        </v-alert>

        <v-text-field
            v-model="code"
            label="Code"
            variant="outlined"
            maxlength="6"
            class="mb-4"
        />

        <v-btn
            block
            color="custom-color"
            :loading="loading"
            @click="verify"
        >
            Verifiëren
        </v-btn>
    </v-card>
</v-container>
</template>
