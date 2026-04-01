import { useInspectionStore } from '@/stores/inspection'
import { ref } from 'vue'
import { UPLOAD_URL, CLOUDINARY_PRESET } from "@/config"

export function useInspectionSubmit() {
  const store = useInspectionStore()
  const loading = ref(false)

  async function uploadFile(file) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", CLOUDINARY_PRESET)

    const res = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData
      }
    )

    const data = await res.json()
    return data.secure_url
  }


  async function processPictures(list) {
    const result = []

    for (const item of list) {
      if (item instanceof File) {
        const url = await uploadFile(item)
        result.push(url)
      } else {
        result.push(item)
      }
    }

    return result
  }

  async function prepareInspection(insp) {
    const copy = JSON.parse(JSON.stringify(insp))

    for (let i = 0; i < insp.Damage.length; i++) {
      copy.Damage[i].Pictures = await processPictures(insp.Damage[i].Pictures || [])
    }

    for (let i = 0; i < insp.OverdueMaintenance.length; i++) {
      copy.OverdueMaintenance[i].Pictures = await processPictures(insp.OverdueMaintenance[i].Pictures || [])
    }

    for (let i = 0; i < insp.TechnicalInstallations.length; i++) {
      copy.TechnicalInstallations[i].Pictures = await processPictures(insp.TechnicalInstallations[i].Pictures || [])
    }

    for (let i = 0; i < insp.Modifications.length; i++) {
      copy.Modifications[i].Pictures = await processPictures(insp.Modifications[i].Pictures || [])
      copy.Modifications[i].Documentation = await processPictures(insp.Modifications[i].Documentation || [])
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
