<script setup>
const props = defineProps({
  inspection: Object
})

const labelMap = {
  inspectionDate: "Date",
  propertyId: "Property id",
  inspectorName: "Inspector name",
  status: "Status",
  summary: "Summary"
}

</script>

<template>
  <h3 class="text-custom-color">Inspection details</h3>
  <v-list>
    <template v-for="(value, key) in inspection" 
    :key="key">
    <v-list-item v-if="key !== 'id'">
      <v-row no-gutters>
        <v-col cols="12" sm="4">
          
          <v-list-item-title class="text-custom-color">
            <strong>{{ labelMap[key] ?? key }}:</strong>
          </v-list-item-title>
        </v-col>
        <v-col cols="12" sm="8">
          <v-list-item-subtitle>
            {{ value != '' ? value : "Inspection yet to occur" }}
          </v-list-item-subtitle>
        </v-col>
    </v-row>
    </v-list-item>
  </template>
  </v-list>
</template>