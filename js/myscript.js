$("document").ready(pageReady);

var map;
var parkForm;
var park;
var canada;
var iw;

function pageReady() {
	// alert('connected');
	$("#parkListOntario").on("change", function () {
		getParkDetails();
	});
	canada = {
		lat: 56.130366,
		lng: -106.346771
	};
	initMap();

	//CREATE INFO WINDOW OBJECT
	iw = new google.maps.InfoWindow();


}

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
				"featureType": "road.highway",
				"elementType": "labels",
				"stylers": [{
					"visibility": "off"
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
}

function getParkDetails() {
	var selValue = $("#parkListOntario option:selected")[0].value; //get the value that was selected
	if (selValue == "" || selValue == "--Select Park--") {
		return; //exit the function if the selected value is empty, the user selected the default Option
	}

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
				// console.log(results[0].geometry.location);//geo coordinates of the selected Park
				park = results[0].geometry.location;
				let parkName = results[0].address_components[0].short_name;
				map.setCenter(park);//Focus the Map's center on the selected park
				map.setZoom(14);//zoom on the newly selected value
				//drop a new pin on the map for the newly selected value
				let parkPin = new google.maps.Marker({
					'position': park,
					'map': map,
					'title': parkName
				});



				//AJAX CALL TO PAGE THAT HAS THE LAYOUT AND WEATHER INFO
				$.post (
					"getInfoWindowContent.php",
					{
						'lat' : park.lat,
						'lon' : park.lng,
						'park' : parkName
					},
					function(content) {
						//REPLACE CONTENT IN INFO WINDOW AND RE-POSITION TO NEXT PIN
						iw.setContent(content);
						iw.open(map, parkPin);
					}
				);
			} else {
				console.log("something went wrong with the request");
				console.log(status);
			}
		}
	);

}//end of getParkDetails