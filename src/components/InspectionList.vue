<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchInspections } from '@/services/InspectionService.js'
import InspectionDetail from '@/components/InspectionDetail.vue'

const inspections = ref([])
const selectedInspection = ref(null)

const sortedInspections = computed(() =>
  [...inspections.value].sort((a, b) =>
    a.inspectionDate < b.inspectionDate ? 1 : -1
  )
)

onMounted(async () => {
  inspections.value = await fetchInspections()
})

function selectInspection(inspection) {
  selectedInspection.value = inspection
}
</script>

<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12" md="6">
        <h2 class="text-h5 font-weight-bold mb-4 text-custom-color">Inspections</h2>

        <v-list>
          <v-list-item
            v-for="inspection in sortedInspections"
            :key="inspection.id"
            @click="selectInspection(inspection)"
            :active="inspection.id === selectedInspection?.id"
            class="text-custom-color">
            <v-list-item-title>
              {{ inspection.inspectionDate }} - {{ inspection.propertyId }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ inspection.status }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="6">
        <InspectionDetail
          v-if="selectedInspection"
          :inspection="selectedInspection"
        />
      </v-col>
    </v-row>
  </v-container>
</template>