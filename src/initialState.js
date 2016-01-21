export const initialState = {
  ui: {
    sidemenuVisibility: 'collapsed'
  },
  patients: {
    activePatient: {},
    searchResults: [
      {
        id: 1,
        mrn: 2345237,
        dob: '1964-02-12T00:00Z',
        name: 'Raphael Trueman',
        address: `95 Wallum Court
      TYALGUM NSW 2484`,
        phone: '(02) 9372 4355',
        email: 'raphael.trueman@rnsh.pilot.com',
        gender: 'M',
        tumorType: 'Prostate',
        surgical: 'Y'
      },
      {
        id: 2,
        mrn: 2349675,
        dob: '1964-02-12T00:00Z',
        name: 'Jon Ingram',
        address: `89 Larissa Court
      COWANGIE VIC 3506`,
        phone: '(02) 9372 6785',
        email: 'jon.ingram@rnsh.pilot.com',
        gender: 'M',
        tumorType: 'Prostate',
        surgical: 'N'
      },
      {
        id: 3,
        mrn: 9876345,
        dob: '1964-02-12T00:00Z',
        name: 'Anabelle Elliott',
        address: `35 Patton Street
      KOOYONG VIC 3144`,
        phone: '(02) 9372 2342',
        email: 'anabelle.elliott@rnsh.pilot.com',
        gender: 'F',
        tumorType: 'CNS',
        surgical: 'Y'
      },
      {
        id: 4,
        mrn: 3456234,
        dob: '1964-02-12T00:00Z',
        name: 'Gary Earl',
        address: `15 Mendooran Road
      CUMBOOGLE NSW 2830`,
        phone: '(02) 9372 4567',
        email: 'gary.earl@rnsh.pilot.com',
        gender: 'M',
        tumorType: 'CNS',
        surgical: 'Y'
      },
      {
        id: 5,
        mrn: 1276543,
        dob: '1964-02-12T00:00Z',
        name: 'Madonna Dawson',
        address: `83 Inglewood Court
      PASTORIA VIC 3444`,
        phone: '(02) 9372 6234',
        email: 'madonna.dawson@rnsh.pilot.com',
        gender: 'F',
        tumorType: 'CNS',
        surgical: 'N'
      },
      {
        id: 6,
        mrn: 3456734,
        dob: '1964-02-12T00:00Z',
        name: 'Felix Sudworth',
        address: `10 Carolina Park Road
      PATONGA NSW 2256`,
        phone: '(02) 9372 5555',
        email: 'felix.sudworth@rnsh.pilot.com',
        gender: 'M',
        tumorType: 'CNS',
        surgical: 'Y'
      },
      {
        id: 7,
        mrn: 3334526,
        dob: '1964-02-12T00:00Z',
        name: 'Bill Snoogie',
        address: `45 Farrar Parade
      JURIEN BAY WA 6516`,
        phone: '(02) 9372 3335',
        email: 'bill.snoogie@rnsh.pilot.com',
        gender: 'M',
        tumorType: 'Prostate',
        surgical: 'N'
      },
      {
        id: 8,
        mrn: 3452777,
        dob: '1964-02-12T00:00Z',
        name: 'Lenora Christians',
        address: `61 Eungella Road
      HOME HILL QLD 4806`,
        phone: '(02) 9372 9000',
        email: 'lenora.christians@rnsh.pilot.com',
        gender: 'F',
        tumorType: 'CNS',
        surgical: 'Y'
      },
      {
        id: 9,
        mrn: 3334521,
        dob: '1964-02-12T00:00Z',
        name: 'Karlene Cotterill',
        address: `51 Savages Road
      PARKINSON QLD 4115`,
        phone: '(02) 9372 0078',
        email: 'karlene.cotterill@rnsh.pilot.com',
        gender: 'F',
        tumorType: 'CNS',
        surgical: 'Y'
      },
      {
        id: 10,
        mrn: 9878776,
        dob: '1964-02-12T00:00Z',
        name: 'Kelcey Walker',
        address: `85 Zipfs Road
      FLINDERS VIEW QLD 4305`,
        phone: '(02) 9372 6745',
        email: 'kelcey.walker@rnsh.pilot.com',
        gender: 'F',
        tumorType: 'CNS',
        surgical: 'Y'
      },
      {
        id: 11,
        mrn: 9874521,
        dob: '1964-02-12T00:00Z',
        name: 'Frederick Corkhill',
        address: `23 Bread Road
      EVERTON QLD 4115`,
        phone: '(02) 2342 0078',
        email: 'frederick.corkhill@rnsh.pilot.com',
        gender: 'F',
        tumorType: 'Breast',
        surgical: 'Y'
      },
      {
        id: 12,
        mrn: 8454521,
        dob: '1964-02-12T00:00Z',
        name: 'Simone Redic',
        address: `51 Savages Road
      PARKINSON QLD 4115`,
        phone: '(02) 9372 0078',
        email: 'timothy.redick@rnsh.pilot.com',
        gender: 'F',
        tumorType: 'Breast',
        surgical: 'Y'
      },
      {
        id: 13,
        mrn: 6574521,
        dob: '1964-02-12T00:00Z',
        name: 'Loise Gregory',
        address: `51 Savages Road
      PARKINSON QLD 4115`,
        phone: '(02) 9372 0078',
        email: 'loise.gg@rnsh.pilot.com',
        gender: 'F',
        tumorType: 'Breast',
        surgical: 'Y'
      }
    ]
  },
  graphs: [
    {
      'name': 'psa-testosterone',
      'type': 'dual-plot',
      'left': {
        'name': 'psa',
        'displayName': 'PSA',
        'type': 'line',
        'yAxisLabel': 'ng / mL',
        'data': [
          { 'date': '29-Nov-06', 'data': 2.37 },
          { 'date': '09-Nov-10', 'data': 4.42 },
          { 'date': '21-Jan-11', 'data': 5.18 },
          { 'date': '21-Feb-12', 'data': 11 },
          { 'date': '01-Jul-12', 'data': 1.6 },
          { 'date': '09-Sep-13', 'data': 0.1 },
          { 'date': '23-Feb-15', 'data': 0.1 }
        ]
      },
      'right': {
        'name': 'testosterone',
        'displayName': 'Testosterone',
        'type': 'line',
        'yAxisLabel': 'nmol / L',
        'data': [
          { 'date': '29-Nov-06', 'data': 6.4 },
          { 'date': '09-Nov-10', 'data': 3.0 },
          { 'date': '21-Jan-11', 'data': 1.2 },
          { 'date': '21-Feb-12', 'data': 2.4 },
          { 'date': '01-Jul-12', 'data': 4.8 },
          { 'date': '09-Sep-13', 'data': 5.5 },
          { 'date': '23-Feb-15', 'data': 6.3 }
        ]
      }
    },
    {
      'name': 'androgen',
      'displayName': 'ADT',
      'type': 'timeline',
      'data': [
        { 'start': '24-Jul-12', 'end': '24-Jan-13' }
      ]
    },
    {
      'name': 'radiotherapy',
      'displayName': 'Radiotherapy',
      'type': 'timeline',
      'data': [
        { 'start': '04-Sep-12', 'end': '23-Nov-12' }
      ]
    },
    {
      'name': 'surgery',
      'displayName': 'Surgery',
      'type': 'point',
      'data': [
        { 'date': '14-May-12', 'hoverTitle': 'Prostatectomy' }
      ]
    }
  ]
};
