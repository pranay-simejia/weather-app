const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoidWRheS1zaW5nbGEiLCJhIjoiY2s1d2lncTc5MWZhMTNubG9yN3V3NzlqMCJ9.gifC0zOEOuD2Aadzf8jm_A`;
	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Please check your internet connection! ', undefined);
		} else if (response.body.features.length === 0) {
			callback('Unable to find the location! ', undefined);
		} else {
			callback(undefined, {
				latitude: response.body.features[0].center[1],
				longitude: response.body.features[0].center[0],
				location: response.body.features[0].place_name,
			});
		}
	});
};
module.exports=geocode
