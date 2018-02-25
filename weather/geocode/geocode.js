const request = require('request');

var geocodeAddress = (address, callback) => {

  var address = encodeURIComponent(address);

  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (error, response, body) => {
    // console.log(response.body);
    if (error) {
      let error = ('Error');
      callback(error);
    }
    else if (body.status === "ZERO_RESULTS") {
      let error = ('Address not found');
      callback(error);
    }
    else if (body.status === "OVER_QUERY_LIMIT") {
      let error = ('Quota limit exceeded');
      callback(error);
    }
    else if (body.status === "OK") {
      callback(null, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};
