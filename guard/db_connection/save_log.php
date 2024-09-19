<?php
// Prevent warnings or notices from leaking into the JSON response
error_reporting(0);
header('Content-Type: application/json');

// Database connection
$CN = mysqli_connect("localhost", "root", "", "admin_db");
$received_data = json_decode(file_get_contents("php://input"));
$name = $received_data->name; // Guest's OTP
$point = $received_data->point; // Entry or Exit
$date = date('Y-m-d');  // Current date
$time = date('H:i:s');  // Current time
$role = "guest";        // Assuming role is "guest"

if (!$CN) {
    $response = array("status" => "error", "message" => "Database connection failed");
    echo json_encode($response);
    exit();
}

// Insert log into the logs table
$query = "INSERT INTO logs (name, date, time, role, point) 
          VALUES ('$name', '$date', '$time', '$role', '$point')";

if (mysqli_query($CN, $query)) {
    $response = array("status" => "success", "message" => "Log saved successfully");
} else {
    $response = array("status" => "error", "message" => "Failed to save log");
}

echo json_encode($response);
?>
