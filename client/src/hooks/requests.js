const API_URL = 'http://localhost:4000'

async function httpGetPlanets() {
  // const response = await fetch(`${API_URL}/planets`)
  // return  await response.json()
   fetch(`${API_URL}/planets`)
    .then(function(response){
      console.log(response.json())
     return response;
   })
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  fetch(`${API_URL}/planets`)
    .then(function(response){
       console.log(response.json())
     return response;
   })
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};