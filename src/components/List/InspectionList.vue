<script setup>
import { ref, onMounted, computed } from 'vue'
import InspectionDetail from './InspectionDetails.vue'
import { useInspectionStore } from '@/stores/inspection'
import { useDate } from '@/composables/useDate.js'
import router from '@/router'

const { formatDate } = useDate()

const store = useInspectionStore()

const sortedInspections = computed(() => store.sortedInspections)

onMounted(async () => {
  await store.fetchInspections()
})


function selectInspection(inspection) {
  if (store.currentInspection?.id === inspection.id) {
    store.currentInspection = null
  } else {
    store.currentInspection = inspection
  }
}

function editInspection(inspection) {
  store.currentInspection = { ...inspection }
  router.push({ name: 'Form' })
}

function confirmDelete(id) {
  if (confirm("Weet je zeker dat je deze inspectie wilt verwijderen?")) {
    store.deleteInspection(id)
  }
}
</script>

<template>
  <v-overlay
    :model-value="store.loadingInitial"
    class="d-flex align-center justify-center"
    persistent
  >
    <v-progress-circular indeterminate size="64" color="custom-color" />
  </v-overlay>
  <div v-if="store.loadingAction || store.loadingInitial">
    <v-skeleton-loader
      type="list-item-two-line"
      class="mb-2"
      v-for="n in sortedInspections.length"
      :key="n"
    />
  </div>

  <v-container class="py-6" v-else>
    <v-row>
      <!-- LEFT SIDE: LIST -->
      <v-col cols="12" md="6">
        <v-row>
          <h2 class="text-h5 font-weight-bold mb-4 text-custom-color">Inspecties</h2>
          <v-spacer/>
          <v-btn size="small" @click="store.toggleSort()">
            Datum 
            <span class="ml-2">
              <v-icon v-if="store.sortAsc">mdi-sort-ascending</v-icon>
              <v-icon v-else>mdi-sort-descending</v-icon>
            </span>
          </v-btn>
          <v-spacer></v-spacer>
        </v-row>

        <v-list>
          <v-list-item
            v-for="inspection in sortedInspections"
            :key="inspection.id"
            @click="selectInspection(inspection)"
            :active="inspection.id === store.currentInspection?.id"
            class="text-custom-color"
          >
            <v-list-item-title class="font-weight-medium">
              {{ inspection.Location }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ formatDate(inspection.Date) }}
            </v-list-item-subtitle>

            <template #append>
              <v-btn
                icon="mdi-pencil"
                color="custom-color"
                variant="text"
                @click.stop="editInspection(inspection)"
              />
              <v-btn
                icon="mdi-delete"
                color="red"
                variant="text"
                :loading="store.loadingAction"
                @click.stop="confirmDelete(inspection.id)"
              />
            </template>


          </v-list-item>
        </v-list>
      </v-col>
      <InspectionDetail v-model:inspection="store.currentInspection" />
    </v-row>
  </v-container>
</template>