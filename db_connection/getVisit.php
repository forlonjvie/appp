<?php
$CN = mysqli_connect("localhost", "root", "", "admin_db");

if (!$CN) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get the username from the query parameter
$username = $_GET['username']; 

// Query to exclude records where status = 'CONFIRMED'
$query = "SELECT `id`, `HO_name`, `HO_housenum`, `Guest_name`, `Guest_email`, `message`, `guest_contact`, `guest_add`, `status` , `relation`  , `visit_date`
          FROM `visits` 
          WHERE `HO_name` = ? AND `status` != 'CONFIRMED'";

$stmt = $CN->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Check if any guest records are found
if ($result->num_rows > 0) {
    $guests = [];
    while ($row = $result->fetch_assoc()) {
        $guests[] = $row;
    }
    echo json_encode($guests);
} else {
    echo json_encode(["error" => "No Visitor"]);
}

// Close the statement and connection
$stmt->close();
$CN->close();
?>
