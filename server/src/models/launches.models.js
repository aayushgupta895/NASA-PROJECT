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

launches.set(launch.serialNumber, launch);

function getAllLaunches(){
    return Array.from(launches.values())
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
module.exports = {
    getAllLaunches,
    addNewLaunch, 
};