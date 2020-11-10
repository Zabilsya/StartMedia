<?php

    include('racer.php');

    $cars = file_get_contents('../data_cars.json');
    $participants = json_decode($cars, true);
    $participants = array_values($participants);
    usort($participants, function($a, $b){
        return ($a['id'] - $b['id']);
    });

    $attempts = file_get_contents('../data_attempts.json');
    $races = json_decode($attempts, true);
    $races = array_values($races);

    $racers = array();

    for ($i = 0; $i < count($participants); $i++) {
        $results = array();
        for ($j = 0; $j < count($races); $j++) {
            if ($participants[$i]["id"] === $races[$j]["id"]) {
                array_push($results, $races[$j]["result"]);  
            }
        }
        global $racers;
        $racer = new Racer($participants[$i]["name"], $participants[$i]["city"], $participants[$i]["car"], $results);
        array_push($racers, $racer);
    }

    $output = array();
    foreach ($racers as $item) {
        $output[] = array('name' => $item->getName(), 'city' => $item->getCity(), 'car' => $item->getCar(), 
        'results' => $item->getResults(), 'totalSum' => $item->getTotalSum());
    }

    echo json_encode($output) ;

?>
