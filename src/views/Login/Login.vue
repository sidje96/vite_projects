<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const loading = ref(false)

const form = ref(null)

onMounted(() => {
  auth.error = null
  auth.step = 1
})


async function submit() {
  const { valid } = await form.value.validate()

  if (!valid) return

  loading.value = true
  await auth.login(username.value, password.value)
  loading.value = false

  if (auth.step === 2) {
    router.push('/2fa')
  }
}

const required = v => !!v || 'Dit veld is verplicht'

</script>

<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card width="380" color="hsl(0, 0%, 12%)" class="pa-6">
            <div class="text-center mb-6">
                <v-img
                    src="/src/assets/LogoWithText.png"
                    width="100%"
                    class="mx-auto"
                    contain
                />
            </div>

            <h2 class="text-h5 text-center mb-4 text-custom-color">Inloggen</h2>

            <v-alert
                v-if="auth.error"
                type="error"
                class="mb-4"
                density="compact"
                closable
            >
                {{ auth.error }}
            </v-alert>
            
            <v-form ref="form" @submit.prevent="submit">
                <v-text-field
                    v-model="username"
                    label="Gebruikersnaam"
                    variant="outlined"
                    class="mb-3"
                    :rules="[required]"
                />

                <v-text-field
                    v-model="password"
                    label="Wachtwoord"
                    type="password"
                    variant="outlined"
                    class="mb-4"
                    :rules="[required]"
                />

                <button type="submit" class="d-none"></button>

                <v-btn
                    block
                    color="custom-color"
                    :loading="loading"
                    @click="submit"
                >
                    Inloggen
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>