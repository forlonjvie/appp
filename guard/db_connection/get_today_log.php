<?php
// Prevent warnings or notices from leaking into the JSON response
error_reporting(0);
header('Content-Type: application/json');

// Database connection
$CN = mysqli_connect("localhost", "root", "", "admin_db");

if (!$CN) {
    $response = array("status" => "error", "message" => "Database connection failed");
    echo json_encode($response);
    exit();
}

// Get username from query string
$username = $_GET['username'];
$today = date('Y-m-d');

// Query to fetch the last log of the current day for the given guest from `logs` table
$query = "SELECT point FROM logs WHERE name = '$username' AND date = '$today' ORDER BY log_id DESC LIMIT 1";

$result = mysqli_query($CN, $query);

if (mysqli_num_rows($result) > 0) {
    $lastLog = mysqli_fetch_assoc($result);
    $response = array("status" => "success", "data" => [$lastLog]);
} else {
    $response = array("status" => "error", "message" => "No logs for today");
}

echo json_encode($response);
?>
