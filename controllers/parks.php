<?php
require_once '../models/park.php';
require_once '../models/parkDB.php';
new ParkDB();
    //GET DATA FROM PARKS DATABASE
    if (isset($_GET['action'])) {
        switch($_GET['action']) {
            case "getAll":
            $results = ParkDB::getLocations();
            //OUTPUT THE RESULTS AS A JSON OBJECT
            print json_encode($results);
            break;
        }
    }
    
    //POST DATA TO PARKS DATABASE
    if (isset($_POST['action'])) {
        switch($_POST['action']) {
            case "addPark":
            //CHECK THE DB IF THE PARK ALREADY EXISTS
            $parkExists = ParkDB::checkPark($_POST['park']['name']);

            if ($parkExists) {
                echo $_POST['park']['name'] . ' already exists';
            } else {
                echo $_POST['park']['name'] . ' is new';
                ParkDB::addPark($_POST['park']);
            }
        }
    }
    
?>