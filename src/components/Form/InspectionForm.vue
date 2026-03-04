<script setup>
import { ref, computed, watch } from 'vue'
import { useInspectionStore } from '@/stores/inspection'
import DamageForm from "./DamageForm.vue"
import OverdueForm from "./OverdueForm.vue"
import TechForm from "./TechForm.vue"
import ModForm from './ModForm.vue'
import router from '@/router'
import { defaultInspection } from '@/models/defaultInspection'

const store = useInspectionStore()

const isEdit = computed(() => !!store.currentInspection)
const required = v => !!v || 'Dit veld is verplicht'
const form = ref(null)

async function submitForm() {
  const { valid } = await form.value.validate()

  if (!valid) {
    return
  }

  const insp = inspection.value

  const copy = {
    ...insp,
    Damage: insp.Damage.map(d => ({
      ...d,
      Pictures: [...d.Pictures]
    })),
    OverdueMaintenance: insp.OverdueMaintenance.map(o => ({
      ...o,
      Pictures: [...o.Pictures]
    })),
    TechnicalInstallations: insp.TechnicalInstallations.map(t => ({
      ...t,
      TestProcedure: [...t.TestProcedure],
      Pictures: [...t.Pictures]
    })),
    Modifications: insp.Modifications.map(m => ({
      ...m,
      Documentation: [...m.Documentation],
      Pictures: [...m.Pictures]
    }))
  }

  if (isEdit.value) {
    store.updateInspection(copy)
    router.push({ name: 'Completed' })
  } else {
    store.addInspection(copy)
  }

resetForm()

}

function resetForm() {
  store.currentInspection = null
  store.setFormInspection(JSON.parse(JSON.stringify(defaultInspection)))
}

function cancelForm() {
  resetForm()
  router.push( { name: 'Scheduled' })
}

const damagePanel = ref([])
const overduePanel = ref([])
const techPanel = ref([])
const modPanel = ref([])

const inspection = computed(() => store.formInspection) 

watch(
  () => store.currentInspection,
  (value) => {
    if (value) {
      store.setFormInspection(JSON.parse(JSON.stringify(value)))
    } else {
      store.setFormInspection(JSON.parse(JSON.stringify(defaultInspection)))
    }
  },
  { immediate: true }
)
</script>

<template>
  <v-overlay class="d-flex justify-center align-center" :model-value="store.loadingAction">
    <div>
      <v-progress-circular
      size="100"
      color="custom-color"
      indeterminate
      />
    </div>
  </v-overlay>

  <v-container>

    <h2>Inspectie Formulier</h2>

    <h3>{{ isEdit ? 'Inspectie bewerken:' : 'Nieuwe inspectie:' }}</h3>

    <!-- BASIC -->
    <v-form ref="form" validate-on="submit">
      <v-text-field label="Locatie" v-model="inspection.Location" :rules="[required]"/>
      <v-text-field label="Datum" type="date" v-model="inspection.Date" :rules="[required]"/>

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
    </v-form>
    <!-- Opslaan -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-btn 
        color="custom-color" 
        @click="submitForm"
        :loading="store.loadingAction">
          Opslaan
        </v-btn>
        <v-btn
        class="mx-4"
        color="warning"
        @click="cancelForm"
        :loading="store.loadingAction">
          Cancel
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

