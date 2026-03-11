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