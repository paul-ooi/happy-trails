<?php
require_once 'credentials.php';

class Database {

    private static $db;

    private function __construct() {

    }

    public static function getDb() {
        //IF THE DATABASE CONNECTION HAS NOT BEEN CREATED, MAKE IT
        if (!isset(self::$db)) {
            try {
                self::$db = new PDO(Credentials::getDsn(), Credentials::getName(), Credentials::getPass());
            } catch (PDOException $err) {
                echo $err->getMessage();
            }
        }
        //SET THE ERRORMODES FOR THE DATABASE
        self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return self::$db;
    }// END OF FUNCTION GETDB
}
 ?>