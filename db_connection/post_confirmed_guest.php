<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "admin_db"; // Update with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve POST data
$data = json_decode(file_get_contents('php://input'), true);

$guestName = $data['guestName'];
$guestEmail = $data['guestEmail'];
$hoName = $data['hoName'];
$hoHousenum = $data['hoHousenum'];
$otp = $data['otp'];
$validity = $data['validity'];
$contact = $data['guestContact'];

// Update status in visits table
$updateQuery = "UPDATE visits SET status='CONFIRMED' WHERE Guest_name='$guestName' AND Guest_email='$guestEmail'";
if (!$conn->query($updateQuery)) {
    echo "Error updating record: " . $conn->error;
}

// Insert into accepted_guest table
$insertQuery = "INSERT INTO accepted_guest (HO_name, Guest_name, OTP, Date_confirmed, Validity) VALUES ('$hoName', '$guestName', '$otp', NOW(), '$validity')";
if (!$conn->query($insertQuery)) {
    echo "Error inserting record: " . $conn->error;
}

// Include PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Enable verbose debug output
    $mail->SMTPDebug = 2; // or 4 for even more detailed output
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = '21-76937@g.batstate-u.edu.ph';
    $mail->Password = 'jepq uyqt wbdj tnyo';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    // Recipients
    $mail->setFrom('21-76937@g.batstate-u.edu.ph', 'No Reply');
    $mail->addAddress($guestEmail, $guestName); // Add recipient

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Guest Entry Confirmation';

    $message = "
    <html>
    <head>
      <title>Guest Entry Confirmation</title>
    </head>
    <body>
      <p>Dear $guestName,</p>
      <p>Your guest entry has been confirmed.</p>
      <p><strong>Home Owner Name:</strong> $hoName</p>
      <p><strong>Valid Until:</strong> $validity</p>
      <p><strong>OTP:</strong> $otp</p>
      <p>Thank you!</p>
    </body>
    </html>
    ";

    $mail->Body = $message;

    if($mail->send()) {
        echo "Email sent successfully";
    } else {
        echo "Email not sent. Error: " . $mail->ErrorInfo;
    }
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
