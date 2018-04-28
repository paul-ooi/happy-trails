$("document").ready(pageReady);

var map;
var parkForm;
var park;
var canada;
var iw;//infoWindow
var gcoder;//geoCoder
var markerArray = []; //use to store markers
var locationsON;
var locationsCAN;


function pageReady() {
	// alert('connected');
	$("#parkListProvincial").on("change", function (event) {
		getParkDetails(event);
	});
	$("#parkListNational").on("change", function (event) {
		getParkDetails(event);
	});
	canada = {
		lat: 56.130366,
		lng: -106.346771
	};
	initMap();

	//CREATE INFO WINDOW OBJECT
	iw = new google.maps.InfoWindow();
	gcoder = new google.maps.Geocoder();

	//MARK THE PINS
	locationsON = $("#parkListProvincial option").toArray();
	locationsCAN = $("#parkListNational option").toArray();
	// var count=0;
	// for (var i = 0; i < locationsON.length; i++) {
	// 	delayedMarker(i);
	// }

	for (locationName of locationsON) {
		if (locationName.value == "" || locationName.value == undefined) {
			continue;
		}
		markPin(locationName.value);
	}
	for (locationName of locationsCAN) {
		if (locationName.value == "" || locationName.value == undefined) {
			continue;
		}
		markPin(locationName.value);
	}
	// locationsON.forEach(function (locationName) {
	// })
	// markPin(locationName)
}

// function delayedMarker(i) {
// 	if (i <= locationsON.length && locationsON[i].value != "" && locationsON[i].value != undefined){
// 		setTimeout(function () { markPin(locationsON[i].value); }, 3000);//set a delay to avoid over_limit error on Google GEocode
// 	}
	
// 	if (i <= locationsCAN.length && locationsCAN[i].value != "" && locationsCAN[i].value != undefined){
// 		setTimeout(function () { markPin(locationsCAN[i].value); }, 950);//set a delay to avoid over_limit error on Google GEocode

// 	}
// }

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom : 4,
		center: canada,
		styles: [{
				"elementType": "geometry",
				"stylers": [{
					"color": "#ebe3cd"
				}]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#523735"
				}]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [{
					"color": "#f5f1e6"
				}]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#c9b2a6"
				}]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#dcd2be"
				}]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#ae9e90"
				}]
			},
			{
				"featureType": "administrative.locality",
				"elementType": "labels.text.stroke",
				"stylers": [{
					"weight": 1.5
				}]
			},
			{
				"featureType": "administrative.neighborhood",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
				}]
			},
			{
				"featureType": "landscape.natural",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dfd2ae"
				}]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dfd2ae"
				}]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#93817c"
				}]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.stroke",
				"stylers": [{
					"weight": 1.5
				}]
			},
			{
				"featureType": "poi.medical",
				"stylers": [{
					"visibility": "off"
				}]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#a5b076"
				}]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#364f1c"
				}]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.stroke",
				"stylers": [{
						"color": "#adea88"
					},
					{
						"weight": 4
					}
				]
			},
			{
				"featureType": "poi.place_of_worship",
				"stylers": [{
					"visibility": "off"
				}]
			},
			{
				"featureType": "poi.school",
				"stylers": [{
					"visibility": "off"
				}]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f5f1e6"
				}]
			},
			{
				"featureType": "road.arterial",
				"stylers": [{
					"visibility": "off"
				}]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [{
					"color": "#fdfcf8"
				}]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f8c967"
				}]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry",
				"stylers": [{
					"color": "#e98d58"
				}]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#db8555"
				}]
			},
			{
				"featureType": "road.local",
				"stylers": [{
					"visibility": "off"
				}]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#806b63"
				}]
			},
			{
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dfd2ae"
				}]
			},
			{
				"featureType": "transit.line",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#8f7d77"
				}]
			},
			{
				"featureType": "transit.line",
				"elementType": "labels.text.stroke",
				"stylers": [{
					"color": "#ebe3cd"
				}]
			},
			{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dfd2ae"
				}]
			},
			{
				"featureType": "water",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#b4d5d8"
				}]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [{
					"color": "#92998d"
				}]
			}
		]
	});
}//end of InitMap


