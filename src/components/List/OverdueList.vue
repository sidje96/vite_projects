<script setup>
const items = defineModel()
</script>

<template>
    <v-list-group>
    <template #activator="{ props }">
    <v-list-item v-bind="props" title="Achterstallig onderhoud" class="text-custom-color"></v-list-item>
    </template>

    <v-list-item
    v-for="(item, index) in items || []"
    :key="index"
    >
    <v-row no-gutters class="w-100">
        <v-col cols="12" md="4"><strong>Locatie</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Location }}</v-col>

        <v-col cols="12" md="4"><strong>Soort onderhoud</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Type }}</v-col>
        
        <v-col cols="12" md="4"><strong>Acute actie vereist</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Acute ? "Ja" : "Nee" }}</v-col>

        <v-col cols="12" md="4"><strong>Kosten indicatie</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.CostIndication }}</v-col>

        <v-col cols="12" md="4"><strong>Foto's</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">
        <span v-if="!item.Pictures || item.Pictures.length === 0">No pictures</span>
        <span v-else>
            <span v-for="(file, i) in item.Pictures" :key="i">
            {{ file.name }}
            <span v-if="i < item.Pictures.length - 1">, </span>
            </span>
        </span>
        </v-col>
    </v-row>
    </v-list-item>
</v-list-group>
</template>