const axios = require('axios');

exports = Object.assign(exports, {getActual});

const wmUrl = 'https://www.openligadb.de/api/getmatchdata/wmrussland';

// Ligaid =  4220
// LigaShortcut = wmrussland

function getActual() {
  axios.get(wmUrl)
    .then(function (response) {
      console.log(JSON.stringify(response.data, null, 2));
    })
    .catch(function (error) {
      console.log(error);
    });
}
