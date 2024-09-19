<?php
$CN = mysqli_connect("localhost", "root", "", "admin_db");

$post_id = $_POST['post_id'];
$ho_id = $_POST['HO_Id'];
$content = $_POST['content'];

$query = "INSERT INTO Comments (content, post_id, HO_Id) VALUES ('$content', $post_id, $ho_id)";

if (mysqli_query($CN, $query)) {
    $Message = "Comment added successfully";
    $Response = array("Message" => $Message, "Status" => true);
} else {
    $Message = "Error adding comment";
    $Response = array("Message" => $Message, "Status" => false);
}

echo json_encode($Response);
?>
