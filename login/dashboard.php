<?php
// Cek apakah form login telah disubmit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Periksa kredensial
    $username = "admin";
    $password = "jayapura6";

    // Periksa apakah username dan password yang dimasukkan sesuai
    if ($_POST["username"] == $username && $_POST["password"] == $password) {
        // Redirect ke halaman dashboard atau halaman selanjutnya setelah login berhasil
        header("Location: dashboard.php");
        exit;
    } else {
        // Jika kredensial tidak sesuai, tampilkan pesan error
        $error = "Username atau password salah.";
    }
}
?>
