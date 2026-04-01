export function createInspection(data) {
  return {
    Id: data.Id || data.id,
    Location: data.Location,
    Date: data.Date,
    Status: data.Status,
    Damage: data.Damage?.map(d => ({
      Location: d.Location,
      DamageNew: d.DamageNew,
      Type: d.Type,
      Date: d.Date,
      Acute: d.Acute,
      Description: d.Description,
      Pictures: d.Pictures ?? []
    })) ?? [],

    OverdueMaintenance: data.OverdueMaintenance?.map(a => ({
      Location: a.Location,
      Type: a.Type,
      Acute: a.Acute,
      CostIndication: a.CostIndication,
      Pictures: a.Pictures ?? []
    })) ?? [],

    TechnicalInstallations: data.TechnicalInstallations?.map(t => ({
      Location: t.Location,
      Type: t.Type,
      Errors: t.Errors,
      TestProcedure: t.TestProcedure ?? [],
      Approved: t.Approved,
      Remarks: t.Remarks,
      Pictures: t.Pictures ?? []
    })) ?? [],

    Modifications: data.Modifications?.map(m => ({
      Documentation: m.Documentation ?? [],
      Location: m.Location,
      ExecutedBy: m.ExecutedBy,
      Description: m.Description,
      Action: m.Action,
      Remarks: m.Remarks,
      Pictures: m.Pictures ?? []
    })) ?? []
  }
}
