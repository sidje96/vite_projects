<script setup>
import router from '@/router';
import { useInspectionStore } from '@/stores/inspection';

const store = useInspectionStore()

function newInspection() {
    store.currentInspection = null
    router.push({ name: 'Form'})
}
</script>

<template>
    <v-sheet class="d-flex flex-sm-row flex-column justify-center align-center ga-10" min-height="100%" theme="custom-color">
        <v-btn
            variant="elevated"
            size="x-large"
            class="text-h6 px-8 py-6"
            prepend-icon="mdi-plus"
            height="20vh"
            @click="newInspection"
            >
            Nieuwe inspectie
            </v-btn>

            <v-btn
            variant="elevated"
            size="x-large"
            class="text-h6 px-8 py-6"
            prepend-icon="mdi-check"
            height="20vh"
            width="252.46"
            @click="router.push({ name: 'Completed'})"
            >
            Afgerond
        </v-btn>
    </v-sheet>  
</template>