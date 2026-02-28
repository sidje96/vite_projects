<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const code = ref('')
const loading = ref(false)
const showAlert = ref(false)
const progress = ref(false)

const form = ref(null)

onMounted(() => {
    auth.error = null
    if (auth.step === 2) {
        auth.generateNewCode()
    }
    progress.value = true
    setTimeout(() => {
        progress.value = false
        showAlert.value = true
    }, 5000)
})

async function verify() {
    const { valid } = await form.value.validate()

    if (!valid) return

    loading.value = true
    const success = await auth.verifyCode(code.value)
    loading.value = false

    if (success) {
        router.push('/')
    }
}

const required = v => !!v || 'Dit veld is verplicht'

</script>

<template>
<v-container class="fill-height d-flex align-center justify-center">
    
    <v-card width="380" class="pa-6" color="cardBg">
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

        <div v-if="progress" class="d-flex justify-center align-center mb-4 text-custom-color">
            <v-progress-linear :indeterminate="progress"/>
        </div>

        <v-alert
            v-if="showAlert"
            type="info"
            width="100%"
            class="text-body-2 text-center my-4"
            closable
        >
            Je verificatiecode is: <strong>{{ auth.generatedCode }}</strong>
        </v-alert>
        
        <v-form ref="form" validate-on="submit" @submit.prevent="verify">
            <v-text-field
                v-model="code"
                label="Code"
                variant="outlined"
                maxlength="6"
                class="mb-4"
                :rules="[required]"
            />

            <button type="submit" class="d-none"></button>

            <v-btn
                block
                color="custom-color"
                :loading="loading"
                @click="verify"
            >
                Verifiëren
            </v-btn>
        </v-form>
    </v-card>
</v-container>
</template>
