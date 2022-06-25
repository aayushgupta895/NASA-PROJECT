const { parse } = require('csv-parse');
const path = require('path')
const fs = require('fs');

// const coolPath = path.join(__dirname, 'kepler_csv');
const habitablePlanets = [];

 function isHabitablePlanet(planet){
  return planet['koi_disposition']==='CONFIRMED'
  && planet['koi_insol']>0.36 && planet['koi_insol']< 1.11
  && planet['koi_prad'] <1.6;
} 

function loadPlanetsData(){
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname,"..","..","data","kepler_data.csv"))
            .pipe(parse({
                comment:"#",
                columns: true,
            }))
            .on('data',(data) =>{
                if(isHabitablePlanet(data)){
                    habitablePlanets.push(JSON.stringify(data));
                    
                }
                
            })
            .on('error',(err)=>{
                console.log(err)
                reject(err)
            })
            .on('end',()=>{
                
                
                console.log(`there are ${habitablePlanets.length} habitable planets`);
                resolve()
            });
    })   
}

module.exports = {
    loadPlanetsData,
  planets: habitablePlanets,
}