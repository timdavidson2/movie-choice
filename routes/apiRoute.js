const stateName = document.querySelector('#project-name');
const parkLimit = document.querySelector('#project-funding');
require('dotenv').config();

function apiSearch(stateName, parkLimit) {
  const reqURL = `https://developer.nps.gov/api/v1/parks?stateCode=${stateName}&limit=${parkLimit}&api_key=${process.env.API_NPS}`;
  fetch(reqURL).then((res) => {
    console.log(res);
  });
}
module.exports = apiSearch;
