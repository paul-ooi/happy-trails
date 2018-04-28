window.onload = pageReady;

function pageReady() {
	// alert('connected');




}

function initMap() {
	var park = {
		lat: 44.111268,
		lng: -80.128901
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom : 14,
		center: park,
		// styles: [{
		// 	'featureType' : 'road.arterial',
		// 	'elementType': 'geometry'
		// }]
	});
	var marker = new google.maps.Marker({
		position: park,
		map: map
	});
}
