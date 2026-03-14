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
        <v-col cols="12" md="8" class="text-md-right">{{ item.Location || "-" }}</v-col>
        <v-divider class="border-opacity-50" color="custom-color"/>        
        <v-col cols="12" md="4"><strong>Soort installatie</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Type || "-" }}</v-col>
        <v-divider class="border-opacity-50" color="custom-color"/>        
        <v-col cols="12" md="4"><strong>Storingen</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Errors || "-" }}</v-col>
        <v-divider class="border-opacity-50" color="custom-color"/>        
        <v-col cols="12" md="4"><strong>Test procedure</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">
        <span v-if="!item.Documentation || item.Documentation.length === 0">Geen bestanden</span>
        <span v-else>
            <div v-for="(pdf, i) in item.Documentation" 
            :key="i"
            >
            <v-icon color="red" size="20">mdi-file-pdf-box</v-icon>
                <span class="ml-2">
                PDF {{ i + 1 }}
                </span>
            <span v-if="i < item.Pictures.length - 1">, </span>
            </div>
        </span>
        </v-col>
        <v-divider class="border-opacity-50" color="custom-color"/>        
        <v-col cols="12" md="4"><strong>Goedgekeurd</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Approved ? "Yes" : "No" }}</v-col>
        <v-divider class="border-opacity-50" color="custom-color"/>        
        <v-col cols="12" md="4"><strong>Opmerkingen</strong></v-col>
        <v-col cols="12" md="8" class="text-md-right">{{ item.Remarks ? item.Remarks : "-" }}</v-col>
        <v-divider class="border-opacity-50" color="custom-color"/>        
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