<?php
// session_start();

//USED PARKFUNCTIONS.PHP TO GET LISTS OF PARKS --HAD TROUBLE ACCESSING WIKIPEDIA JSON FORMAT
$nationalList = [
    "Aulavik National Park",
    "Auyuittuq National Park",
    "Banff National Park",
    "Bruce Peninsula National Park",
    "Cape Breton Highlands National Park",
    "Elk Island National Park",
    "Forillon National Park",
    "Fundy National Park",
    "Georgian Bay Islands National Park",
    "Glacier National Park",
    "Grasslands National Park",
    "Gros Morne National Park",
    "Ivvavik National Park",
    "Jasper National Park",
    "Kejimkujik National Park",
    "Kootenay National Park",
    "Kouchibouguac National Park",
    "La Mauricie National Park",
    "Mount Revelstoke National Park",
    "Point Pelee National Park",
    "Prince Albert National Park",
    "Prince Edward Island National Park",
    "Pukaskwa National Park",
    "Qausuittuq National Park",
    "Quttinirpaaq National Park",
    "Riding Mountain National Park",
    "Rouge National Urban Park",
    "Sirmilik National Park",
    "Terra Nova National Park",
    "Thousand Islands National Park",
    "Torngat Mountains National Park",
    "Tuktut Nogait National Park",
    "Ukkusiksalik National Park",
    "Vuntut National Park",
    "Wapusk National Park",
    "Waterton Lakes National Park",
    "Wood Buffalo National Park",
    "Yoho National Park"];

$provincialList = [
    "Mount Robson Provincial Park",
    "Hamber Provincial Park",
    "Tatshenshini-Alsek Provincial Park",
    "Mount Assiniboine Provincial Park",
    "Whiteshell Provincial Park",
    "Boyne Valley Provincial Park",
    "Mono Cliffs Provincial Park",
    "Dividing Lake Provincial Park",
    "Silent Lake Provincial Park",
    "Lake St. Peter Provincial Park",
    "Balsam Lake Provincial Park",
    "Emily Provincial Park",
    "Indian Point Provincial Park",
    "Queen Elizabeth II Wildlands Provincial Park",
    "Ferris Provincial Park",
    "Presqu'ile Provincial Park",
    "Arrowhead Provincial Park",
    "Big East River Provincial Park",
    "Bigwind Lake Provincial Park",
    "Gibson River Provincial Park",
    "Hardy Lake Provincial Park",
    "J. Albert Bauer Provincial Park",
    "Oxtongue River-Ragged Falls Provincial Park",
    "Six Mile Lake Provincial Park",
    "Kawartha Highlands Provincial Park",
    "Mark S. Burnham Provincial Park",
    "Petroglyphs Provincial Park",
    "Quackenbush Provincial Park",
    "Wolf Island Provincial Park",
    "Lake on the Mountain Provincial Park",
    "North Beach Provincial Park",
    "Sandbanks Provincial Park",
    "Awenda Provincial Park",
    "Bass Lake Provincial Park",
    "Beattie Pinery Provincial Park",
    "Devil's Glen Provincial Park",
    "Earl Rowe Provincial Park",
    "Mara Provincial Park",
    "McRae Point Provincial Park",
    "Springwater Provincial Park",
    "Wasaga Beach Provincial Park",
    "Waubaushene Beaches Provincial Park"]

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Final API project</title>
		<link href="css/style.css" type="text/css" rel="stylesheet"/>
        <script src="http://code.jquery.com/jquery-3.3.1.min.js"  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="  crossorigin="anonymous"></script>
		<script src="js/myscript.js" type="text/javascript"></script>
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
                                    <option value="<?php echo $park ?>"><?php echo $park ?></option><?php endforeach ?>
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
            <small>HTTP 5203 - Final Project (Paul Ooi, <?php echo date('Y')?>)</small>
		</footer>
        <script defer type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmze1ztMRH_0Jougry8_lH1DozHPkYhtU&libraries=places&callback=initMap"></script>
	</body>
</html>
