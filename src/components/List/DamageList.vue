<script setup>
import { useDate } from "@/composables/useDate"

const { formatDate } = useDate()

const items = defineModel()
</script>

<template>
    <v-list-group>
    <template #activator="{ props }">
    <v-list-item v-bind="props" title="Schade" class="text-custom-color"></v-list-item>
    </template>

    <v-list-item
    v-for="(item, index) in items || []"
    :key="index"
    >
    <v-row no-gutters class="w-100">
        <v-col cols="12" md="4"><strong>Locatie</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Location || "-" }}</v-col>

        <v-col cols="12" md="4"><strong>Nieuwe schade</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.DamageNew ? "Ja" : "Nee" }}</v-col>

        <v-col cols="12" md="4"><strong>Soort schade</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Type || "-"}}</v-col>
        
        <v-col cols="12" md="4"><strong>Datum</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ formatDate(item.Date) || "-" }}</v-col>
        
        <v-col cols="12" md="4"><strong>Acute actie vereist</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Acute ? "Ja" : "Nee" }}</v-col>

        <v-col cols="12" md="4"><strong>Omschrijving</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Description || "-" }}</v-col>

        <v-col cols="12" md="4"><strong>Foto's</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">
        <span v-if="!item.Pictures || item.Pictures.length === 0">Geen Foto's</span>
        <span v-else>
            <template v-for="(pic, i) in item.Pictures" :key="i">
                <img 
                :src="pic"
                style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;"
                >
                <span v-if="i < item.Pictures.length - 1">, </span>
            </template>
        </span>
        </v-col>
    </v-row>
    </v-list-item>
    </v-list-group>
</template>