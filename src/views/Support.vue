<template>
    <v-card>
        <v-card-subtitle class="mt-2">
            Algemene informatie
        </v-card-subtitle>
        <v-card-title>Wanneer moet je de klantenservice benaderen</v-card-title>
        <v-card-text>
            Als je tegen een probleem aanloopt, deze meermaals kan reproduceren en minimaal 1 andere collega heeft hetzelfde probleem
        </v-card-text>
    </v-card>
    <v-form class="ma-4">
        <h3>Probleem</h3>
        <v-list-item @click="toggle('Online')" color="custom-color">
            <v-list-item-title>Online</v-list-item-title>
            <v-list-item-subtitle>Je ervaart dit probleem online</v-list-item-subtitle>

            <template #prepend>
                <v-checkbox
                    v-model="problemTypes"
                    class="d-flex align-self-center" 
                    color="custom-color"
                    value="Online"   
                    @click.stop          
                />
            </template>
        </v-list-item>
        <v-list-item @click="toggle('Offline')">
            <v-list-item-title>Offline</v-list-item-title>
            <v-list-item-subtitle>Je ervaart dit probleem offline</v-list-item-subtitle>

            <template #prepend>
                <v-checkbox
                    v-model="problemTypes"
                    class="d-flex align-self-center" 
                    color="custom-color"
                    value="Offline"
                    @click.stop
                />
            </template>
        </v-list-item>
        <v-textarea label="Beschrijf het probleem" color="custom-color"></v-textarea>
    </v-form>
</template>

<script setup>
import { ref } from 'vue';

const problemTypes = ref([])

function toggle(value) {
  if (problemTypes.value.includes(value)) {
    problemTypes.value = problemTypes.value.filter(v => v !== value)
  } else {
    problemTypes.value.push(value)
  }
}


</script>