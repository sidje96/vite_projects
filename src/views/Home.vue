<template>
    <v-container height="100%">
        <v-row>
            <v-col cols="6">
                <v-btn block :to="{ name: 'Scheduled' }" stacked>
                    <v-badge v-if="numberScheduled > 0" 
                        class="d-block" 
                        location="top right" 
                        offset-x="-25"
                        width="30" 
                        height="30" 
                        rounded="circle" 
                        :content="numberScheduled" 
                        color="custom-color"
                        />                    
                    <v-icon class="mt-1" size="80">mdi-bookmark-outline</v-icon>
                    <span class="textstyle text-sm-body-2 text-md-h6">Gepland</span>
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn block :to="{ name: 'Completed' }" stacked>
                    <v-badge v-if="numberCompleted > 0" 
                        class="d-block" 
                        location="top right" 
                        offset-x="-25" 
                        width="30" 
                        height="30" 
                        rounded="circle" 
                        :content="numberCompleted" 
                        color="custom-color"
                        />
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
                <v-btn block :to="{ name: 'Settings' }" stacked>
                    <v-icon class="mt-1" size="80">mdi-cog</v-icon>
                    <span class="textstyle text-sm-body-2 text-md-h6">Instellingen</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useInspectionStore } from '@/stores/inspection';
import { onMounted, computed } from 'vue';

const store = useInspectionStore()
onMounted(() => {
    store.fetchInspections()
})

const numberCompleted = computed(() =>
  store.sortedInspections.filter(i => i.Status === "Completed").length
)

const numberScheduled = computed(() =>
  store.sortedInspections.filter(i => i.Status === "Scheduled").length
)

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