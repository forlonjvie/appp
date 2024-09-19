<?php
$CN = mysqli_connect("localhost", "root", "", "admin_db");

// Check the connection
if (!$CN) {
    die("Connection failed: " . mysqli_connect_error());
}

$query = "SELECT `AG_id`, `HO_name`, `Guest_name`, `OTP`, `Date_confirmed`, `Validity` 
          FROM `accepted_guest`"; // Fixed the query

// Prepare and execute the query
if ($stmt = $CN->prepare($query)) {
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

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(["error" => "Query preparation failed"]);
}

// Close the connection
$CN->close();
?>
