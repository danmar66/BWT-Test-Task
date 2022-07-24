<?php

namespace app\controllers;

use app\config\Database;
use app\models\Conference;
use PDO;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/conferences.php';

$database = new Database();
$db = $database->getConnection();

$items = new Conference($db);

$stmt = $items->getConferences();
$itemCount = $stmt->rowCount();


echo json_encode($itemCount);

if ($itemCount > 0) {

    $conferencesArr = array();
    $conferencesArr["body"] = array();
    $conferencesArr["itemCount"] = $itemCount;

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = array(
            "id" => $id,
            "title" => $title,
            "country" => $country,
            "address" => $address,
            "date" => $date
        );

        $conferencesArr["body"][] = $e;
    }
    echo json_encode($conferencesArr);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No record found.")
    );
}