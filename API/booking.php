<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->service, $data->detail_service, $data->merk, $data->nopol, $data->nama,
          $data->alamat, $data->nohp, $data->jadwal)
) {
    $service = mysqli_real_escape_string($conn, $data->service);
    $detail_service = mysqli_real_escape_string($conn, $data->detail_service);
    $merk = mysqli_real_escape_string($conn, $data->merk);
    $nopol = mysqli_real_escape_string($conn, $data->nopol);
    $nama = mysqli_real_escape_string($conn, $data->nama);
    $alamat = mysqli_real_escape_string($conn, $data->alamat);
    $nohp = mysqli_real_escape_string($conn, $data->nohp);
    $jadwal = mysqli_real_escape_string($conn, $data->jadwal);
    $notes = isset($data->notes) ? mysqli_real_escape_string($conn, $data->notes) : ''; // ✅ Tambah notes
    $status = 'Menunggu';

    $query = "INSERT INTO bookings (service, detail_service, merk, nopol, nama, alamat, nohp, jadwal, notes, status) 
              VALUES ('$service', '$detail_service', '$merk', '$nopol', '$nama', '$alamat', '$nohp', '$jadwal', '$notes', '$status')";

    $result = mysqli_query($conn, $query);

    echo json_encode([
        "success" => $result ? true : false,
        "message" => $result ? "Booking berhasil" : "Gagal menyimpan booking"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Data tidak lengkap"
    ]);
}
?>
