<?php

class Racer
{
  public $name;
  private $city;
  private $car;
  private $results;
  private $totalSum;
  
  public function __construct($name, $city, $car, $results)
  {
    $this->name = $name;
    $this->city = $city;
    $this->car = $car;
    $this->results = $results;
    $this->totalSum = array_sum($results);
  }
 
  public function getName()
  {
    return $this->name;
  }
 
  public function getCity()
  {
    return $this->city;
  }
 
  public function getCar()
  {
    return $this->car;
  }

  public function getResults()
  {
    return $this->results;
  }

  public function getTotalSum()
  {
    return $this->totalSum;
  }
}
    
?>

