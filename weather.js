
var request = require('request');

var city = process.argv.slice( 2 );

request( "https://www.metaweather.com/api/location/search/?query=" + city[ 0 ] , function ( error , response , body ) {
	if ( ! error && response.statusCode === 200 ) {
		var data = JSON.parse( body );
		var woeid = data[ 0 ].woeid;
		console.log( 'woeid' , woeid );
		request( "https://www.metaweather.com/api/location/" + woeid , function( error , response , body ) {
			if ( !error && response.statusCode === 200 ) {
				var data = JSON.parse( body );
				var weather = data.consolidated_weather[ 0 ];
				console.log( "Temperature is " , weather.the_temp );
				console.log( "Humidity is " , weather.humidity );
			}
		});
	}
	else {
		console.log( 'Location not found' );
	}
	
});