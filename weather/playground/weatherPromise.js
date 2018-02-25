const request = require('request');

var geocodeAddress = (address) => {

  var address = encodeURIComponent(address);

  return new Promise(
    (resolve, reject) => {
      request(
        {
          url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
          json: true
        },
        (error, response, body) => {
          if (!error && body.status === "OK") {
            resolve(
              {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
              }
            );
          }
          else {
            if (body.status === "OVER_QUERY_LIMIT") {
              error = ('Quota limit exceeded');
            }
            if (body.status === "ZERO_RESULTS") {
              error = ('Address not found');
            }
            reject(error);
          }
        }
      );
    }
  );
}

geocodeAddress('karlovarska 574')
  .then(
    (location) => {
      console.log(JSON.stringify(location, null, 2));
    },
    (error) => {
      console.log(error);
    }
  );

module.exports = {
  geocodeAddress
};
