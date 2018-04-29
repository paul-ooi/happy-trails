<?php

class  Weather {
    private $tempDate;//store milliseconds
    private $temp;//temperature in Celcius
    private $weatherCondition;//Description of weather condition
    private $iconId; //Icon reference

    public function getTempDate() {
        return date('F-j', $this->tempDate);
    }

    public function setTempDate($param) {
        $this->tempDate = $param;
    }

    public function getTemp() {
        return $this->temp;
    }

    public function setTemp($param) {
        $this->temp = $param;
    }

    public function getWeatherCondition() {
        return $this->weatherCondition;
    }

    public function setWeatherCondition($param) {
        $this->weatherCondition = $param;
    }

    public function getIconId() {
        return $this->iconId;
    }

    public function setIconId($param) {
        $this->iconId = $param;
    }

    public function __construct($date, $temperature, $condition, $icon_id) {
        $this->setTempDate($date);
        $this->setTemp($temperature);
        $this->setWeatherCondition($condition);
        $this->setIconId($icon_id);
    }
}

?>