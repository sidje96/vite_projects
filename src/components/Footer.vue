<template>
<v-bottom-navigation bg-color="custom-color" height="56">
    <v-spacer/>
    <v-btn :to="{name: 'ActiveTask'}" stacked>
        <v-icon>mdi-wrench</v-icon>
        <span class="text-caption pt-1">Actieve taak</span>
    </v-btn>
    <v-btn stacked>
        <v-icon>mdi-magnify</v-icon>
        <span class="text-caption pt-1">Zoeken</span>
    </v-btn>
    <v-btn :to="{name: 'Information'}" stacked>
        <v-icon>mdi-information</v-icon>
        <span class="text-caption pt-1">Informatie</span>
    </v-btn>
    <v-spacer/>
</v-bottom-navigation>
</template>

<script setup>

</script>