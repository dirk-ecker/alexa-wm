const axios = require('axios');

exports = Object.assign(exports, {initialise, getWhoPlays, getWhenPlays, getResultOfGame});

const wmUrl = 'https://www.openligadb.de/api/getmatchdata/wmrussland';

// Ligaid =  4220
// LigaShortcut = wmrussland

const result = {
  data: undefined,
  error: undefined
}

function initialise() {
  result.data = axios.get(wmUrl).then(result => {
    const data = result.data
    return data.map(match => {
      const [date, time] = match.MatchDateTime.split('T')
      return {...match, date, time}
    })
  }).catch(error => {
    result.error = error
    console.log(error)
  })
}

async function getWhoPlays(date) {
  date = date || new Date().toISOString().split('T')[0]
  // console.log(date)
  const matches = await result.data
  return matches.filter(match => match.date === date)
}

async function getWhenPlays(team) {
  const matches = await result.data
  return matches.filter(match => match.Team1.TeamName.includes(team) || match.Team2.TeamName.includes(team))
}

async function getResultOfGame(team) {
  const matches = await result.data
  return matches.filter(match => (match.Team1.TeamName.includes(team) || match.Team2.TeamName.includes(team)) && match.MatchIsFinished)
}

