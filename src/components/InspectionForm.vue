<template>  
    <v-sheet class="mx-auto my-auto" width="300">
        <v-form fast-fail class="my-2" validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field
            v-for="field in fields" 
            :key="field.key"
            v-model="form[field.key]"
            :label="field.label"
            :type="field.type"
            :rules="rules"  
            :hint="field.hint || null"         
            class="text-custom-color"
        ></v-text-field>
        <v-btn
            :loading="loading"
            class="my-2 text-custom-color"
            text="Submit"
            type="submit"
            block
        ></v-btn>
        </v-form>
    </v-sheet>
</template>

<script setup>
  import { reactive, ref } from 'vue'

  const rules = [value => checkApi(value)]

  const form = reactive({
    id: "",
    inspectionDate: "",
    propertyId: "",
    inspectorName: "",
    status: "",
    summary: ""
  })
  
  const fields = [
  { key: 'id', label: 'id', type: 'text' },
  { key: 'inspectionDate', label: 'Inspection Date', type: 'date' },
  { key: 'propertyId', label: 'property id', type: 'text', hint: "AB-1234"},
  { key: 'inspectorName', label: 'Inspector name', type: 'text'},
  { key: 'status', label: 'status', type: 'text'},
  { key: 'summary', label: 'summary', type: 'text'}
]
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