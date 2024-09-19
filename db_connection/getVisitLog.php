<?php
$CN = mysqli_connect("localhost", "root", "", "admin_db");

if (!$CN) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get the username from the query parameter
$username = $_GET['username']; 

// Updated query to only include rows where status is 'CONFIRMED' or 'DENY'
$query = "SELECT `HO_name`, `HO_housenum`, `Guest_name`, `Guest_email`, `message`, `guest_contact`, `guest_add` , `relation`
          FROM `visits` 
          WHERE `HO_name` = ? AND `status` IN ('CONFIRMED', 'DENY')";

$stmt = $CN->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Fetch and return the result
if ($result->num_rows > 0) {
    $guests = [];
    while ($row = $result->fetch_assoc()) {
        $guests[] = $row;
    }
    echo json_encode($guests);
} else {
    echo json_encode(["error" => "No guests found"]);
}

// Close the statement and connection
$stmt->close();
$CN->close();
?>
