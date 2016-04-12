export const initialState = {
  ui: {
    sidemenuVisibility: 'expanded'
  },
  advancedSearch: {
    mrn: '',
    firstname: '',
    surname: '',
  },
  patients: {},
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
          { 'date': '29-Mar-04', 'data': 1.98 },
          { 'date': '16-Sep-05', 'data': 2.12 },
          { 'date': '29-Nov-06', 'data': 2.37 },
          { 'date': '12-Jan-08', 'data': 2.96 },
          { 'date': '03-Feb-09', 'data': 3.99 },
          { 'date': '09-Feb-10', 'data': 4.08 },
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
          { 'date': '29-Mar-04', 'data': 6.1 },
          { 'date': '16-Sep-05', 'data': 6.2 },
          { 'date': '29-Nov-06', 'data': 6.4 },
          { 'date': '12-Jan-08', 'data': 5.5 },
          { 'date': '03-Feb-09', 'data': 4.9 },
          { 'date': '09-Feb-10', 'data': 3.8 },
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
        {
          'id': 1,
          'start': '04-Sep-12',
          'end': '23-Nov-12',
          'dose': 6800,
          'fractions': 34,
          'localisation': 'Bony',
          'lymphNodesTreated': 'Y',
          'LNdose': 5800,
          'LNFractions': 23
        },
        {
          'id': 2,
          'start': '14-Jun-11',
          'end': '12-Sep-11',
          'dose': 5300,
          'fractions': 24,
          'localisation': 'Bony',
          'lymphNodesTreated': 'N',
          'LNdose': '',
          'LNFractions': 0
        }
      ]
    },
    {
      'name': 'surgery',
      'displayName': 'Surgery',
      'type': 'point',
      'data': [
        { 'date': '14-May-12', 'hoverTitle': 'Prostatectomy' }
      ]
    },
    {
      'name': 'imaging',
      'displayName': 'Imaging',
      'type': 'point',
      'data': [
        { 'date': '11-Feb-12', 'hoverTitle': 'MRI' }
      ]
    }
  ]
};
