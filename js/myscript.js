$("document").ready(pageReady);

var map;
var parkForm;
var park;
var canada;

function pageReady() {
	// alert('connected');
	$("#parkList").on("change", function() {
		getParkDetails();
	});
	canada = {
		lat: 56.130366,
		lng: -106.346771
	};
	initMap();


}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom : 4,
		center: canada,

	});
	// let parkPin = new google.maps.Marker({
	// 	position: park,
	// 	map: map
	// });
}

function getParkDetails() {
	var selValue = $("#parkList option:selected")[0].value;

// 	alert(selValue);

	// var service = new google.maps.places.PlacesService();
	var gcoder = new google.maps.Geocoder();



		//Make call to geocode the string of the Selected Value
		gcoder.geocode(
			{
				'address': selValue,
				'componentRestrictions': {'country': 'CA'},
				'region' : 'CA'
			},
			function(results, status) {
				//function to handle the results returned from the request
				if (status == 'OK') {
					//value is geocoded
					console.log(results);//results array of objects from geocode request
					console.log(results[0].geometry.location);//geo coordinates of the selected Park
					park = results[0].geometry.location;
					map.setCenter(results[0].geometry.location);//Focus the Map's center on the selected park
					map.setZoom(14);//zoom on the newly selected value
					//drop a new pin on the map for the newly selected value
					let parkPin = new google.maps.Marker({
						'position': results[0].geometry.location,
						'map': map
					});
				} else {
					console.log("something went wrong with the request");
					console.log(status);
				}
			}
		);

	// });

}//end of getParkDetails