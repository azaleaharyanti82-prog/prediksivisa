// Data Pasaran
const PASARAN = {
  PAGI: [
    { id: 1, name: 'CAROLINA EVE' },
    { id: 2, name: 'ECUADOR' },
    { id: 3, name: 'AUSTRIA' },
    { id: 4, name: 'CAMBODIA' },
    { id: 5, name: 'FOSHAN' },
    { id: 6, name: 'OREGON 12' },
    { id: 7, name: 'CHILE' },
    { id: 8, name: 'LAOS' },
    { id: 9, name: 'BULLSEYE' },
    { id: 10, name: 'TOTOMACAU 4D P1' },
    { id: 11, name: 'SYDNEY' },
    { id: 12, name: 'CHENGDU' },
    { id: 13, name: 'GUANGDONG' },
    { id: 14, name: 'TOTOMACAU 5D P1' },
    { id: 15, name: 'CHINA' },
    { id: 16, name: 'CHONGQING' },
    { id: 17, name: 'TOTOMACAU 4D P2' },
    { id: 18, name: 'PHILIPPINES' },
    { id: 19, name: 'KINGKONG P1' },
    { id: 20, name: 'JAPAN' },
    { id: 21, name: 'KOWLOON' },
    { id: 22, name: 'SINGAPORE' },
    { id: 23, name: 'JEJU LOTTO' },
    { id: 24, name: 'TOTO BEIJING' },
    { id: 25, name: 'TOTOMACAU 4D P3' },
    { id: 26, name: 'TOTO FUZHOU' },
    { id: 27, name: 'CYPRUS' },
    { id: 28, name: 'TAIWAN' },
    { id: 29, name: 'TAICHUNG' },
    { id: 30, name: 'MEXICO' },
    { id: 31, name: 'TOTOMACAU 5D P2' },
    { id: 32, name: 'ICELAND' },
    { id: 33, name: 'OSLO' },
    { id: 34, name: 'TOTOMACAU 4D P4' }
  ],
  MALAM: [
    { id: 35, name: 'BHUTAN' },
    { id: 36, name: 'HAITI' },
    { id: 37, name: 'HONGKONG' },
    { id: 38, name: 'TOTOMACAU 4D P5' },
    { id: 39, name: 'KINGKONG P2' },
    { id: 40, name: 'DENVER' },
    { id: 41, name: 'TORONTO' },
    { id: 42, name: 'TOTOMACAU 4D P6' },
    { id: 43, name: 'KENTUCKY MID' },
    { id: 44, name: 'ROMA' },
    { id: 45, name: 'FLORIDA MID' },
    { id: 46, name: 'MONACO' },
    { id: 47, name: 'NEWYORK MID' },
    { id: 48, name: 'TURIN' },
    { id: 49, name: 'ITALY' },
    { id: 50, name: 'CAROLINA DAY' },
    { id: 51, name: 'CUBA' },
    { id: 52, name: 'FRANCE' },
    { id: 53, name: 'MADRID' },
    { id: 54, name: 'OREGON 03' },
    { id: 55, name: 'BULGARIA' },
    { id: 56, name: 'HUNGARY' },
    { id: 57, name: 'MIAMI' },
    { id: 58, name: 'OREGON 06' },
    { id: 59, name: 'CALIFORNIA' },
    { id: 60, name: 'FLORIDA EVE' },
    { id: 61, name: 'OREGON 09' },
    { id: 62, name: 'NEWYORK EVE' },
    { id: 63, name: 'KENTUCKY EVE' }
  ]
};

// Tabel SHIO - mapping 2 digit pertama BBFS ke nama SHIO
const SHIO_TABLE = {
  '01': 'Kuda', '13': 'Kuda', '25': 'Kuda', '37': 'Kuda', '49': 'Kuda', '61': 'Kuda', '73': 'Kuda', '85': 'Kuda', '97': 'Kuda',
  '02': 'Ular', '14': 'Ular', '26': 'Ular', '38': 'Ular', '50': 'Ular', '62': 'Ular', '74': 'Ular', '86': 'Ular', '98': 'Ular',
  '03': 'Naga', '15': 'Naga', '27': 'Naga', '39': 'Naga', '51': 'Naga', '63': 'Naga', '75': 'Naga', '87': 'Naga', '99': 'Naga',
  '04': 'Kelinci', '16': 'Kelinci', '28': 'Kelinci', '40': 'Kelinci', '52': 'Kelinci', '64': 'Kelinci', '76': 'Kelinci', '88': 'Kelinci', '00': 'Kelinci',
  '05': 'Harimau', '17': 'Harimau', '29': 'Harimau', '41': 'Harimau', '53': 'Harimau', '65': 'Harimau', '77': 'Harimau', '89': 'Harimau',
  '06': 'Kerbau', '18': 'Kerbau', '30': 'Kerbau', '42': 'Kerbau', '54': 'Kerbau', '66': 'Kerbau', '78': 'Kerbau', '90': 'Kerbau',
  '07': 'Tikus', '19': 'Tikus', '31': 'Tikus', '43': 'Tikus', '55': 'Tikus', '67': 'Tikus', '79': 'Tikus', '91': 'Tikus',
  '08': 'Babi', '20': 'Babi', '32': 'Babi', '44': 'Babi', '56': 'Babi', '68': 'Babi', '80': 'Babi', '92': 'Babi',
  '09': 'Anjing', '21': 'Anjing', '33': 'Anjing', '45': 'Anjing', '57': 'Anjing', '69': 'Anjing', '81': 'Anjing', '93': 'Anjing',
  '10': 'Ayam', '22': 'Ayam', '34': 'Ayam', '46': 'Ayam', '58': 'Ayam', '70': 'Ayam', '82': 'Ayam', '94': 'Ayam',
  '11': 'Monyet', '23': 'Monyet', '35': 'Monyet', '47': 'Monyet', '59': 'Monyet', '71': 'Monyet', '83': 'Monyet', '95': 'Monyet',
  '12': 'Kambing', '24': 'Kambing', '36': 'Kambing', '48': 'Kambing', '60': 'Kambing', '72': 'Kambing', '84': 'Kambing', '96': 'Kambing'
};

// Font styles untuk text di gambar
const FONTS = {
  BBFS: {
    fontFamily: 'Times New Roman MT',
    fontStyle: 'bold',
    fontSize: 29.2,
    color: '#ffd42e'
  },
  ANGKA_MAIN: {
    fontFamily: 'Times New Roman MT',
    fontStyle: 'bold',
    fontSize: 27.9,
    color: '#ffd42e'
  },
  COLOK_BEBAS: {
    fontFamily: 'Times New Roman MT',
    fontStyle: 'bold',
    fontSize: 34,
    color: '#ffd42e'
  },
  COLOK_BEBAS_SEPARATOR: {
    fontFamily: 'Canva Sans',
    fontSize: 34,
    color: '#ffd42e'
  },
  DIMENSIONAL: {
    fontFamily: 'Times New Roman MT',
    fontStyle: 'bold',
    fontSize: 25.2,
    color: '#ffd42e'
  },
  BUKU_MIMPI: {
    fontFamily: 'Canva Sans',
    fontSize: 9.7,
    color: '#ffffff'
  }
};

module.exports = {
  PASARAN,
  SHIO_TABLE,
  FONTS
};
