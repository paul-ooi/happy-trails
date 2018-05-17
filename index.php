<?php

require_once "models/parkDB.php";
new ParkDB();

//GET THE EXISTING PARKS FROM MY DB TO POPULATE MAP
$dbParks = ParkDB::getLocations();

$nationalList = [];
$provincialList = [];
while (count($dbParks) > 0) {
   $park = array_pop($dbParks);

   if (intval($park->type) === 1) {
       array_push($nationalList, $park->name);
   } else if (intval($park->type) === 2) {
       array_push($provincialList, $park->name);
   }
}

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
        <title>Final API project</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
		<link href="css/style.css" type="text/css" rel="stylesheet"/>
        <script src="http://code.jquery.com/jquery-3.3.1.min.js"  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="  crossorigin="anonymous"></script>
		<script src="js/script.js" type="text/javascript"></script>
	</head>
	<body>
        <header class="d-flex justify-content-around align-items-center">
            <h1 class="sr-only">Happy Trails</h1>
            <!-- <figure id="logo"> -->
                <img src="img/happy-trails-logo2.svg" alt="Happy Trails Logo"/>
            <!-- </figure> -->
        </header>
		<main class="d-flex justify-content-lg-between align-items-center">
            <h2>Hike in a Park where the weather is nice!</h2>
            <div class="container col-12 col-lg-6">
                <section id='instructions'>                    
                    <p>Happy Trails, offers the service where you can look up an outdoor park and know what the weather is like today and tomorrow. So you can plan your next hike.</p>
                </section>
                <section id="parks" class="mb-md-4">
                    <h2>Pick your next Park</h2>
                    <form action="test.php" method="post" name="parks">
                        <div class="container mr-lg-3">
                            <label for="parkListProvincial">Provincial Parks <span><img src="img/p-marker.svg" alt="blue location pin for provincial parks" class="markerPin"/></span></label>
                            <select name="parkListProvincial" id="parkListProvincial" class="parkList">
                                <option value="">--Select a Provincial Park--</option>
                                <?php foreach ($provincialList as $key => $park) :?>
                                    <option value="<?php echo $park;
                                     ?>"><?php echo $park ?></option><?php endforeach ?>
                            </select>
                        </div>
                        <div class="container mr-lg-3">
                            <label for="parkListNational">Canadian National Parks <span><img src="img/n-marker.svg" alt="red location pin for provincial parks" class="markerPin"/></span></label>
                            <select name="parkListNational" id="parkListNational" class="parkList">
                                <option value="">--Select a National Park--</option>
                                <?php foreach ($nationalList as $key => $park) :?>
                                    <option value="<?php echo $park ?>"><?php echo $park ?></option><?php endforeach ?>
                            </select>
                        </div>
                    </form>
                </section>
            </div>
			<div id='map' class="container col-12 col-lg-6"></div>
		</main>
		<footer>
            <small>Happy Trails by Paul Ooi, <?php echo date('Y')?></small>
		</footer>
        <script defer type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmze1ztMRH_0Jougry8_lH1DozHPkYhtU&libraries=places&callback=initMap"></script>
	</body>
</html>
