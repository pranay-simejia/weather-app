const request = require('request');


const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/4aa7ad4ff2c55b042dd798a93c2fa117/${encodeURIComponent(
		latitude
	)},${encodeURIComponent(longitude)}?units=auto`;
	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Please check you network connection', undefined);
		} else if (response.body.error) {
			callback('Unable to find location!', undefined);
		} else {
			callback(
				undefined,
				`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees outside, and ${response.body.currently.precipProbability} % chance of raining`
			);
		}
	});
};
//https://api.darksky.net/forecast/4aa7ad4ff2c55b042dd798a93c2fa117/23.58157241658,71.3624549010153

module.exports = forecast;
