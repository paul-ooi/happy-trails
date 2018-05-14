var map;
var parkForm;
var park;
var canada;
var iw;//infoWindow
var gcoder;//geoCoder
var markerArray = []; //use to store markers
var locationsON;//HOLD PROVINCIAL PARKS
var locationsCAN;//HOLD NATIONAL PARKS


window.onload = function () {
	getParksFromDb();

	$("#parkListProvincial").on("change", function (event) {
		getParkDetails(event);
	});
	$("#parkListNational").on("change", function (event) {
		getParkDetails(event);
	});

	//CREATE INFO WINDOW OBJECT
	iw = new google.maps.InfoWindow();
	gcoder = new google.maps.Geocoder();

	//MARK THE PINS
	locationsON = $("#parkListProvincial option").toArray();
	locationsCAN = $("#parkListNational option").toArray();

	// while (locationsCAN.length > 0) {
	// 	let parkName = locationsCAN.pop();
	// 	if (parkName.value == "" || parkName.value == undefined) {
	// 		continue;
	// 	}
	// 	markPin(parkName.value);
	// }
	// while (locationsON.length > 0) {
	// 	let parkName = locationsON.pop();
	// 	if (parkName.value == "" || parkName.value == undefined) {
	// 		continue;
	// 	}
	// 	markPin(parkName.value);
	// }
}

//INITIALIZE MAP ON SITE
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom : 4,
		minZoom: 1,
		maxZoom: 14, 
		gestureHandling: 'cooperative',
		center: {
			lat: 56.130366,
			lng: -106.346771},
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


function markPin(locationName) {
	gcoder.geocode({
				'address': locationName,
				'componentRestrictions': {
				'country': 'CA'
				},
				'region': 'CA'
			},
			function (results, status) {
				//FUNCTION HANDLE THE RESPONSE FROM THE GEOCODER
				if (status == 'OK') {
					park = results[0].geometry.location;
					let parkName = results[0].address_components[0].long_name;//IF THERE ARE MULTIPLE HITS FROM THE API, TAKE THE FIRST RESULT
					if (parkName != locationName) {
						parkName = locationName; //IF RESULT BASE IS USING A DIFFERENT NAME THAN THE ONE SEARCHED FOR, RENAME IT
					}

					
					// //DROP A NEW PIN ON THE MAP FOR THE SPECIFIC PARK
					// let parkPin = new google.maps.Marker({
					// 	'position': park,
					// 	// 'map': map,//SET MARKER ON MAP
					// 	'title': parkName,
					// 	// 'icon': BitmapDescriptor.defaultMarker(BitmapDescriptorFactory.HUE_AZURE)
					// 	//CUSTOMIZE LABEL AND COLOR OF MARKER
					// });
					

					// //ADD LISTENER FOR WHEN USER CLICKS ON THE MARKER
					// parkPin.addListener('click', function (event) {
					// 	map.setZoom(7);
					// 	map.setCenter(this.getPosition());
					// 	getParkDetails(this,park);
					// });
					// markerArray.push(parkPin);//USE THIS ARRAY TO SEARCH THROUGH THE DETAILS FOR THE WEATHER API AND MINIMIZE GEOCODER CALLS
					let parkPin = {
						'title': parkName,
						'position': park
					}
					//SEND TO DATABASE
					addToDatabase(parkPin);

				} else if (status === "OVER_QUERY_LIMIT") {
						setTimeout(function () {markPin(locationName);}, 200);
				} else {
					console.log("something went wrong with the request");
					console.log(status);
				}
			});
}//end of markPin

//GET WEATHER DETAILS FOR THE PARK
function getParkDetails(event, position) {
	var selValue;
	if (event.currentTarget === undefined) {
		selValue = event.getTitle();//ASSIGN TITLE FOR CLICKED MARKER
	} else {
		selValue = event.currentTarget.value; //ASSIGN VALUE IF PARK WAS SELECTED FROM DROPDOWN
	} 

	if (selValue == "" || selValue == "--Select Park--") {
		return; //EXIT FUNCTION IF SELECTED VALUE IS EMPTY OR THE DEFAULT OPTION
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
					map.setZoom(7);
					map.setCenter(marker.getPosition());
					//REPLACE CONTENT IN INFO WINDOW AND RE-POSITION TO NEXT PIN
					iw.setContent(content);
					iw.open(map, marker);
				}
			);
			break;
		}

	}
}//end of getParkDetails


function addToDatabase(parkPin) {
	$.ajax("models/parkDB.php",{
			data: {
				'name': parkPin.title,
				'lat': parkPin.position.lat(),
				'lng': parkPin.position.lng()
			},
			method: "POST",
			success: function(response) {
			console.log(response)
		}
	});
}//end of addToDatabase

function getParksFromDb() {
	$.ajax("controllers/parks.php", {
		method: "GET",
		data: {
			'action': 'getAll'
		}, //WHAT TO SEND IN (GET) REQUEST
		dataType: "json", //EXPECT JSON IN THE RESPONSE
		success: function (parks) {
			for (var park of parks) {
				// console.log(parks);
				var parkPin = new google.maps.Marker({
					'title': park.name,
					'position': {
						lat: parseFloat(park.lat),
						lng: parseFloat(park.lng)
					},
					'map': map, //SET MARKER ON MAP
				});
				console.log(parkPin);
				//addListener IS A BUILT IN PROPERTY TO GOOGLE MARKER
				parkPin.addListener('click', function (event) {
					map.setZoom(7);
					map.setCenter(this.getPosition());
					getParkDetails(this, park.name);
				});
			}
		}
	})
}//END OF GETPARKS