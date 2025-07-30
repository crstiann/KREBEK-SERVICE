<?php
header("Access-Control-Allow-Origin: *"); // ✅ Izinkan semua origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // ✅ Tambahkan ini juga
header("Access-Control-Allow-Headers: Content-Type");
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = intval($data->id);
    mysqli_query($conn, "DELETE FROM bookings WHERE id = $id");
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
