<?php
    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "admin_db");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $username = $DecodedData['email'];
    $password = $DecodedData['password'];

    $query = "SELECT * FROM accounts WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($CN, $query);
    
    if (mysqli_num_rows($result) > 0) {
        $Message = "Login successful";
        $Response = array("Message" => $Message, "Status" => true);
    } else {
        $Message = "Invalid username or password";
        $Response = array("Message" => $Message, "Status" => false);
    }

    echo json_encode($Response);
?>