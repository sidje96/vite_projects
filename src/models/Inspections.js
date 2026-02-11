export function createInspection(data) {
  return {
    id: data.id,
    inspectionDate: data.inspectionDate,
    propertyId: data.propertyId,
    inspectorName: data.inspectorName,
    status: data.status,
    summary: data.summary
  }
}