<?php
$CN = mysqli_connect("localhost", "root", "", "admin_db");

if (!$CN) {
    die("Connection failed: " . mysqli_connect_error());
}

$query = "SELECT `HO_name`, `HO_housenum`, `Guest_name`, `Guest_email`, `message` FROM `visits`";
$result = mysqli_query($CN, $query);

if (mysqli_num_rows($result) > 0) {
    $announcements = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $announcements[] = $row;
    }
    $Message = "Data retrieved successfully";
    $Response = array("Message" => $Message, "Status" => true, "Data" => $announcements);
} else {
    $Message = "No data found";
    $Response = array("Message" => $Message, "Status" => false);
}

echo json_encode($Response);

mysqli_close($CN);
?>
