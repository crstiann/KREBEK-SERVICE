<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->nama)) {
    $nama = mysqli_real_escape_string($conn, $data->nama);
    $query = "INSERT INTO layanan (nama) VALUES ('$nama')";
    mysqli_query($conn, $query);

    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Nama layanan kosong"]);
}
?>
