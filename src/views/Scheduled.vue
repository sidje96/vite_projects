<script setup>
import router from '@/router';
import { useInspectionStore } from '@/stores/inspection'
import InspectionList from '@/components/List/InspectionList.vue'
import { useDisplay } from 'vuetify'

const store = useInspectionStore()
const { xs, sm } = useDisplay()

function newInspection() {
    store.currentInspection = null
    router.push({ name: 'Form'})
}
</script>

<template>
    <v-sheet class="d-flex flex-sm-row flex-column justify-center align-center ga-10 mt-2" min-height="20%" theme="custom-color">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-btn
                        variant="elevated"
                        class="px-8 py-6"
                        prepend-icon="mdi-plus-circle"
                        height="10vh"
                        width="45vw"
                        @click="newInspection"
                        >
                        <span :class="xs ? 'text-caption' : 'text-h6'">Nieuwe inspectie</span>
                    </v-btn>
                </v-col>
                    <v-col cols="6">
                        <v-btn
                        variant="elevated"
                        class="text-h6 px-8 py-6"
                        prepend-icon="mdi-check"
                        height="10vh"
                        width="45vw"
                        @click="router.push({ name: 'Completed'})"
                        >
                        <span :class="xs ? 'text-caption' : 'text-h6'">Afgerond</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>  
    <InspectionList Status="Scheduled"/>
</template>