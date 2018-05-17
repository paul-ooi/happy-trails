<?php 
require_once "models/Weather.php";
require_once 'models/weatherFunctions.php';

$loc = [
    'lat' => trim($_POST['lat']),
    'lon' => trim($_POST['lon'])
];

// //TESTING 
// $loc = [
//     'lat' => 56.130366,
//     'lon' => -106.346771
// ];

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

//TEMPERATURE 24HRS TOMORROW
// $tomorrow = new Weather(
//     $fiveDay->list[8]->dt,
//     $fiveDay->list[8]->main->temp,
//     $fiveDay->list[8]->weather[0]->description,
//     $fiveDay->list[8]->weather[0]->icon
// );

//TEMPERATURE FOR TOMORROW AT NOON
$tomorrow = new Weather(
    $fiveDay->list[4]->dt,
    $fiveDay->list[4]->main->temp,
    $fiveDay->list[4]->weather[0]->description,
    $fiveDay->list[4]->weather[0]->icon
);

// echo "<pre>";
// $sec = ($currentDay->dt)/1000;
// var_dump(date('d-m-Y H:m:s',time($sec)));
// // var_dump($currentDay);
// echo "</pre>";

// echo "<pre>";
// $sec = ($fiveDay->list[4]->dt)/1000;
// var_dump(date('d-m-Y H:m:s',time($sec)));
// echo $fiveDay->list[4]->dt_txt . '</br>';
// $sec1 = ($fiveDay->list[8]->dt)/1000;
// var_dump(date('d-m-Y H:m:s',time($sec1)));
// echo $fiveDay->list[8]->dt_txt;
// echo "</pre>";

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
        <link rel="stylesheet" type="text/css" media="screen" href="css/infoWindow1.css" />
    </head>
    <body id='weather'>
        <section id="weatherInfo">
            <h2 id="parkName" class="text-left"><?php echo $parkName ?></h2>
            <div class="day text-left">
                <img src="http://openweathermap.org/img/w/<?php echo $today->getIconId() ?>.png" alt="<?php echo $today->getWeatherCondition() ?>"/>
                <h3>Today: <?php echo $today->getTempDate() ?></h3>
                <p class="condition"><?php echo $today->getWeatherCondition() ?></p>
                <h4 class="temperature"><?php echo $today->getTemp() ?> &deg;C</h4>
            </div>
            <div class="day text-left">
                <img src="http://openweathermap.org/img/w/<?php echo $tomorrow->getIconId() ?>.png" alt="<?php echo $tomorrow->getWeatherCondition() ?>"/>
                <h3>Tomorrow: <?php echo $tomorrow->getTempDate() ?></h3>
                <p class="condition"><?php echo $tomorrow->getWeatherCondition() ?></p>
                <h4 class="temperature"><?php echo $tomorrow->getTemp() ?> &deg;C</h4>
            </div>
            <div id="infoControls">
                <a href="<?php echo $directionsUrl ?>" target="_blank" class="button">Get Directions</a>            
                <button id="seeAll" class="button">See All Markers</button>
            </div>
        </section>  

    </body>
</html>