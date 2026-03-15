<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-btn
      v-bind="props"
      icon
      :size="size"
      :class="[
        isHovering ? 'bg-white text-custom-color' : 'bg-custom-color',
        'rounded-circle', 'ma-2'
      ]"
      @click="goBack"
    >
      <v-icon :size="iconSize">mdi-arrow-left</v-icon>
    </v-btn>
  </v-hover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const router = useRouter()
const { xs, sm } = useDisplay()

const size = xs.value ? 25 : (sm.value ? 35 : 40)
const iconSize = xs.value ? 20 : (sm.value ? 30 : 30)

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'Home' })
  }
}
</script>
