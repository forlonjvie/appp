<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "admin_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Retrieve POST data from JSON request
$data = json_decode(file_get_contents('php://input'), true);

// Check if required fields are set
if (!isset($data['fname'], $data['lname'], $data['mid'], $data['hnum'], $data['email'], $data['contact'], $data['username'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit;
}

// Assign variables
$firstName = $data['fname'];
$lastName = $data['lname'];
$middleInitial = $data['mid'];
$houseNumber = $data['hnum'];
$email = $data['email'];
$contactNumber = $data['contact'];
$username = $data['username'];
//$password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash the password
$password = $data['password'];
// Insert into Home_Owner table
$stmtHomeOwner = $conn->prepare("INSERT INTO Home_Owner (username, Fname, Lname, hnum, con_num, email, mid_ini) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmtHomeOwner->bind_param("sssssss", $username, $firstName, $lastName, $houseNumber, $contactNumber, $email, $middleInitial);

if ($stmtHomeOwner->execute()) {
    // Insert into sampel_login table
    $stmtAccounts = $conn->prepare("INSERT INTO sampel_login (email, username, password) VALUES (?, ?, ?)");
    $stmtAccounts->bind_param("sss", $email, $username, $password);

    if ($stmtAccounts->execute()) {
        echo json_encode(["success" => true, "message" => "Data saved successfully in both tables."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error inserting into accounts table: " . $stmtAccounts->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Error inserting into Home_Owner table: " . $stmtHomeOwner->error]);
}

// Close database connection
$conn->close();
?>
