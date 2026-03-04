export const defaultInspection = {
  Location: '',
  Date: new Date().toISOString().slice(0, 10),
  Damage: [{
    Location: '',
    DamageNew: false,
    Type: '',
    Date: '',
    Acute: false,
    Description: '',
    Pictures: []
  }],
  OverdueMaintenance: [{
    Location: '',
    Type: '',
    Acute: false,
    CostIndication: '',
    Pictures: []
  }],
  TechnicalInstallations: [{
    Location: '',
    Type: '',
    Errors: '',
    TestProcedure: [],
    Approved: false,
    Remarks: '',
    Pictures: []
  }],
  Modifications: [{
    Documentation: [],
    Location: '',
    ExecutedBy: '',
    Description: '',
    Action: '',
    Remarks: '',
    Pictures: []
  }]
}