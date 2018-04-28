<?php
session_start();

function fiveDayForecastUrl() {
    $loc = [
        'lat' => 44.111268,
        'lon' => -80.128901
    ];
    $toronto = [
        'lat' => 43.6570399,
        'lon' => -79.4612756
    ];
    $modeXML = '&mode=xml';
    $appId = '&appid=' . '99022579c1585db50547138ce3e7856f';
    $owm_Url = 'api.openweathermap.org/data/2.5/forecast';
    $request_url = $owm_Url . "?" . http_build_query($loc) . $appId . '&units=metric';

    return $request_url;
}

function currentWeatherUrl() {
    $loc = [
        'lat' => 44.111268,
        'lon' => -80.128901
    ];
    $modeXML = '&mode=xml';
    $appId = '&appid=' . '99022579c1585db50547138ce3e7856f';
    $owm_Url = 'api.openweathermap.org/data/2.5/weather';
    $request_url = $owm_Url . "?" . http_build_query($loc) . $appId . '&units=metric';

    return $request_url;
}

function getResults($url){

$c = curl_init();
curl_setopt($c, CURLOPT_URL, $url);
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($c);
curl_close($c);

return json_decode($result);
}

$fiveDay = getResults(fiveDayForecastUrl());//return 40 instances of weather measured 3 hour intervals from Today 8am to
$currentDay = getResults(currentWeatherUrl());


echo '<pre>';
echo "Forecast ";
echo strftime ('h:i:s d-M-Y', time($fiveDay->list[0]->dt));
echo '<br/>';
echo $fiveDay->list[0]->main->temp;
echo '<br/>';
echo "Forecast ";
echo date ('h:i:s d-M-Y', $fiveDay->list[0]->dt);
echo '<br/>';
echo $fiveDay->list[0]->main->temp;
echo '<br/>';
echo "Forecast ";
echo date('h:i:s d-M-Y', $fiveDay->list[39]->dt);
echo '<br/>';
echo $fiveDay->list[0]->main->temp;
echo '<br/>';
echo "<br/>Current<br/>";
echo date('h:i:s d-M-Y', $currentDay->dt);
echo '<br/>';
echo $currentDay->main->temp;
echo '<br/>';
print_r($currentDay);
echo '</pre>';


?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Final API project</title>
		<link href="css/style.css" type="text/css" rel="stylesheet"/>
		<script src="js/script.js" type="text/javascript"></script>
	</head>
	<body>
		<header>
			<h2>Happy Trails</h2>
		</header>
		<main>
            
            <div id='weather'>
                <h3>Location name</h3>
                <p><?php //echo $weather ?></p>
            </div>
			<div id='map'></div>
		</main>
		<footer>
		</footer>
		<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4ZPl9zy6Jy173AaG-_VVubcUJmLBOrtk&callback=initMap">
    </script>
	</body>
</html>
