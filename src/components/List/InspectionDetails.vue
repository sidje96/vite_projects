<script setup>
import { computed } from 'vue'
import DamageList from './DamageList.vue'
import OverdueList from './OverdueList.vue'
import TechnicalList from './TechnicalList.vue'
import ModificationsList from './ModificationsList.vue'
import { useDate } from '@/composables/useDate'

const { formatDate } = useDate()

const inspection = defineModel('inspection')

function clear() {
  inspection.value = null
}

function hasContent(arr, fields) {
  return arr?.some(item =>
    fields.some(f => {
      const value = item[f]
      return Array.isArray(value) ? value.length > 0 : !!value
    })
  )
}

const sections = computed(() => {
  if (!inspection.value) return []

  const i = inspection.value

  return [
    {
      title: 'Schade',
      component: DamageList,
      key: 'Damage',
      visible: hasContent(i.Damage, [
        'Location', 'DamageNew', 'Type', 'Date', 'Acute', 'Description', 'Pictures'
      ])
    },
    {
      title: 'Achterstallig onderhoud',
      component: OverdueList,
      key: 'OverdueMaintenance',
      visible: hasContent(i.OverdueMaintenance, [
        'Location', 'Type', 'Acute', 'CostIndication', 'Pictures'
      ])
    },
    {
      title: 'Technische installaties',
      component: TechnicalList,
      key: 'TechnicalInstallations',
      visible: hasContent(i.TechnicalInstallations, [
        'Location', 'Type', 'Errors', 'TestProcedure', 'Approved', 'Remarks', 'Pictures'
      ])
    },
    {
      title: 'Modificaties',
      component: ModificationsList,
      key: 'Modifications',
      visible: hasContent(i.Modifications, [
        'Documentation', 'Location', 'ExecutedBy', 'Description', 'Action', 'Remarks', 'Pictures'
      ])
    }
  ]
})
</script>

<template>
  <v-col cols="12" md="6">
    <div v-if="inspection">
      <v-sheet class="d-flex justify-space-between">
        <h3 class="text-custom-color mb-4">Inspectie details</h3>
        <v-btn @click="clear" icon density="comfortable">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-sheet>

      <v-list>
        <v-list-item>
          <v-row no-gutters class="w-100">
            <v-col cols="12" md="4">
              <strong class="text-custom-color">Locatie:</strong>
            </v-col>
            <v-col cols="12" md="8" class="text-md-right">
              {{ inspection.Location }}
            </v-col>
          </v-row>
        </v-list-item>

        <v-list-item>
          <v-row no-gutters class="w-100">
            <v-col cols="12" md="4">
              <strong class="text-custom-color">Datum</strong>
            </v-col>
            <v-col cols="12" md="8" class="text-md-right">
              {{ formatDate(inspection.Date) }}
            </v-col>
          </v-row>
        </v-list-item>

        <template v-for="section in sections" :key="section.title">
          <component
            v-if="section.visible"
            :is="section.component"
            v-model="inspection[section.key]"
            class="border-md border-custom-color"
          />
        </template>
      </v-list>
    </div>

    <div v-else class="text-grey d-none d-md-block">
      Selecteer een inspectie voor details
    </div>
  </v-col>
</template>
