<?php

$conn = mysqli_connect("localhost", "root", "", "service_motor");

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>
