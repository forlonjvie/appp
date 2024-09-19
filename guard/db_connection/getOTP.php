<?php
// Prevent any warning or notice from leaking into the JSON response
error_reporting(0);
header('Content-Type: application/json');

// Database connection
$CN = mysqli_connect("localhost", "root", "", "admin_db");
$received_data = json_decode(file_get_contents("php://input"));
$otp = $received_data->otp;

if (!$CN) {
    $Response = array("Message" => "Database connection failed", "Status" => false);
    echo json_encode($Response);
    exit();
}

// Fetch OTP from the database
$query = "SELECT `AG_id`, `HO_name`, `guest_name`, `OTP`, `Date_confirmed`, `Validity` 
          FROM `accepted_guest` WHERE `OTP` = '$otp'";

$result = mysqli_query($CN, $query);

if (mysqli_num_rows($result) > 0) {
    $otpData = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $otpData[] = $row;
    }
    $Message = "OTP verified successfully";
    $Response = array("Message" => $Message, "Status" => true, "Data" => $otpData);
} else {
    $Message = "Invalid OTP";
    $Response = array("Message" => $Message, "Status" => false);
}

echo json_encode($Response);
?>
