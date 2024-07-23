<?php
$CN = mysqli_connect("localhost", "root", "", "admin_db");

if (!$CN) {
    die("Connection failed: " . mysqli_connect_error());
}

$email = $_POST['email'];

$query = "SELECT `id`, `Name`, `Contact_Number`, `Address`, `role`, `email`, `username`, `password` FROM `accounts` WHERE `email` = '$email'";
$result = mysqli_query($CN, $query);

if (mysqli_num_rows($result) > 0) {
    $userData = mysqli_fetch_assoc($result);
    $Message = "Data retrieved successfully";
    $Response = array("Message" => $Message, "Status" => true, "userData" => $userData);
} else {
    $Message = "No data found";
    $Response = array("Message" => $Message, "Status" => false);
}

echo json_encode($Response);

mysqli_close($CN);
?>
