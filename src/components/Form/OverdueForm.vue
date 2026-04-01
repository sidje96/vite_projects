<script setup>
const model = defineModel()
</script>

<template>
    <div class="pa-4 border">
        <v-text-field label="Locatie" v-model="model.Location" />
        <v-select label="Soort onderhoud" :items="['schilderwerk', 'houtrot', 'elektra', 'leidingwerk', 'beglazing']" v-model="model.Type" />
        <v-checkbox label="Acute actie vereist" v-model="model.Acute" />
        <v-text-field label="Kosten indicatie" v-model="model.CostIndication" />
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