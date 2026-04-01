<script setup>
const model = defineModel()
</script>

<template>
    <div class="pa-4 border">
        <v-label class="mb-1">Documentatie</v-label>
        <v-file-input
            v-model="model.Documentation"
            icon="mdi-upload"
            multiple
            chips
            clearable
            accept=".pdf"
            label="Alleen pdf bestanden"
        />
        <v-text-field label="Locatie" v-model="model.Location" />
        <v-select label="Uitgevoerd door" :items="['huurder', 'aannemer', 'onbekend']" v-model="model.ExecutedBy" />
        <v-textarea label="Omschrijving" v-model="model.Description" />
        <v-select label="Te ondernemen actie" :items="['accepteren', 'laten keuren', 'laten verwijderen', 'laten aanpassen en keuren']" v-model="model.Action" />
        <v-textarea label="Opmerkingen" v-model="model.Remarks" />
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