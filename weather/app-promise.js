const yargs = require('yargs');
const axios = require('axios');

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

var address = encodeURIComponent(yargv.address);
var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

axios.get(geocodeURL)
  .then(
    (response) => {
      if (response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('Query quota limit');
      }
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Address not found');
      }
      if (response.data.status === 'OK') {
        console.log(response.data.results[0].formatted_address);

        let lat = response.data.results[0].geometry.location.lat;
        let lon = response.data.results[0].geometry.location.lng;
        var weatherURL = `https://api.darksky.net/forecast/f0391b8e6ba4fa9ccc6afe61c59c5e14/${lat},${lon}`;

        return axios.get(weatherURL);
      }
    }
  )
  .then(
    (response) => {
      var temp = response.data.currently.temperature;
      console.log(`Temperature currently: ${temp}`);
    }
  )
  .catch(
    (e) => {
      if (e.code === "ENOTFOUND") {
        console.log('Unable to connect')
      }
      else console.log(e.message);
    }
  );
