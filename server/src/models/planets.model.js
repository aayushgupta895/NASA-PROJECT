const { parse } = require('csv-parse');
const fs = require('fs');
// const coolPath = path.join(__dirname, 'kepler_csv');
const habitablePlanets = [];

 function isHabitablePlanet(planet){
  return planet['koi_disposition']==='CONFIRMED'
  && planet['koi_insol']>0.36 && planet['koi_insol']< 1.11
  && planet['koi_prad'] <1.6;
} 

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment:"#",
        columns: true,
    }))
    .on('data',(data) =>{
        if(isHabitablePlanet(data)){
            habitablePlanets.push(data);
        }
         
    })
    .on('error',(err)=>{
        console.log(err)
    })
    .on('end',()=>{
        console.log(habitablePlanets.map((planet)=>{
            return planet['kepler_name']; 
        }))
        console.log(`there are ${habitablePlanets.length} habitable planets`);
        console.log('done');
    });

module.exports = {
  plnets:  habitablePlanets,
}