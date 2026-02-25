<script setup>
const items = defineModel()
</script>

<template>
    <v-list-group>
    <template #activator="{ props }">
    <v-list-item v-bind="props" title="Modificaties" class="text-custom-color"></v-list-item>
    </template>

    <v-list-item
    v-for="(item, index) in items || []"
    :key="index"
    >
    <v-row no-gutters class="w-100">
        <v-col cols="12" md="4"><strong>Documentatie</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">
        <span v-if="!item.Documentation || item.Documentation.length === 0">Geen documentatie</span>
        <span v-else>{{ item.Documentation[0].name }}</span>
        </v-col>

        <v-col cols="12" md="4"><strong>Locatie</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Location || "-" }}</v-col>
        
        <v-col cols="12" md="4"><strong>Uitgevoerd door</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.ExecutedBy || "-" }}</v-col>

        <v-col cols="12" md="4"><strong>Beschrijving</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Description || "-" }}</v-col>

        <v-col cols="12" md="4"><strong>Te ondernemen actie</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Action || "-" }}</v-col>

        <v-col cols="12" md="4"><strong>Opmerkingen</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Remarks || "-" }}</v-col>

        <v-col cols="12" md="4"><strong>Foto's</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">
        <span v-if="!item.Pictures || item.Pictures.length === 0">Geen foto's</span>
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