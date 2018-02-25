const request = require('request');

var weatherForecast = (lat, lon, callback) => {

  request({
            url: `https://api.darksky.net/forecast/f0391b8e6ba4fa9ccc6afe61c59c5e14/${lat},${lon}`,
            json: true
          },
          (error, response, body) => {
            if (!error && response.statusCode === 200) {
              callback(null, {
                time: body.currently.time,
                temp: body.currently.temperature
              });
            }
            else {
              callback('Error fetching weather');
            }
          }
  );
};

module.exports = {
  weatherForecast
};