// var parkPin;
function markPin(locationName) {
	gcoder.geocode({
				'address': locationName,
				'componentRestrictions': {
				'country': 'CA'
				},
				'region': 'CA'
			},
			function (results, status) {
				//function to handle the results returned from the request
				if (status == 'OK') {
					park = results[0].geometry.location;
					let parkName = results[0].address_components[0].long_name;
					if (parkName.includes("Unorganized")) {
						parkName = locationName;
					}

					//DROP A NEW PIN ON THE MAP FOR THE SPECIFIC PARK
					let parkPin = new google.maps.Marker({
						'position': park,
						'map': map,
						'title': parkName,
						// 'icon': (BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_AZURE))
					});

					//ADD LISTENER FOR WHEN USER CLICKS ON THE MARKER
					parkPin.addListener('click', function (event) {
						console.log('inside addListener');
						console.log(event);
						map.setZoom(8);
						map.setCenter(this.getPosition());
						getParkDetails(this,park);
					});
					markerArray.push(parkPin);
					// markerArray.push({
					// 	'position': parkPin.position,
					// 	'name': parkName,
					// }); //Use this Array to store into a DB or Session so that I don't have to make so many repeat Geocoder requests
					// console.log(markerArray);

				} else if (status === "OVER_QUERY_LIMIT") {
						setTimeout(function () {markPin(locationName);}, 200);
				} else {
					console.log("something went wrong with the request");
					console.log(status);
					// break;
				}
			});
}

function getParkDetails(event, position) {
	var selValue;
	console.log('inside getParkDetails');
	console.log(event);
	if (event.currentTarget === undefined) {
		selValue = event.getTitle();//get value from clicked Marker
	} else {
		selValue = event.currentTarget.value; //get the value that was selected from Drop Down
	}


	if (selValue == "" || selValue == "--Select Park--") {
		return; //exit the function if the selected value is empty, the user selected the default Option
	}

	for (marker of markerArray) {
		if (marker.title === selValue) {
			//AJAX CALL TO PAGE THAT HAS THE LAYOUT AND WEATHER INFO
			$.post(
				"getInfoWindowContent.php",
				{
					'lat': marker.position.lat,
					'lon': marker.position.lng,
					'park': selValue
				},
				function (content) {
					//REPLACE CONTENT IN INFO WINDOW AND RE-POSITION TO NEXT PIN
					iw.setContent(content);
					console.log(this)
					console.log(event.position)
					console.log(position)
					iw.open(map, marker);
					// iw.open(map, { 'lat': marker.position.lat, 'lng': marker.position.lng});
				}
			);
			break;
		}

	}




	// //Make call to geocode the string of the Selected Value
	// gcoder.geocode(
	// 	{
	// 		'address': selValue,
	// 		'componentRestrictions': {'country': 'CA'},
	// 		'region' : 'CA'
	// 	},
	// 	function(results, status) {
	// 		//function to handle the results returned from the request
	// 		if (status == 'OK') {

	// 			park = results[0].geometry.location;
	// 			let parkName = results[0].address_components[0].short_name;
	// 			map.setCenter(park);//Focus the Map's center on the selected park
	// 			map.setZoom(12);//zoom on the newly selected value
	// 			//drop a new pin on the map for the newly selected value
	// 			parkPin = new google.maps.Marker({
	// 				'position': park,
	// 				'map': map,
	// 				'title': parkName
	// 			});



	// 			//AJAX CALL TO PAGE THAT HAS THE LAYOUT AND WEATHER INFO
	// 			$.post (
	// 				"getInfoWindowContent.php",
	// 				{
	// 					'lat' : park.lat,
	// 					'lon' : park.lng,
	// 					'park' : parkName
	// 				},
	// 				function(content) {
	// 					//REPLACE CONTENT IN INFO WINDOW AND RE-POSITION TO NEXT PIN
	// 					iw.setContent(content);
	// 					iw.open(map, parkPin);
	// 				}
	// 			);
	// 		} else {
	// 			console.log("something went wrong with the request");
	// 			console.log(status);
	// 		}
	// 	}
	// );

}//end of getParkDetails