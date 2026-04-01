<script setup>
const model = defineModel()
</script>

<template>
    <div class="pa-4 border">
        <v-text-field label="Locatie" v-model="model.Location" />
        <v-checkbox label="Nieuwe Schade" v-model="model.DamageNew" />
        <v-select label="Soort schade" :items="['moedwillig', 'slijtage', 'geweld', 'normaal gebruik', 'calamiteit', 'anders']" v-model="model.Type" />
        <v-text-field label="Datum" type="date" v-model="model.Date" />
        <v-checkbox label="Acute actie vereist" v-model="model.Acute" />
        <v-textarea label="Omschrijving" v-model="model.Description" />
        <v-label class="mb-1">Foto's</v-label>
        <v-file-input
            v-model="model.Pictures"
            icon="mdi-upload"
            multiple
            chips
            clearable
            accept=".jpg, .jpeg, .png"
            label="Foto's"
        />
    </div>
</template>

