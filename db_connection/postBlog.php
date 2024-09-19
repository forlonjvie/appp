<?php
header('Content-Type: application/json');

// Include your database connection file
$CN = mysqli_connect("localhost", "root", "", "admin_db");

// Check the database connection
if (!$CN) {
    echo json_encode([
        'Status' => false,
        'Message' => 'Database connection failed'
    ]);
    exit;
}

// Get the JSON input data
$data = json_decode(file_get_contents('php://input'), true);

// Validate title, description, and username
$title = isset($data['title']) ? trim($data['title']) : '';
$description = isset($data['description']) ? trim($data['description']) : '';
$username = isset($data['username']) ? trim($data['username']) : '';

if (empty($title) || empty($description) || empty($username)) {
    echo json_encode([
        'Status' => false,
        'Message' => 'Invalid title, description, or username'
    ]);
    exit;
}

try {
    // Prepare the SQL query to insert a new blog post
    $query = "INSERT INTO posts (title, content, created_at, HO_username) VALUES (?, ?, NOW(), ?)";
    $stmt = mysqli_prepare($CN, $query);

    if ($stmt === false) {
        throw new Exception('Failed to prepare SQL statement: ' . mysqli_error($CN));
    }

    // Bind parameters: title, description, and username
    mysqli_stmt_bind_param($stmt, 'sss', $title, $description, $username);

    // Execute the query
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode([
            'Status' => true,
            'Message' => 'Post added successfully'
        ]);
    } else {
        echo json_encode([
            'Status' => false,
            'Message' => 'Error adding post: ' . mysqli_stmt_error($stmt)
        ]);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} catch (Exception $e) {
    echo json_encode([
        'Status' => false,
        'Message' => 'Error: ' . $e->getMessage()
    ]);
}

// Close the database connection
mysqli_close($CN);
?>
