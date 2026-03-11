import { fileToBase64 } from '@/composables/fileToBase64'
import { useInspectionStore } from '@/stores/inspection'
import { ref } from 'vue'

export function useInspectionSubmit() {
  const store = useInspectionStore()
  const loading = ref(false)

  async function convertPicturesToBase64(list) {
    return Promise.all(list.map(file => fileToBase64(file)))
  }

  async function prepareInspection(insp) {
    const copy = JSON.parse(JSON.stringify(insp))

    for (let i = 0; i < insp.Damage.length; i++) {
      const original = insp.Damage[i]
      copy.Damage[i].Pictures = await convertPicturesToBase64(original.Pictures || [])
    }

    for (let i = 0; i < insp.OverdueMaintenance.length; i++) {
      const original = insp.OverdueMaintenance[i]
      copy.OverdueMaintenance[i].Pictures = await convertPicturesToBase64(original.Pictures || [])
    }

    for (let i = 0; i < insp.TechnicalInstallations.length; i++) {
      const original = insp.TechnicalInstallations[i]
      copy.TechnicalInstallations[i].Pictures = await convertPicturesToBase64(original.Pictures || [])
    }

    for (let i = 0; i < insp.Modifications.length; i++) {
      const original = insp.Modifications[i]

      copy.Modifications[i].Documentation = await Promise.all(
        (original.Documentation || []).map(file => fileToBase64(file))
      )


      copy.Modifications[i].Pictures = await convertPicturesToBase64(original.Pictures || [])
    }

    return copy
  }

  async function submitInspection(insp, isEdit) {
    loading.value = true

    const prepared = await prepareInspection(insp)

    if (isEdit) {
      await store.updateInspection(prepared)
    } else {
      await store.addInspection(prepared)
    }

    loading.value = false
  }

  return {
    submitInspection,
    loading
  }
}
