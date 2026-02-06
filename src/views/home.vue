<template>
    <v-main>
        <v-container>
            <v-row rows="2">
                <v-col sm="6">
                    <v-btn :to="{ name: 'add-report' }" stacked>
                        <v-icon class="mt-1">mdi-file-document-plus</v-icon>
                        <span class="text-caption mt-1">Add report</span>
                    </v-btn>
                </v-col>
                <v-col sm="6">
                    <v-btn :to="{ name: 'reports' }" stacked>
                        <v-icon class="mt-1">mdi-file-document-multiple</v-icon>
                        <span class="text-caption mt-1">Reports</span>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row rows="2">
                <v-col sm="6">
                    <v-btn :to="{ name: 'documentation' }" stacked>
                        <v-icon class="mt-1">mdi-information</v-icon>
                        <span class="text-caption mt-1">Documentation</span>
                    </v-btn>
                </v-col>
                <v-col sm="6">
                    <v-btn :to="{ name: 'settings' }" stacked>
                        <v-icon class="mt-1">mdi-cog</v-icon>
                        <span class="text-caption mt-1">Settings</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>

</script>