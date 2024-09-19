<?php
include '../components/connect.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if (isset($_POST['update_payment']) && $_POST['payment_status'] === "completed") {
    $recipient_email = $_POST['recipient_email'];
    $payment_status = $_POST['payment_status'];
    $order_id = $_POST['order_id']; // Retrieve the product ID

    // Update payment status in orders table
    $update_status = $conn->prepare("UPDATE `orders` SET payment_status = ? WHERE id = ?");
    $success = $update_status->execute([$payment_status, $order_id]);

    try {
        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = '21-76937@g.batstate-u.edu.ph';
        $mail->Password = 'uofruvtrnrktrhkc';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
    
        // Set SMTPDebug to 0 to disable debugging
        $mail->SMTPDebug = 0;

        $mail->addAddress($recipient_email, 'Recipient Name'); // set the recipient email
        $mail->isHTML(true);
        $mail->Subject = 'Payment Update and Order Confirmation';

        // Additional details
        $orderDetails = "
            <p>Dear valued {$_POST['recipient_name']},</p>
            <p>Thank you for your purchase!</p>
            <p>Order Details:</p>
            <ul>
                <li>Payment Method: {$_POST['payment_method']}</li>
                <li>Total Amount: {$_POST['total_amount']} pesos</li>
                <li>Order Date: {$_POST['order_date']}</li>
            </ul>
            <p>Products Purchased:</p>";

        // Retrieve order details from orderdetails table based on order_id
        $orderDetailsQuery = $conn->prepare("SELECT `name`, `price`, `quantity`, `total`, `image` FROM `orderdetails` WHERE `order_id` = ?");
        $orderDetailsQuery->execute([$order_id]);
        $products = $orderDetailsQuery->fetchAll(PDO::FETCH_ASSOC);

        foreach ($products as $product) {
            $orderDetails .= "
                <ul>
                    <li>{$product['name']}</li>
                    <li>Price: {$product['price']} pesos</li>
                    <li>Quantity: {$product['quantity']}</li>
                    <li>Total: {$product['total']} pesos</li>
                    <li>Image: {$product['image']}</li>
                </ul>";
        }

        $orderDetails .= "
            <p>Your order has been successfully completed. Please wait for your order to be delivered.</p>
            <p>We appreciate your business and look forward to serving you again.</p>
            <p>Best regards,<br>Hermies Motor Shop</p>
        ";

        $mail->Body = $orderDetails;

        $mail->send();
        echo '<script>alert("Receipt Senr Successfully");</script>';
        header('location:placedorder.php');
        
        
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
