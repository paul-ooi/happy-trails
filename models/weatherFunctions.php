<?php

function fiveDayForecastUrl($loc) {

    $modeXML = '&mode=xml';
    $appId = '&appid=' . '99022579c1585db50547138ce3e7856f';
    $owm_Url = 'api.openweathermap.org/data/2.5/forecast';
    $request_url = $owm_Url . "?" . http_build_query($loc) . $appId . '&units=metric';

    return $request_url;
}

function currentWeatherUrl($loc) {

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

 ?>