const express = require('express');
const request = require('request');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const funcs = require('./funcs.js');

var key = '7246674-b37ac3e55b379cef1f626bb09';
var app = express();


var accounts = {};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 


hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

app.get('/', (request, response) => {
	response.render('main.hbs', {
		title: 'Main page'
	})
});

app.get('/image', (request, response) => {
	response.render('image.hbs', {
		title: 'Image page'
	})
});

app.get('/weather', (request, response) => {
	response.render('weather.hbs', {
		title: 'Weather page'
	})
});

app.post('/image', (request,response) => {
	funcs.getImages(request.body.image, key).then((result) => {
		var imageList = {};
		if(result.length == 1) {
			response.render('image.hbs', result[imageURL0])
		} else{
			var o = 0;
			for (var i in result) {
				imageList[`imageURL${o}`] = result[i]
				o ++
			}
			response.render('image.hbs', imageList)
			// console.log(imageList)
		}
	}).catch((error) => {
		console.log('There was an error: ', error);
	});
})

app.post('/weather', (request, response) => {
	funcs.getPlace(request.body.place).then((result) => {
		return funcs.getWeather(result);
	}).then((result) => {
		result['place'] = request.body.place
		console.log(result)
		response.render('weather2.hbs', result)
	}).catch((error) => {
		console.log('Error', error);
	});
})


app.listen(port, () => {
	console.log('Server is up on the port 8080');
});