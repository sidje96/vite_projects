<template>
    <v-container height="100%">
        <v-row>
            <v-col cols="6">
                <v-btn block :to="{ name: 'Scheduled' }" stacked>
                    <v-icon class="mt-1" size="80">mdi-bookmark-outline</v-icon>
                    <span class="textstyle text-sm-body-2 text-md-h6">Gepland</span>
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn block :to="{ name: 'Completed' }" stacked>
                    <v-icon class="mt-1" size="80">mdi-check-circle</v-icon>
                    <span class="textstyle text-sm-body-2 text-md-h6">Afgerond</span>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn block :to="{ name: 'KnowledgeBase' }" stacked>
                    <v-icon class="mt-1" size="80">mdi-apps</v-icon>
                    <span class="textstyle text-sm-body-2 text-md-h6">Kennisbase</span>
                </v-btn>
            </v-col>
            <v-col>
                <v-btn block :to="{ name: 'settings' }" stacked>
                    <v-icon class="mt-1" size="80">mdi-cog</v-icon>
                    <span class="textstyle text-sm-body-2 text-md-h6">Instellingen</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

</script>

<style scoped>
.v-btn {
    min-height: 100%;
}

.v-row {
    height: 50%;
}

.v-btn__content .textstyle {
    font-size: .65rem;
}
</style>