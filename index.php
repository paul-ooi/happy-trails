<?php
session_start();

$parksList = [
	"Boyne Valley Provincial Park",
	"Mono Cliffs Provincial Park",
	"Arrowhead Provincial Park"
 ];

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


// echo '<pre>';
// echo "Forecast ";
// echo strftime ('h:i:s d-M-Y', time($fiveDay->list[0]->dt));
// echo '<br/>';
// echo $fiveDay->list[0]->main->temp;
// echo '<br/>';
// echo "Forecast ";
// echo date ('h:i:s d-M-Y', $fiveDay->list[0]->dt);
// echo '<br/>';
// echo $fiveDay->list[0]->main->temp;
// echo '<br/>';
// echo "Forecast ";
// echo date('h:i:s d-M-Y', $fiveDay->list[39]->dt);
// echo '<br/>';
// echo $fiveDay->list[0]->main->temp;
// echo '<br/>';
// echo "<br/>Current<br/>";
// echo date('h:i:s d-M-Y', $currentDay->dt);
// echo '<br/>';
// echo $currentDay->main->temp;
// echo '<br/>';
// print_r($currentDay);
// echo '</pre>';


?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Final API project</title>
		<link href="css/style.css" type="text/css" rel="stylesheet"/>
        <script src="http://code.jquery.com/jquery-3.3.1.min.js"  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="  crossorigin="anonymous"></script>
		<script src="js/myscript.js" type="text/javascript"></script>
	</head>
	<body>
		<header>
			<h1>Happy Trails</h1>
		</header>
		<main>
            
            <div id='weather'>
                <h3>Location name</h3>
                <p><?php //echo $weather ?></p>
            </div>
            <div id="parks">
                <h2>List of Parks</h2>
                <form action="test.php" method="post" name="parks">
                    <label for="parkList"></label>
                    <select name="parkList" id="parkList">
                        <option>--Select Park--</option>
                        <?php foreach ($parksList as $key => $park) :?>
                            <option value="<?php echo $park ?>"><?php echo $park ?></option><?php endforeach ?>
                    </select>
                </form>
            </div>
			<div id='map'></div>
		</main>
		<footer>
		</footer>
        <script async defer type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmze1ztMRH_0Jougry8_lH1DozHPkYhtU&libraries=places"></script>
		<!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUoryTtXRQlj82wkp69Fvg-XazSRcW_yY&callback=initMap"> -->
    </script>
	</body>
</html>
