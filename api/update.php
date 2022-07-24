<?php

namespace app\controllers;

use app\config\Database;
use app\models\Conference;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/conferences.php';

$database = new Database();
$db = $database->getConnection();

$item = new Conference($db);

$data = json_decode(file_get_contents("php://input"));

$item->id = $data->id;

// conference values
$item->title = $data->title;
$item->country = $data->country;
$item->address = $data->address;
$item->date = $data->date;

if ($item->updateConference()) {
    echo json_encode("Conference updated.");
} else {
    echo json_encode("Data could not be updated");
}