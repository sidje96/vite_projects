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
const visible = ref(false)

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
        <v-card width="380" color="cardBg" class="pa-6">
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
            
            <v-form ref="form" validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    hide-details="auto"
                    v-model="username"
                    label="Gebruikersnaam"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    clearable
                    class="mb-3"
                    :rules="[required]"
                />

                <v-text-field
                    v-model="password"
                    label="Wachtwoord"
                    :type="visible ? 'text' : 'password'"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    class="mb-4"
                    :rules="[required]"
                    >
                    <template #append-inner>
                        <v-tooltip :text="visible ? 'Verberg wachtwoord' : 'Toon wachtwoord'" location="bottom">
                        <template #activator="{ props }">
                            <v-icon
                            v-bind="props"
                            @click="visible = !visible"
                            >
                            {{ visible ? 'mdi-eye' : 'mdi-eye-off' }}
                            </v-icon>
                        </template>
                        </v-tooltip>
                    </template>
                </v-text-field>


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