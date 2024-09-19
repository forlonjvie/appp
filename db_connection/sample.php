<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
// Collect form data
$guestName = $_POST['guestName'];
$guestEmail = $_POST['guestEmail'];
$hoName = $_POST['hoName'];
$hoHousenum = $_POST['hoHousenum'];
$otp = mt_rand(100000, 999999);  // Generates a random 6-digit number

$validity = date('Y-m-d', strtotime('+1 day')); // Valid for 1 day

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
      <p><strong>House Number:</strong> $hoHousenum</p>
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
