<template>
    <v-sheet class="d-flex justify-center align-center" min-height="100%">
        <v-btn 
            @click="dialog = true"
            text="Add inspection"
        />
        <v-btn :to="{ name: 'Completed' }">Go to Completed</v-btn>
    </v-sheet>
    <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    :fullscreen="$vuetify.display.smAndDown"
    >
        <v-btn
        icon="mdi-close"
        @click="dialog = false"
        />
        <InspectionForm/>  
    </v-dialog>   
</template>

<script setup>
  import { ref } from 'vue'
  import InspectionForm from '../components/InspectionForm.vue'

  const rules = [value => checkApi(value)]

  const dialog = ref(false)

  const loading = ref(false)

  async function submit (event) {
    loading.value = true
    const results = await event
    loading.value = false
    alert(JSON.stringify(results, null, 2))
  }

  let timeout = -1
  async function checkApi (userName) {
    return new Promise(resolve => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        if (!userName) return resolve('Please enter a user name.')
        if (userName === 'johnleider') return resolve('User name already taken. Please try another one.')
        return resolve(true)
      }, 1000)
    })
  }
</script>