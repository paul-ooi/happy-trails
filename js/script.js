//DECLARE VARIABLES FOR GLOBAL USE
var map;
var parkForm;
var park;
var canada;
var iw; //infoWindow
var gcoder; //geoCoder
var markerArray = []; //use to store markers
var locationsProv; //HOLD PROVINCIAL PARKS
var locationsCAN; //HOLD NATIONAL PARKS
var customMarkerP;
var customMarkerN;

//RUN THIS FUNCTION AFTER THE WINDOW FINISHES LOADING
window.onload = function () {

    //LISTEN FOR DROPDOWN CHANGES BY THE USER
    $("#parkListProvincial, #parkListNational").on("change", function (event) {
        getParkDetails(event);
    });
        
   	//CREATE INFO WINDOW, GEOCODER, MARKER OBJECT
   	iw = new google.maps.InfoWindow();
    gcoder = new google.maps.Geocoder(); 
    customMarkerP = {
        url: 'img/p-marker.png',
        size: new google.maps.Size(19 , 32)
    }
    customMarkerN = {
        url: 'img/n-marker.png',
        size: new google.maps.Size(19 , 32)
    }
       
    //GET ALL PARKS FROM THE DATABASE AND PLOT MARKERS
    getParksFromDb();


    /**
     * TO DO: FIX READ FROM WIKIPEDIA API(parkFunctions.php), THEN CHECK WITH DATABASE VALUES TO UPDATE NEW ITEMS
     * REPLACED THE FOLLOWING COMMENTED CODE.
     */
    // locationsProv = $("#parkListProvincial option").toArray();
    // locationsCAN = $("#parkListNational option").toArray();

    // //COMBINE PARK LISTS TO ONE
    // var parksArray = locationsProv.concat(locationsCAN);

    // while (parksArray.length > 0) {
    //     let parkName = parksArray.pop();
    //     if (parkName.value == "" || parkName.value == undefined) {
    //         continue;
    //     } else {
    //         //IF THE PARK IS IN THE DATABASE, CONTINUE TO NEXT ITEM
    //         //ELSE, CALL GEOCODE (AND ADD TO DATABASE)
    //         getGeocode(parkName.value);
    //     }
    // }
    
}

/**
 * INITIALIZE MAP ON PAGE
 */
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        minZoom: 3,
        maxZoom: 20,
        center: {
            //VIEW CANADA
            lat: 56.130366,
            lng: -106.346771
        },
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

} //end of InitMap

/**
 * CALL GOOGLE GEOCODE API TO GET LOCATION COORDINATES
 * UPON RESULTS CALL addParkToDb FUNCTION
 * @param {string} locationName - PARK NAME TO BE SEARCHED WITH GEOCODE API
 */
function getGeocode(locationName) {
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
                parkLoc = results[0].geometry.location;
                let parkName = results[0].address_components[0].long_name; //IF THERE ARE MULTIPLE HITS FROM THE API, TAKE THE FIRST RESULT
                if (parkName != locationName) {
                    parkName = locationName; //IF RESULT BASE IS USING A DIFFERENT NAME (like Uncategorized), USE ORIGINAL PARK NAME
                }
                //BUILD OBJECT OF RECIEVED DATA
                let park = {
                    'name': parkName,
                    'position': parkLoc
                }
                //SEND TO DATABASE TO ADD NEW PARK
                addParkToDb(park);

            } else if (status === "OVER_QUERY_LIMIT") {
                setTimeout(function () {
                    getGeocode(locationName);
                }, 200);
            } else {
                console.info("Status message: ",status, " recieved. Results: ");
                console.group();
                console.log(results);
            }
        });
} //end of getGeocode


/**
 * GET THE PARK NAMES AND LOCATION FROM DATABASE
 * PLACE A MARKER ON MAP FOR EACH PARK
 */
function getParksFromDb() {
    $.ajax("controllers/parks.php", {
        method: "GET",
        data: {
            'action': 'getAll'
        },//WHAT TO SEND IN (GET) REQUEST
        dataType: "json",//EXPECT JSON IN THE RESPONSE
        converters: {
            "text json" : $.parseJSON
        },
        success: function (parks) {
            for (var park of parks) {
                // console.log(parks);
                var customMarker;
                if (park.name.includes('National')){
                    customMarker = customMarkerN;
                } else {
                    customMarker = customMarkerP;
                }

                var parkPin = new google.maps.Marker({
                	'title': park.name,
                	'position': {
                        lat: parseFloat(park.lat),
                        lng: parseFloat(park.lng)
                    },
                    icon: customMarker,
                	'map': map,//SET MARKER ON MAP
                });
                //addListener IS A BUILT IN PROPERTY TO GOOGLE MARKER
                parkPin.addListener('click', function (event) {
                	map.setZoom(2);
                	map.setCenter(this.getPosition());
                	getParkDetails(this,park);
                });
                markerArray.push(parkPin);
            }
        }
    });
} //END OF getParksFromDb




/**
 * ADD PARK TO DATABASE
 * @param {object} park - PARK OBJECT WITH NAME(STRING), POSITION(LOCATION OBJECT FROM GEOCODE)
 */
function addParkToDb(park) {
    // console.log(park);
    $.ajax("controllers/parks.php", {
        method: "POST",
        data: { 
            "action" : "addPark", 
            'park' : {
                "lat": park.position.lat(),
                "lng": park.position.lng(),
                "name": park.name
            }
        },
        success: function (result) {
            console.log("inside addParkToDb success");
            console.log(result);
        },
        error: function (jqXHR, status, error) {
            console.log("inside error");
            console.log(jqXHR, status, error);
        }
    })
}



/**
 * GET WEATHER DETAILS FOR THE PARK FROM OPEN WEATHER MAP API (https: //openweathermap.org/api)
 * @param {object} event - click OR change EVENT FROM LISTENER
 * @param {*} position - POSITION FROM SELECTED ITEM
 */
function getParkDetails(event, position) {
    var selValue;
    if (event.currentTarget === undefined) {
        selValue = event.getTitle(); //ASSIGN TITLE FOR CLICKED MARKER
    } else {
        selValue = event.currentTarget.value; //ASSIGN VALUE IF PARK WAS SELECTED FROM DROPDOWN
    }

    if (selValue == "" || selValue == "--Select Park--") {
        return; //EXIT FUNCTION IF SELECTED VALUE IS EMPTY OR THE DEFAULT OPTION
    }

    //GET SELECTED MARKER OBJECT WITH LOCATION DETAILS
    var selectedPark = markerArray.find(function(marker) {
        return marker.title == selValue; 
    });

    //AJAX CALL TO PAGE THAT HAS THE INFO WINDOW LAYOUT AND WEATHER INFO
    $.post(
        "getInfoWindowContent.php", {
            'lat': selectedPark.position.lat,
            'lon': selectedPark.position.lng,
            'park': selValue
        },
        function (content) {
            map.setZoom(10);
            map.setCenter(selectedPark.getPosition());
            //REPLACE CONTENT IN INFO WINDOW AND RE-POSITION TO SELECTED PIN
            iw.setContent(content);
            iw.open(map, selectedPark);

            //ADD LISTENER TO BUTTON TO ZOOM OUT
            var seeAllBtn = document.getElementById('seeAll');
            seeAllBtn.addEventListener('click', zoomOut, false);
        }
    );

} //END OF getParkDetails


function zoomOut() {
    // console.log("inside infowWindow");
    map.setZoom(2);
    map.setCenter({
        //CANADA LOCATION
        lat: 56.130366,
        lng: -106.346771
    });
}//END ZOOMOUT