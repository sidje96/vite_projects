<template>
  <v-bottom-navigation bg-color="custom-color" height="56" class="d-flex justify-center align-center">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" stacked title="App support">
          <v-icon>mdi-cellphone-information</v-icon>
          <span class="text-caption pt-1">App support</span>
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar color="custom-color">
            <v-btn class="text-white mr-4" text="Sluiten" @click="isActive.value = false" />
            <span class="text-h6">Klantenservice</span>
            <v-spacer />
            <v-btn text="Opslaan" @click="closeCustomersupport" />
          </v-toolbar>

          <SupportView />
        </v-card>
      </template>

    </v-dialog>

    <v-snackbar v-model="snackbar" location="top" color="warning" timeout="5000">
      <span>De functionaliteit om een ticket aan de klantenservice te sturen werkt nog niet</span>
      <template v-slot:actions>
        <v-btn
        size="small"
          icon="mdi-close"
          @click="snackbar = false"
        >
        </v-btn>
      </template>
    </v-snackbar>

  </v-bottom-navigation>
</template>

<script setup>
import { ref } from 'vue'
import SupportView from '@/views/Support.vue'

const dialog = ref(false)
const snackbar = ref(false)

function closeCustomersupport() {
  dialog.value = false
  snackbar.value = true
}
</script>
