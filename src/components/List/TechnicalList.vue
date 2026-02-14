<script setup>
const items = defineModel()
</script>

<template>
<v-list-group>
    <template #activator="{ props }">
        <v-list-item v-bind="props" title="Technische Installaties" class="text-custom-color"></v-list-item>
    </template>

    <v-list-item
    v-for="(item, index) in items || []"
    :key="index"
    >
    <v-row no-gutters class="w-100">
        <v-col cols="12" md="4"><strong>Locatie</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Location }}</v-col>

        <v-col cols="12" md="4"><strong>Soort installatie</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Type }}</v-col>

        <v-col cols="12" md="4"><strong>Storingen</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Errors }}</v-col>

        <v-col cols="12" md="4"><strong>Test procedure</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">
        <span v-if="!item.TestProcedure || item.TestProcedure.length === 0">Geen test procedure</span>
        <span v-else>{{ item.TestProcedure[0].name }}</span>
        </v-col>

        <v-col cols="12" md="4"><strong>Goedgekeurd</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Approved ? "Yes" : "No" }}</v-col>
        
        <v-col cols="12" md="4"><strong>Opmerkingen</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Remarks ? item.Remarks : "-" }}</v-col>
        
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