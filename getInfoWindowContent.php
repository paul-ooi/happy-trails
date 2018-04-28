<?php 

require_once 'weatherFunctions.php';
$loc = [
    'lat' => trim($_POST['lat']),
    'lon' => trim($_POST['lon'])
];
$parkName = trim($_POST['park']);

//GET JSON RESULTS FROM THE WEATHER API
$fiveDay = getResults(fiveDayForecastUrl($loc));//return 40 instances of weather forecasted in 3 hour intervals
$currentDay = getResults(currentWeatherUrl($loc));

//ASSIGN SELECTED RESULTS TO VARIABLES
$today = date('F-j', $currentDay->dt);
$todayTemp = $currentDay->main->temp;
$todayCondition = $currentDay->weather[0]->description;
$todayIcon = $currentDay->weather[0]->icon;


$tomorrow = date ('F-j', $fiveDay->list[12]->dt);
$tomorrowTemp = $fiveDay->list[12]->main->temp;
$tomorrowCondition = $fiveDay->list[12]->weather[0]->description;
$tomorrowIcon = $fiveDay->list[12]->weather[0]->icon;

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Info Window Content</title>
        <link rel="stylesheet" type="text/css" media="screen" href="css/infoWindow.css" />
    </head>
    <body id='weather'>
        <!-- http://openweathermap.org/img/w/ -->
        <section>
            <h2><?php echo $parkName ?></h2>
            <div class="day">
                <img src="http://openweathermap.org/img/w/<?php echo $todayIcon ?>.png" alt="<?php echo $todayCondition ?>"/>
                <h3>Today: <?php echo $today ?></h3>
                <p><?php echo $todayCondition ?></p>
                <h4><?php echo $todayTemp ?> &deg;C</h4>
            </div>
            <div class="day">
                <img src="http://openweathermap.org/img/w/<?php echo $tomorrowIcon ?>.png" alt="<?php echo $tomorrowCondition ?>"/>
                <h3>Tomorrow: <?php echo $tomorrow ?></h3>
                <p><?php echo $tomorrowCondition ?></p>
                <h4><?php echo $tomorrowTemp ?> &deg;C</h4>
            </div>
</section>    
    </body>
</html>