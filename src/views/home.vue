<template>
    <v-main>
        <v-container class="bg">
            <v-row>
                <v-col cols="6">
                    <v-btn block :to="{ name: 'Scheduled' }" stacked class="fill">
                        <v-icon class="mt-1" size="85">mdi-bookmark-outline</v-icon>
                        <span class="text-caption mt-1">Scheduled</span>
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn block :to="{ name: 'Completed' }" stacked class="fill">
                        <v-icon class="mt-1" size="85">mdi-check-circle</v-icon>
                        <span class="text-caption mt-1">Completed</span>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn block :to="{ name: 'KnowledgeBase' }" stacked class="fill">
                        <v-icon class="mt-1" size="85">mdi-apps</v-icon>
                        <span class="text-caption mt-1">Knowledge base</span>
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn block :to="{ name: 'settings' }" stacked class="fill">
                        <v-icon class="mt-1" size="85">mdi-cog</v-icon>
                        <span class="text-caption mt-1">Settings</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>

</script>

<style scoped>
.bg {
    height: 500px;
}

.v-row {
    height: 200px;
}

.fill {
    min-height: 100%;
}

.text-caption {
    font-size: .65rem !important;
}
</style>