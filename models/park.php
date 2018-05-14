<?php
class Park {
    private $id;
    private $name;
    private $address;
    private $latitude;
    private $longitude;

    //GET AND SET THE VALUE OF ID
    public function getId() {
        return $this->id;
    }
    public function setId($param) {
        $this->id = $param;
    }

    //GET AND SET THE VALUE OF NAME
    public function getName() {
        return $this->name;
    }
    public function setName($param) {
        $this->name = $param;
    }

    //GET AND SET THE VALUE OF ADDRESS
    public function getAddress() {
        return $this->address;
    }
    public function setAddress($param) {
        $this->address = $param;
    }

    //GET AND SET THE VALUE OF LATITUDE
    public function getLatitude() {
        return $this->latitude;
    }
    public function setLatitude($param) {
        $this->latitude = $param;
    }

    //GET AND SET THE VALUE OF LONGITUDE
    public function getLongitude() {
        return $this->longitude;
    }
    public function setLongitude($param) {
        $this->longitude = $param;
    }

    public function __construct($name, $lat, $long) {
        $this->setName($name);
        $this->setLatitude($lat);
        $this->setLongitude($long);
    }
}
?>