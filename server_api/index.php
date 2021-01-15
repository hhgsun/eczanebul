<?php
// GÜNLÜK OLARAK AŞAĞIDAKİ LİNKE GİDER VE VERİLERİ ALIR
// LİNKE İSTEK YAPILDIĞI ZAMAN EĞER DAHA ÖNCE DATALAR ALINDI İSE CACHE KLASÖRÜNDEN VERİLER ALINIR
// HER DEFASINDA LİNKE GİTMEMEK İÇİN

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

const CACHE_DIR = 'cache';

$cacheFile = CACHE_DIR . '/' . date('Y-m-d') . '.json';
if (file_exists($cacheFile)) {
  $res = file_get_contents($cacheFile);
  //echo $res;
  out_app($res);
} else {
  $url = "https://eczaneleri.net/api/eczane-api?demo=1&type=json";
  $res = file_get_contents($url);
  file_put_contents(CACHE_DIR . '/' . date('Y-m-d') . '.json', $res);
  //echo $res;
  out_app($res);
}


function out_app($res)
{
  $json = json_decode($res, true);
  $data = $json['data'];

  $cities = array();

  foreach ($data as $city) {
    $areas = array();

    if( isset($city['area']) && is_array($city['area']) ) {
      foreach ($city['area'] as $area) {

        $pharmacies = array();
        if( isset($area['pharmacy']) && is_array($area['pharmacy']) ) {
          foreach ($area['pharmacy'] as $phar) {
            $pharmacies[] = new Pharmacy($phar['name'], $phar['phone'], $phar['address'], $phar['maps']);
          }
        }

        $areas[] = new Area($area['areaName'], $area['countPharmacy'], $pharmacies);
      }
    }

    $cities[] = new City($city['CityID'], $city['CityName'], $city['countPharmacy'], $areas);
  }

  echo json_encode($cities);
}

class City{
  function __construct($id, $name, $count_pharmacy, $areas = array()){
    $this->id = $id;
    $this->name = $name;
    $this->count_pharmacy = $count_pharmacy;
    $this->areas = $areas;
  }
}

class Area
{
  function __construct($name, $count_pharmacy, $pharmacies) {
    $this->name = $name;
    $this->count_pharmacy = $count_pharmacy;
    $this->pharmacies = $pharmacies;
  }
}

class Pharmacy
{
  function __construct($name, $phone, $address, $coordinates){
    $this->name = $name;
    $this->phone = $phone;
    $this->address = $address;
    $this->coordinates = $coordinates;
  }
}
