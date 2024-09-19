<?php
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

// Get postId from the query string
$postId = isset($_GET['postId']) ? intval($_GET['postId']) : 0;

if ($postId <= 0) {
    echo json_encode([
        'Status' => false,
        'Message' => 'Invalid post ID'
    ]);
    exit;
}

try {
    // Prepare the SQL query to fetch the comments related to the post
    $query = "SELECT comment_id, content, created_at, HO_username FROM comments WHERE post_id = ? ORDER BY created_at ASC";
    $stmt = mysqli_prepare($CN, $query);

    if ($stmt === false) {
        throw new Exception('Failed to prepare SQL statement');
    }

    // Bind parameters
    mysqli_stmt_bind_param($stmt, 'i', $postId);

    // Execute the query
    mysqli_stmt_execute($stmt);

    // Get the result
    $result = mysqli_stmt_get_result($stmt);
    $comments = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if ($comments) {
        echo json_encode([
            'Status' => true,
            'Data' => $comments
        ]);
    } else {
        echo json_encode([
            'Status' => false,
            'Message' => 'No comments found for this post'
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
