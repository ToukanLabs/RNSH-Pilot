export const initialState = {
  ui: {
    sidemenuVisibility: 'expanded'
  },
  patients: [
    {
      id: 1,
      mrn: 2345237,
      dob: '12/02/1964',
      name: 'Raphael Trueman',
      address: `95 Wallum Court
    TYALGUM NSW 2484`,
      phone: '(02) 9372 4355',
      email: 'raphael.trueman@rnsh.pilot.com',
      gender: 'M'
    },
    {
      id: 2,
      mrn: 2349675,
      dob: '12/02/1964',
      name: 'Jon Ingram',
      address: `89 Larissa Court
    COWANGIE VIC 3506`,
      phone: '(02) 9372 6785',
      email: 'jon.ingram@rnsh.pilot.com',
      gender: 'M'
    },
    {
      id: 3,
      mrn: 9876345,
      dob: '12/02/1964',
      name: 'Anabelle Elliott',
      address: `35 Patton Street
    KOOYONG VIC 3144`,
      phone: '(02) 9372 2342',
      email: 'anabelle.elliott@rnsh.pilot.com',
      gender: 'F'
    },
    {
      id: 4,
      mrn: 3456234,
      dob: '12/02/1964',
      name: 'Gary Earl',
      address: `15 Mendooran Road
    CUMBOOGLE NSW 2830`,
      phone: '(02) 9372 4567',
      email: 'gary.earl@rnsh.pilot.com',
      gender: 'M'
    },
    {
      id: 5,
      mrn: 1276543,
      dob: '12/02/1964',
      name: 'Madonna Dawson',
      address: `83 Inglewood Court
    PASTORIA VIC 3444`,
      phone: '(02) 9372 6234',
      email: 'madonna.dawson@rnsh.pilot.com',
      gender: 'F'
    },
    {
      id: 6,
      mrn: 3456734,
      dob: '12/02/1964',
      name: 'Felix Sudworth',
      address: `10 Carolina Park Road
    PATONGA NSW 2256`,
      phone: '(02) 9372 5555',
      email: 'felix.sudworth@rnsh.pilot.com',
      gender: 'M'
    },
    {
      id: 7,
      mrn: 3334526,
      dob: '12/02/1964',
      name: 'Bill Snoogie',
      address: `45 Farrar Parade
    JURIEN BAY WA 6516`,
      phone: '(02) 9372 3335',
      email: 'bill.snoogie@rnsh.pilot.com',
      gender: 'M'
    },
    {
      id: 8,
      mrn: 3452777,
      dob: '12/02/1964',
      name: 'Lenora Christians',
      address: `61 Eungella Road
    HOME HILL QLD 4806`,
      phone: '(02) 9372 9000',
      email: 'lenora.christians@rnsh.pilot.com',
      gender: 'F'
    },
    {
      id: 9,
      mrn: 3334521,
      dob: '12/02/1964',
      name: 'Karlene Cotterill',
      address: `51 Savages Road
    PARKINSON QLD 4115`,
      phone: '(02) 9372 0078',
      email: 'karlene.cotterill@rnsh.pilot.com',
      gender: 'F'
    },
    {
      id: 10,
      mrn: 9878776,
      dob: '12/02/1964',
      name: 'Kelcey Walker',
      address: `85 Zipfs Road
    FLINDERS VIEW QLD 4305`,
      phone: '(02) 9372 6745',
      email: 'kelcey.walker@rnsh.pilot.com',
      gender: 'F'
    }
  ],
  graphs: [
    {
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
    {
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
    },
    {
      'name': 'androgen',
      'displayName': 'Androgen',
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