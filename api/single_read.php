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

$item->id = isset($_GET['id']) ? $_GET['id'] : die();

$item->getSingleConference();

if ($item->title != null) {
    // create array
    $emp_arr = array(
        "id" => $item->id,
        "title" => $item->title,
        "country" => $item->country,
        "address" => $item->address,
        "date" => $item->date
    );

    http_response_code(200);
    echo json_encode($emp_arr);
} else {
    http_response_code(404);
    echo json_encode("Conference not found.");
}