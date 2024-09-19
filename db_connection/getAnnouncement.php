<?php
$CN = mysqli_connect("localhost", "root", "", "admin_db");

$query = "SELECT `title`, `content` , `date_time` FROM `announcement`  ORDER BY `announcement`.`id` DESC";
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
?>
