const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!',
		});
	}
	geocode(req.query.address, (error, data) => {
		if (error) {
			return res.send({ error });
		}
		forecast(data.latitude, data.longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: forecastData,
				location: data.location,
				address: req.query.address,
			});
		});
	});
});

app.listen(3000, () => {
	console.log('server is up on port 3000');
});
