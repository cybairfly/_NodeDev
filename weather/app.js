const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./forecast/forecast.js');

const yargv = yargs
  .options({
    a: {
      demand: true,
      string: true,
      alias: 'address',
      describe: 'Input address for weather',
    }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(yargv.address, (error, result) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 2));
    weather.weatherForecast(result.latitude, result.longitude, (error, result) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log(JSON.stringify(result, null, 2));
      }
    });
  }
});

// weather.weatherForecast(50, 12, (error, result) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(JSON.stringify(result, null, 2));
//   }
// });
