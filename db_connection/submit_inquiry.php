<?php
// Database connection
$host = 'localhost'; // Your database host
$db = 'admin_db'; // Replace with your database name
$user = 'root'; // Replace with your database username
$pass = ''; // Replace with your database password

$conn = new mysqli($host, $user, $pass, $db);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['homeowner_id']) && isset($data['name']) && isset($data['address'])) {
    $homeowner_id = $data['homeowner_id'];
    $name = $conn->real_escape_string($data['name']);
    $address = $conn->real_escape_string($data['address']);

    // Insert the inquiry into the database
    $insertQuery = "INSERT INTO ho_query (homeowner_id, username, address, date, time) VALUES ('$homeowner_id', '$name', '$address', NOW(), NOW())";

    if ($conn->query($insertQuery) === TRUE) {
        // Query the database to fetch the inquiry details after insertion
        $last_id = $conn->insert_id; // Get the last inserted ID

        $selectQuery = "SELECT HOQ_id, username, date, time FROM ho_query WHERE HOQ_id = '$last_id'";
        $result = $conn->query($selectQuery);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Send response with inquiry details
            echo json_encode([
                'success' => true,
                'message' => 'Inquiry submitted successfully',
                'data' => $row
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Inquiry submitted, but could not retrieve details'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error submitting inquiry: ' . $conn->error
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Incomplete request data'
    ]);
}

$conn->close();
?>
