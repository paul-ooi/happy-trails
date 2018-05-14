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
		<link href="css/style.css" type="text/css" rel="stylesheet"/>
        <script src="http://code.jquery.com/jquery-3.3.1.min.js"  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="  crossorigin="anonymous"></script>
		<script src="js/script.js" type="text/javascript"></script>
	</head>
	<body>
		<main>
            <div class="container">
                <h1>Happy Trails</h1>
                <section id='instructions'>
                    <h2>Hike in a Park where the weather is nice!</h2>
                    <p>Happy Trails, offers the service where you can look up an outdoor park and know what the weather is like today and tomorrow. So you can plan your next hike.</p>
                </section>
                <section id="parks">
                    <h2>Pick your next Park</h2>
                    <form action="test.php" method="post" name="parks">
                        <div class="container">
                            <label for="parkListProvincial">Provincial Parks</label>
                            <select name="parkListProvincial" id="parkListProvincial">
                                <option value="">--Select a Provincial Park--</option>
                                <?php foreach ($provincialList as $key => $park) :?>
                                    <option value="<?php echo $park;
                                     ?>"><?php echo $park ?></option><?php endforeach ?>
                            </select>
                        </div>
                        <div class="container">
                            <label for="parkListNational">Canadian National Parks</label>
                            <select name="parkListNational" id="parkListNational">
                                <option value="">--Select a National Park--</option>
                                <?php foreach ($nationalList as $key => $park) :?>
                                    <option value="<?php echo $park ?>"><?php echo $park ?></option><?php endforeach ?>
                            </select>
                        </div>
                    </form>
                </section>
            </div>
			<div id='map'></div>
		</main>
		<footer>
            <small>Happy Trails by Paul Ooi, <?php echo date('Y')?>)</small>
		</footer>
        <script defer type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmze1ztMRH_0Jougry8_lH1DozHPkYhtU&libraries=places&callback=initMap"></script>
	</body>
</html>
