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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Final API project</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
		<link href="css/style.css" type="text/css" rel="stylesheet"/>
        <script src="http://code.jquery.com/jquery-3.3.1.min.js"  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="  crossorigin="anonymous"></script>
	</head>
	<body class="container">
        <header class="">
            <h1 class="sr-only">Happy Trails</h1>
            <img src="img/happy-trails-logo.svg" alt="Happy Trails Logo"/>
        </header>
		<main class="container row mb-4 px-md-0">
            <h2 class="px-2 col-12 my-lg-5">Hike in a Park where the weather is nice!</h2>
            <section id='instructions' class="col-md-6 col-xl-4 px-md-5">                    
                <p class="my-md-5 my-xl-0 px-md-3 px-sm-5 text-lg-left">Happy Trails, offers the service where you can look up an outdoor park and know what the weather is like today and tomorrow. So you can plan your next hike.</p>
                <h3 class="my-xl-4">Pick your next Park</h3>
                <form action="test.php" method="post" name="parks" class="container text-left" id="parkForm">
                    <div class="mb-4">
                        <label class="" for="parkListProvincial">Provincial Parks <span>
                            <img src="img/p-marker.svg" alt="blue location pin for provincial parks" class="markerPin"/>
                        </span>
                        </label>
                        <select name="parkListProvincial" id="parkListProvincial" class="parkList">
                            <option value="">--Select a Provincial Park--</option>
                            <?php foreach ($provincialList as $key => $park) :?>
                                <option value="<?php echo $park;
                                    ?>"><?php echo $park ?></option><?php endforeach ?>
                        </select>
                    </div>
                    <div class="mb-4 mb-lg-0">
                        <label class="" for="parkListNational">Canadian National Parks <span>
                            <img src="img/n-marker.svg" alt="red location pin for provincial parks" class="markerPin"/>
                            </span>
                        </label>
                        <select name="parkListNational" id="parkListNational" class="parkList">
                            <option value="">--Select a National Park--</option>
                            <?php foreach ($nationalList as $key => $park) :?>
                                <option value="<?php echo $park ?>"><?php echo $park ?></option><?php endforeach ?>
                        </select>
                    </div>
                </form>
            </section>            
			<div id='map' class="mb-4 col-md-6 col-xl-8"></div>
		</main>
		<footer class="mb-4 text-lg-right">
            <small>Happy Trails by Paul Ooi, <?php echo date('Y')?></small>
		</footer>
        <script defer type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmze1ztMRH_0Jougry8_lH1DozHPkYhtU&libraries=places&callback=initMap"></script>
        <script src="js/script.js" type="text/javascript"></script>
	</body>
</html>
