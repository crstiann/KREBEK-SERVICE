<?php
header("Access-Control-Allow-Origin: *"); // ✅ Izinkan semua origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // ✅ Tambahkan ini juga
header("Access-Control-Allow-Headers: Content-Type");
include 'config.php';

$result = mysqli_query($conn, "SELECT * FROM layanan ORDER BY id DESC");

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>
