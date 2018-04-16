const request = require('request');

var getPlace = (address) => {
  return new Promise((resolve,reject) => {
    request({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address),
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Cannot connect to the website Google Map API');
      }else if (body.status == 'OK'){
        resolve({
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        });
      } 
    });
  });
};

var getWeather = (location) => {
  return new Promise((resolve, reject) => {
    request({
    url: 'https://api.darksky.net/forecast/8f91bd4c1ad5b6bc600d9ee0d1a9d9d6/'+location.lat+','+location.lng,
    json: true
    }, (error, response, body) => {
      if (error) {
        reject('Cannot connect to website DarkSky API');
      } else {
        resolve({
          icon: body.currently.icon,
          temp: body.currently.temperature,
          summary: body.currently.summary
        });
      };
    })
  });
};

var getImages = (keyword, key) => {
  return new Promise((resolve,reject) => {
    request({
      url: `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(keyword)}&image_type=photo`,
      json: true
    }, (error, response, body) => {
      if (error) {
      	reject('Cannot connect to Pixabay API');
      	console.log(error);
      }else if (body.totalHits == 0) {
      	resolve({
      		'Could not find image': 'Could not find image'
      	});
      }else {
      	var imagesObject = {};
      	for (var i = 0; i < body.hits.length; i++) {
          // console.log(body.hits[i].largeImageURL)
      		imagesObject[body.hits[i].id] = body.hits[i].largeImageURL
      	}
        // console.log(imagesObject);
        resolve(imagesObject);
      } 
    });
  });
};

module.exports = {
  getImages, getWeather, getPlace
};