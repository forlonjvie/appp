<?php
// Prevent warnings or notices from leaking into the JSON response
error_reporting(0);
header('Content-Type: application/json');

// Database connection
$CN = mysqli_connect("localhost", "root", "", "admin_db");
$received_data = json_decode(file_get_contents("php://input"));

// Check if data is received
if ($received_data) {
    $name = $received_data->name;
    $point = $received_data->point;  // Entry or Exit
    $date = date('Y-m-d');  // Current date
    $time = date('H:i:s');  // Current time
    $role = "HomeOwner";  // Assuming role is HomeOwner

    if (!$CN) {
        $Response["status"] = "error";
        $Response["message"] = "Database connection failed.";
    } else {
        // Query to insert log data into the `logs` table
        $sql = "INSERT INTO logs (name, point, role, date, time) 
                VALUES ('$name', '$point', '$role', '$date', '$time')";

        if (mysqli_query($CN, $sql)) {
            $Response["status"] = "success";
            $Response["message"] = "Log saved successfully.";
        } else {
            $Response["status"] = "error";
            $Response["message"] = "Failed to save log.";
        }
    }
} else {
    $Response["status"] = "error";
    $Response["message"] = "No data received.";
}

// Output the response in JSON format
echo json_encode($Response);
?>
