import { createInspection } from '@/models/Inspections.js'

const BASE_URL = 'http://localhost:3000/'

export async function fetchInspections() {
  const response = await fetch(BASE_URL + "inspections")
  if (!response.ok) {
    throw new Error('Failed to fetch inspections')
  }

  const data = await response.json()
  return data.map(item => createInspection(item))
}
