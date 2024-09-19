<?php
    $CN = mysqli_connect("localhost", "root", "", "admin_db");

    if (!$CN) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Get JSON input data
    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $username = $DecodedData['username'];
    $password = $DecodedData['password'];

    // Use a prepared statement to prevent SQL injection
    $query = "SELECT guard_id, username, password FROM guard_info WHERE username = ?";
    $stmt = $CN->prepare($query);
    $stmt->bind_param("s", $username); // Bind username parameter
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any result is returned
    if ($result->num_rows > 0) {
        $userData = $result->fetch_assoc();
        
        // Direct password comparison (if not using hashing)
        if ($password === $userData['password']) {
            // Generate a session key (you can use more complex methods)
            $sessionKey = bin2hex(random_bytes(16));

            // Add session key to the response
            $userData['sessionKey'] = $sessionKey;

            $Message = "Login successful";
            $Response = array("Message" => $Message, "Status" => true, "userData" => $userData);
        } else {
            $Message = "Invalid username or password";
            $Response = array("Message" => $Message, "Status" => false);
        }
    } else {
        $Message = "Invalid username or password";
        $Response = array("Message" => $Message, "Status" => false);
    }

    // Return the JSON response
    echo json_encode($Response);

    // Close the connection
    $stmt->close();
    $CN->close();
?>
