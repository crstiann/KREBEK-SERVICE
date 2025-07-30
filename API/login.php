<?php
header("Access-Control-Allow-Origin: *"); // atau ganti * dengan http://localhost:8100
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Tangani preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'config.php';
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = md5($data->password);

$result = mysqli_query($conn, "SELECT * FROM users WHERE email='$email' AND password='$password'");
$user = mysqli_fetch_assoc($result);

if ($user) {
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false]);
}
?>
