<script setup>
const model = defineModel()
</script>

<template>
    <div class="pa-4 border">
        <v-text-field label="Locatie" v-model="model.Location" />
        <v-select label="Soort installatie" :items="['koeling', 'verwarming', 'luchtverversing', 'elektra', 'beveiliging']" v-model="model.Type" />
        <v-text-field label="Storingen" v-model="model.Errors" />
        <v-label class="mb-1">Test Procedure</v-label>
        <v-file-upload 
        v-model="model.TestProcedure"
        icon="mdi-upload"
        show-size
        density="compact"
        clearable
        filter-by-type=".pdf"
        title="Alleen pdf bestanden"
        />
        <v-checkbox label="Goedgekeurd" v-model="model.Approved" />
        <v-textarea label="Opmerkingen" v-model="model.Remarks" />
        <v-label class="mb-1">Foto's</v-label>
        <v-file-upload
            v-model="model.Pictures"
            icon="mdi-upload"
            show-size
            density="compact"
            clearable
            />
    </div>
</template>