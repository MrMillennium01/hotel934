<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="hotel934.php" method="post">
        <fieldset>
            <label for="name">Name: <input type="text" name="name"></label>
            <label for="email">E-Mail: <input type="email" name="email"></label>
            <label for="telephone-number">Telephone Number: <input type="tel" name="telephone-number"></label>
            <label for="check-in-date">Check-In Date: <input type="date" name="check-in-date"></label>
            <label for="check-out-date">Ckeck-Out Date: <input type="date" name="check-out-date"></label>
            <label for="address">Address: <input type="text" name="address"></label>
            <label for="remark">Remark: <input type="text" name="remark"></label>
        </fieldset>
        <input type="submit" value="Submit" name="submit-button">
    </form>
</body>

</html>


<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// echo $_POST["submit-button"];

if (isset($_POST["submit-button"])) {
    /* mail("linyi.li@outlook.de", "Hello World", "Hi! My name is {$_POST["first-name"]}");
    echo "\n Sent"; */

    $name = $_POST["name"];
    $email = $_POST["email"];
    $tel = $_POST["telephone-number"];
    $checkin = $_POST["check-in-date"];
    $checkout = $_POST["check-out-date"];
    $address = $_POST["address"];
    $remark = $_POST["remark"];
    echo "{$email}, {$name}";

    // some code found on stackoverflow

    // require 'PHPMailerAutoload.php';

    $mail = new PHPMailer(true);

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp-mail.outlook.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'linyi.li@outlook.de';                 // SMTP username
    $mail->Password = 'HelloWorld';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

    $mail->From = 'linyi.li@outlook.de';
    $mail->FromName = 'Linyi Li';
    $mail->addAddress('linyi.li@outlook.de', 'Linyi Li');     // Add a recipient      // Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // $mail->WordWrap = 50;                                 // Set word wrap to 50 characters
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    // $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Guest-Inquiery';
    $mail->Body    = "
    Name: {$name} <br>
    E-Mail: {$email} <br>
    Telephone-Number: {$tel} <br>
    Check-in Date: {$checkin} <br>
    Check-out Date: {$checkout} <br>
    Address: {$address} <br>
    Remark: {$remark} <br>
    ";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    // Sending confirmation e-mail

    /*
    $mail2 = new PHPMailer(true);

    $mail2->isSMTP();                                      // Set mailer to use SMTP
    $mail2->Host = 'smtp-mail.outlook.com';  // Specify main and backup SMTP servers
    $mail2->SMTPAuth = true;                               // Enable SMTP authentication
    $mail2->Username = 'linyi.li@outlook.de';                 // SMTP username
    $mail2->Password = 'HelloWorld';                           // SMTP password
    $mail2->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

    $mail2->From = 'linyi.li@outlook.de';
    $mail2->FromName = 'Linyi Li';
    $mail2->addAddress($email, $name);     // Add a recipient      // Name is optional

    $mail2->Subject = 'Eingangsbestaetigung/Confirmation';
    $mail2->Body    = "
    Ihre Anfrage ist angekommen! Wir werden sie so schnell wie möglich beantworten! <br>
    <br>
    Mit freundlichen Grüßen <br>
    Ihr Hotel Neun 3/4 aus Celle";
    $mail2->AltBody = 'This is the body in plain text for non-HTML mail clients';
    */

    if (!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
        //echo 'Mailer Error: ' . $mail2->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
} else {
    echo "no lol";
}
