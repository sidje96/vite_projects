<script setup>
const props = defineProps({
  inspection: Object
})
</script>

<template>
  <section>
    <h3>Inspection details</h3>
    <p><strong>Date:</strong> {{ inspection.inspectionDate }}</p>
    <p><strong>Property:</strong> {{ inspection.propertyId }}</p>
    <p><strong>Inspector:</strong> {{ inspection.inspectorName }}</p>
    <p><strong>Status:</strong> {{ inspection.status }}</p>
    <p><strong>Summary:</strong> {{ inspection.summary }}</p>
  </section>
</template>