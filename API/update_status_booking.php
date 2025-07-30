<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id, $data->status)) {
    $id = intval($data->id);
    $status = mysqli_real_escape_string($conn, $data->status);
    mysqli_query($conn, "UPDATE bookings SET status = '$status' WHERE id = $id");

    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
}
?>
