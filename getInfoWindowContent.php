<?php 
require_once "models/Weather.php";
require_once 'models/weatherFunctions.php';

$loc = [
    'lat' => trim($_POST['lat']),
    'lon' => trim($_POST['lon'])
];
$parkName = trim($_POST['park']);

//GET JSON RESULTS FROM THE WEATHER API
$fiveDay = getResults(fiveDayForecastUrl($loc));//return 40 instances of weather forecasted in 3 hour intervals
$currentDay = getResults(currentWeatherUrl($loc));

//ASSIGN SELECTED RESULTS TO VARIABLES
$today = new Weather(
    $currentDay->dt,
    $currentDay->main->temp,
    $currentDay->weather[0]->description,
    $currentDay->weather[0]->icon
);

$tomorrow = new Weather(
    $fiveDay->list[8]->dt,
    $fiveDay->list[8]->main->temp,
    $fiveDay->list[8]->weather[0]->description,
    $fiveDay->list[8]->weather[0]->icon
);

//BUILD URL TO HELP PROVIDE DIRECTIONS TO TAKE THE USER TO THIS PARK
$baseUrl = "https://www.google.com/maps/search/?api=1&query=";//Location Search - https://developers.google.com/maps/documentation/urls/guide
$parkUrl = urlencode($parkName);
$directionsUrl = $baseUrl . $parkUrl;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Info Window Content</title>
        <link rel="stylesheet" type="text/css" media="screen" href="css/infoWindow.css" />
    </head>
    <body id='weather'>
        <section id="weatherInfo">
            <h2><?php echo $parkName ?></h2>
            <div class="day">
                <img src="http://openweathermap.org/img/w/<?php echo $today->getIconId() ?>.png" alt="<?php echo $today->getWeatherCondition() ?>"/>
                <h3>Today: <?php echo $today->getTempDate() ?></h3>
                <p class="condition"><?php echo $today->getWeatherCondition() ?></p>
                <h4 class="temperature"><?php echo $today->getTemp() ?> &deg;C</h4>
            </div>
            <div class="day">
                <img src="http://openweathermap.org/img/w/<?php echo $tomorrow->getIconId() ?>.png" alt="<?php echo $tomorrow->getWeatherCondition() ?>"/>
                <h3>Tomorrow: <?php echo $tomorrow->getTempDate() ?></h3>
                <p class="condition"><?php echo $tomorrow->getWeatherCondition() ?></p>
                <h4 class="temperature"><?php echo $tomorrow->getTemp() ?> &deg;C</h4>
            </div>
            <a href="<?php echo $directionsUrl ?>" target="_blank">Get Directions</a>            
        </section>    
    </body>
</html>