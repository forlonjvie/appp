<?php
// Prevent any warning or notice from leaking into the JSON response
error_reporting(0);
header('Content-Type: application/json');

// Database connection
$CN = mysqli_connect("localhost", "root", "", "admin_db");

if (!$CN) {
    $Response = array("Message" => "Database connection failed", "Status" => false);
    echo json_encode($Response);
    exit();
}

// Fetch the latest homeowner query details from the database
$query = "SELECT HOQ_id, homeowner_id, username, address, date, time FROM ho_query ORDER BY HOQ_id DESC LIMIT 1";

$result = mysqli_query($CN, $query);

if (mysqli_num_rows($result) > 0) {
    $homeOwnerData = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $homeOwnerData[] = $row;
    }
    $Message = "Homeowner details fetched successfully";
    $Response = array("Message" => $Message, "Status" => true, "Data" => $homeOwnerData);
} else {
    $Message = "No homeowner data found";
    $Response = array("Message" => $Message, "Status" => false);
}

echo json_encode($Response);
?>
