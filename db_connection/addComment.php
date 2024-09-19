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

// Validate post_id, username, and comment content
$postId = isset($data['postId']) ? intval($data['postId']) : 0;
$commentContent = isset($data['content']) ? trim($data['content']) : '';
$username = isset($data['username']) ? trim($data['username']) : '';

if ($postId <= 0 || empty($commentContent) || empty($username)) {
    echo json_encode([
        'Status' => false,
        'Message' => 'Invalid post ID, username, or comment content'
    ]);
    exit;
}

try {
    // Prepare the SQL query to insert a new comment
    $query = "INSERT INTO comments (content, created_at, post_id, HO_username) VALUES (?, NOW(), ?, ?)";
    $stmt = mysqli_prepare($CN, $query);

    if ($stmt === false) {
        throw new Exception('Failed to prepare SQL statement: ' . mysqli_error($CN));
    }

    // Bind parameters: comment content, post ID, and username
    mysqli_stmt_bind_param($stmt, 'sis', $commentContent, $postId, $username);

    // Execute the query
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode([
            'Status' => true,
            'Message' => 'Comment added successfully'
        ]);
    } else {
        echo json_encode([
            'Status' => false,
            'Message' => 'Error adding comment: ' . mysqli_stmt_error($stmt)
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
