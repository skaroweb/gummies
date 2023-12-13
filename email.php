<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = $_POST["to"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $headers = "From: your_email@example.com"; // Replace with your email address

    if (mail($to, $subject, $message, $headers)) {
        echo "Your message has been sent. Thank you!";
    } else {
        echo "Email sending failed.";
    }
}
?>
