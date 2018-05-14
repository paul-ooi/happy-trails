<?php
require_once 'db.php';

class ParkDB {
    private static $dbInstance;

    public function __construct() {
        self::$dbInstance = Database::getDb();
    }

    //GET VALUES OF LOCATIONS FROM THE DB TABLE
    public static function getLocations() {
        $query = "SELECT * FROM markers ORDER BY name DESC";

        $pdostm = self::$dbInstance->prepare($query);

        $pdostm->setFetchMode(PDO::FETCH_OBJ);
        $pdostm->execute();

        $results = $pdostm->fetchAll();
        return $results;
    }

    //CHECK IF THE PARK NAME ALREADY EXISTS IN DATABASE
    public static function checkPark($name) {
        $query = "SELECT COUNT(*) AS 'count' FROM markers WHERE name = :name";

        $pdostm = self::$dbInstance->prepare($query);
        $pdostm->bindParam(':name', $name, PDO::PARAM_STR);
        $result = $pdostm->fetchColumn();
        $pdostm->setFetchMode(PDO::FETCH_OBJ);
        $pdostm->execute();
        $result = $pdostm->fetch();

        if (intval($result->count) > 0) {
            return true;
        } else {
            return false;
        }

        // return $result; //TRUE IF EXISTS, FALSE IF NOT THERE
    }

    //ADD PARK TO DATABASE
        public static function addPark($park) {
        $query = "INSERT INTO  markers (name, lat, lng) VALUES (:name, :lat, :lng);";

        $pdostm = self::$dbInstance->prepare($query);
        $pdostm->bindParam(':name', $park['name'], PDO::PARAM_STR);
        $pdostm->bindParam(':lat', $park['lat'], PDO::PARAM_STR);
        $pdostm->bindParam(':lng', $park['lng'], PDO::PARAM_STR);
  
        $pdostm->execute();

        $results = $pdostm->rowCount();
        return $results;
    }
}

?>