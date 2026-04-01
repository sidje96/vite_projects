<script setup>
import { onMounted, computed } from 'vue'
import InspectionDetail from './InspectionDetails.vue'
import { useInspectionStore } from '@/stores/inspection'
import { useDate } from '@/composables/useDate.js'
import router from '@/router'
import BackButton from '../BackButton.vue'

const { formatDate } = useDate()

const store = useInspectionStore()

const inspections = computed(() => {
  if (!props.Status) return store.sortedInspections
  return store.inspectionsByStatus(props.Status)
})


const props = defineProps({
  Status: {
    type: String,
    required: false,
    default: null
  }
})

const skeletonCount = computed(() => ({
  Scheduled: store.numberScheduled,
  Completed: store.numberCompleted
}[props.Status] ?? 5)
)

onMounted(() => {
  store.currentInspection = null
  loadInspections()
})

async function loadInspections() {
  if (props.Status) {
    await store.fetchInspectionsByStatus(props.Status)
  } else {
    await store.fetchInspections()
  }
}

function selectInspection(inspection) {
  if (store.currentInspection?.Id === inspection.Id) {
    store.currentInspection = null
  } else {
    store.currentInspection = inspection
  }
}

function editInspection(inspection) {
  store.currentInspection = { ...inspection }
  router.push({ name: 'Form' })
}

function confirmDelete(Id) {
  if (confirm("Weet je zeker dat je deze inspectie wilt verwijderen?")) {
    store.deleteInspection(Id)
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
      type="heading"
    />
    <v-skeleton-loader
      type="list-item-two-line"
      class="mb-2"
      v-for="n in skeletonCount"
      :key="n"
    />
  </div>

  <v-container class="py-6" v-else>
    <v-row>
      <v-col cols="12" md="6">
          <v-sheet class="d-flex align-center ga-4 ma-4">
            <BackButton />
            <h2 class="text-h6 font-weight-bold text-custom-color">{{ Status == "Scheduled" ? 'Ingeplande Inspecties' : 'Afgeronde Inspecties'}}</h2>
            <v-btn size="small" @click="store.toggleSort()">
              Datum 
              <span class="ml-2">
                <v-icon v-if="store.sortAsc">mdi-sort-ascending</v-icon>
                <v-icon v-else>mdi-sort-descending</v-icon>
              </span>
            </v-btn>
          </v-sheet>
        <v-list>
          <v-list-item
            v-for="inspection in inspections"
            :key="inspection.Id"
            @click="selectInspection(inspection)"
            :active="inspection.Id === store.currentInspection?.Id"
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
                @click.stop="confirmDelete(inspection.Id)"
              />
            </template>


          </v-list-item>
        </v-list>
      </v-col>
      <InspectionDetail v-model:inspection="store.currentInspection" />
    </v-row>
  </v-container>
</template>