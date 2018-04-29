<?php
require_once "weatherFunctions.php";

//USE THIS PAGE TO GATHER THE NAMES OF THE PARKS --NEED HELP TO PULL WIKI DATA

//GET PAGE FROM WIKIPEDIA
$url ="https://en.wikipedia.org/api/rest_v1/page/segments/List_of_National_Parks_of_Canada";
$results = getResults($url);

// echo "<pre>";
// var_dump($results);
echo ($results->segmentedContent);
// echo "</pre>";


?>

<script src="http://code.jquery.com/jquery-3.3.1.min.js"  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="  crossorigin="anonymous"></script>
<script>

//GRAB LIST OF NATIONAL PARKS
    data = $("#847 li a").toArray();
    var list = [];
    data.forEach(park => {
        // console.log(park.title);
        let name = park.title;
        if (!name.includes("Reserve")) {
            list.push(name);
        }
    });
    let nationalJSON = JSON.stringify(list);
</script>
    
    
    <?php
    //GRAB LIST OF PARKS FROM CENTRAL ONTARIO
        $url = "https://en.wikipedia.org/api/rest_v1/page/segments/List_of_provincial_parks_of_Central_Ontario";
        
        $results = getResults($url);
        echo ($results->segmentedContent);
    ?>

    <script>
    data = $(".cx-link").toArray();
    list = [];
    data.forEach(park => {
        console.log(park.title);
        let name = park.title;
        if (name.includes("Provincial Park") && !name.includes("Reserve")) {
            list.push(name);
        }
    });
    let provincialJSON = JSON.stringify(list);

    //OUTPUT TO THE BROWSER
    document.write(nationalJSON);
    document.write(provincialJSON);
    </script>