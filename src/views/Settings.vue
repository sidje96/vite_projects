<script setup>
import BackButton from '@/components/BackButton.vue'
import { ref, reactive, computed} from 'vue'
import { userStore } from '@/stores/user'

const store = userStore()

const dialog = reactive(
    { name: 'password', value: false },
    { name: 'initials', value: false },
    { name: 'colorpicker', value: false }
)
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const snackbar = ref(false)
const localInitials = ref('')

function resetForm() {
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
}

const colors = [
    { name: 'Standaard', value: 'hsl(177, 100%, 34%)'},
    { name: 'Rood', value: 'hsl(0, 100%, 50%)' },
    { name: 'Groen', value: 'hsl(120, 100%, 50%)' },
    { name: 'Blauw', value: 'hsl(240, 100%, 50%)' },
]

function saveInitials() {
  store.setInitials(localInitials.value)
  dialog.initials = false
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="bg-custom-color d-flex align-center ga-2">
                <BackButton />
                <h2>Instellingen</h2>
            </v-col>
            <v-col cols="12">
                <h3>Account</h3>
                <v-divider class="border-opacity-25" thickness="3" color="custom-color" />
            </v-col>
            <v-col cols="12" md="6">
                <v-card flat class="bg-cardBg">
                    <v-card-title>Profiel informatie</v-card-title>
                    <v-card-item>
                        <v-card-subtitle>Gebruikersnaam</v-card-subtitle>
                        <v-card-text>
                            Sidney
                        </v-card-text>
                    </v-card-item>
                    <v-card-item>
                        <v-card-subtitle>Wachtwoord</v-card-subtitle>
                        <v-card-text>
                            <v-text-field disabled type="password" value="**********"></v-text-field>
                        </v-card-text>
                    </v-card-item> 
                        <v-btn class="ma-2" color="custom-color" variant="outlined" @click="dialog.password = true">
                            Wachtwoord wijzigen
                        </v-btn>

                        <v-dialog v-model="dialog.password" max-width="450">
                            <v-card class="text-custom-color">
                            <v-card-title class="text-h6">
                                Wachtwoord wijzigen
                            </v-card-title>

                            <v-card-text>
                                <v-text-field
                                v-model="oldPassword"
                                label="Huidig wachtwoord"
                                type="password"
                                variant="outlined"
                                />

                                <v-text-field
                                v-model="newPassword"
                                label="Nieuw wachtwoord"
                                type="password"
                                variant="outlined"
                                />

                                <v-text-field
                                v-model="confirmPassword"
                                label="Bevestig nieuw wachtwoord"
                                type="password"
                                variant="outlined"
                                />
                            </v-card-text>

                            <v-card-actions class="justify-end">
                                <v-btn variant="text" @click="dialog.password = false, resetForm()">
                                Annuleren
                                </v-btn>

                                <v-btn color="custom-color" variant="flat" @click="dialog.password = false, snackbar = true, resetForm()">
                                Opslaan
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-avatar size="80" color="custom-color" class="ma-2">
                    <span class="text-h3">{{ store.initials }}</span>
                </v-avatar>

                <v-card flat class="mt-4 bg-cardBg">
                    <v-btn class="ma-2" color="custom-color" variant="outlined" @click="dialog.initials = true">
                        Initialen wijzigen
                    </v-btn>

                        <v-dialog 
                            v-model="dialog.initials"
                            max-width="450"
                            @update:model-vaue="opened => {
                                if(opened) {
                                    localInitials.value = store.initials
                                }
                            }"
                            >
                            <v-card class="text-custom-color">
                            <v-card-title class="text-h6">
                                Initialen wijzigen
                            </v-card-title>

                            <v-card-text>
                                <v-text-field
                                v-model="localInitials"
                                label="Initialen"
                                type="text"
                                maxlength="2"
                                variant="outlined"
                                />
                            </v-card-text>

                            <v-card-actions class="justify-end">
                                <v-btn variant="text" @click="dialog.initials = false">
                                Annuleren
                                </v-btn>

                                <v-btn color="custom-color" variant="flat" @click="saveInitials()">
                                Opslaan
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                </v-card>

                <v-card flat class="mt-4 bg-cardBg">
                    <v-card-title>Accentkleur</v-card-title>
                    <v-card-text>
                    <v-chip-group
                        v-model="store.prefersColor"
                        column
                        @update:model-value="store.setColor"
                    >
                        <v-chip
                        v-for="c in colors"
                        :key="c.value"
                        :value="c.value"
                        :style="{ background: c.value, color: 'white' }"
                        >
                        {{ c.name }}
                        </v-chip>
                    </v-chip-group>
                    </v-card-text>
                </v-card>

                <v-btn
                    class="mt-2"
                    color="custom-color"
                    variant="outlined"
                    @click="dialog.colorPicker = true"
                    >
                    Kies eigen kleur
                    </v-btn>

                    <v-dialog v-model="dialog.colorPicker" max-width="350">
                    <v-card>
                        <v-card-title>Kies een kleur</v-card-title>

                        <v-card-text>
                        <v-color-picker
                            v-model="store.prefersColor"
                            mode="hsla"
                            hide-inputs
                        />
                        </v-card-text>

                        <v-card-actions class="justify-end">
                        <v-btn variant="text" @click="dialog.colorPicker = false">Sluiten</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>


                <v-card flat class="mt-4 bg-cardBg">
                    <v-card-title>Dark mode</v-card-title>
                    <v-card-text>
                    <v-switch
                        v-model="store.prefersDark"
                        label="Dark mode"
                        color="custom-color"
                        false-icon="mdi-white-balance-sunny"
                        true-icon="mdi-moon-waning-crescent"
                        @update:model-value="store.setDark"
                    />
                    </v-card-text>
                </v-card>

                </v-col>
        </v-row>
    
    </v-container>
    <v-snackbar v-model="snackbar" location="top" color="warning" timeout="5000">
        <span>De functionaliteit om je wachtwoord te veranderen werkt nog niet</span>
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