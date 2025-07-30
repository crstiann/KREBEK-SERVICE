<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';

$now = date('Y-m-d H:i:s');


$sql = "UPDATE bookings
        SET status = 'Dibatalkan' 
        WHERE status = 'Menunggu' 
        AND TIMESTAMPDIFF(MINUTE, created_at, '$now') > 5";

mysqli_query($conn, $sql);


echo json_encode([
    "success" => true,
    "message" => "Booking yang melebihi waktu tunggu dibatalkan secara otomatis"
]);
