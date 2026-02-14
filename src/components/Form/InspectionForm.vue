<script setup>
import { reactive, ref } from 'vue'
import { useInspectionStore } from '@/stores/inspection'
import DamageForm from "./DamageForm.vue"
import OverdueForm from "./OverdueForm.vue"
import TechForm from "./TechForm.vue"
import ModForm from './ModForm.vue'

const store = useInspectionStore()

const defaultInspection = {
  Location: '',
  Date: new Date().toISOString().slice(0, 10),
  Damage: [{
    Location: '',
    DamageNew: false,
    Type: '',
    Date: '',
    Acute: false,
    Description: '',
    Pictures: []
  }],
  OverdueMaintenance: [{
    Location: '',
    Type: '',
    Acute: false,
    CostIndication: '',
    Pictures: []
  }],
  TechnicalInstallations: [{
    Location: '',
    Type: '',
    Errors: '',
    TestProcedure: [],
    Approved: false,
    Remarks: '',
    Pictures: []
  }],
  Modifications: [{
    Documentation: [],
    Location: '',
    ExecutedBy: '',
    Description: '',
    Action: '',
    Remarks: '',
    Pictures: []
  }]
}


function submitForm() {
  const copy = {
    ...inspection,
    Damage: inspection.Damage.map(d => ({
      ...d,
      Pictures: [...d.Pictures]
    })),
    OverdueMaintenance: inspection.OverdueMaintenance.map(o => ({
      ...o,
      Pictures: [...o.Pictures]
    })),
    TechnicalInstallations: inspection.TechnicalInstallations.map(t => ({
      ...t,
      TestProcedure: [...t.TestProcedure],
      Pictures: [...t.Pictures]
    })),
    Modifications: inspection.Modifications.map(m => ({
      ...m,
      Documentation: [...m.Documentation],
      Pictures: [...m.Pictures]
    }))
  }

  store.addInspection(copy)
  resetForm()
}

function resetForm() {
  Object.assign(inspection, JSON.parse(JSON.stringify(defaultInspection)))
}

const damagePanel = ref([])
const overduePanel = ref([])
const techPanel = ref([])
const modPanel = ref([])

const inspection = reactive(JSON.parse(JSON.stringify(defaultInspection)))
</script>

<template>
  <div v-if="store.loadingAction">
    <v-skeleton-loader
      type="list-item-two-line"
      class="mb-2"
      v-for="n in 6"
      :key="n"
    />
  </div>

  <v-container v-else>

    <h2>Inspectie Formulier</h2>

    <!-- BASIC -->
    <v-text-field label="Locatie" v-model="inspection.Location" />
    <v-text-field label="Datum" type="date" v-model="inspection.Date" />

    <!-- Schade -->
    <v-expansion-panels v-model="damagePanel" class="mb-4">
      <v-expansion-panel value="damage">
        <v-expansion-panel-title>Schade</v-expansion-panel-title>
        <v-expansion-panel-text>
          <DamageForm v-model="inspection.Damage[0]" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Achterstallig -->
    <v-expansion-panels v-model="overduePanel" class="mb-4">
      <v-expansion-panel value="overdue">
        <v-expansion-panel-title>Achterstallig Onderhoud</v-expansion-panel-title>
        <v-expansion-panel-text>
          <OverdueForm v-model="inspection.OverdueMaintenance[0]" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Technisch -->
    <v-expansion-panels v-model="techPanel" class="mb-4">
      <v-expansion-panel value="tech">
        <v-expansion-panel-title>Technische installaties</v-expansion-panel-title>
        <v-expansion-panel-text>
          <TechForm v-model="inspection.TechnicalInstallations[0]" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Modificaties -->
    <v-expansion-panels v-model="modPanel" class="mb-4">
      <v-expansion-panel value="mod">
        <v-expansion-panel-title>Modificaties</v-expansion-panel-title>
        <v-expansion-panel-text>
          <ModForm v-model="inspection.Modifications[0]" />
          
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Opslaan -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-btn 
        color="custom-color" 
        @click="submitForm"
        :loading="store.loadingAction">
          Opslaan
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

