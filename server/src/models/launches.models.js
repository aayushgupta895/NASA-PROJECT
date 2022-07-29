const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    launchDate: new Date('December 27,2030'),
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    target: 'Kepler-442 b',
    customers: ['NASA', 'ISRO'],
    upcoming: true,
    success: true
};

saveLaunch(launch)
// launches.set(launch.serialNumber, launch);

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

async function getAllLaunches(){
    return await launchesDatabase
    .find({}, { '_id': 0, '__v': 0 })
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName : launch.target
    })
    if(!planet){
        throw new Error('No matching planet was found')
    }
    await launchesDatabase.updateOne(
        {
          flightNumber : launch.flightNumber  
        }, launch,{
            upsert : true
        })
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(
        latestFlightNumber, 
        Object.assign(launch,{
        success : true,
        upcoming : true,
        customer : ['ISRO', 'NASA'],
        flightNumber :  latestFlightNumber
    }));
}

function abortLaunchById(launchId){
  const aborted =  launches.delete(launchId);
  console.log(aborted)
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}


module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch, 
    abortLaunchById
};