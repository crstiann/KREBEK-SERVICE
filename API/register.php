<?php
header("Access-Control-Allow-Origin: *"); // * = izinkan semua asal (juga bisa disetel ke spesifik seperti http://localhost:8100)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Cek jika request OPTIONS (preflight), langsung exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'config.php';


$input = file_get_contents("php://input");
$data = json_decode($input);

if ($data && isset($data->name, $data->email, $data->password, $data->phone)) {
    $name = $data->name;
    $email = $data->email;
    $password = md5($data->password);
    $phone = $data->phone;

    $result = mysqli_query($conn, "INSERT INTO users(name,email,password,phone) VALUES('$name','$email','$password','$phone')");

    echo json_encode(["success" => $result ? true : false]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}
?>
