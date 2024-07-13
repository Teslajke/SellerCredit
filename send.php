<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require './src/PHPMailer.php';
require './src/SMTP.php';
require './src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
$mail = new PHPMailer();

$mail->IsSMTP();
$mail->CharSet = 'UTF-8';

$mail->Host       = "smtp.yandex.ru";
$mail->SMTPDebug  = 0;
$mail->SMTPAuth   = true;
$mail->Port       = 587;
$mail->Username   = "pochta@yandex.ru";
$mail->Password   = "password";


$mail->setFrom('');   
$mail->addAddress('info@alt1.finance');

$mail->isHTML(true);
$mail->Subject = 'Новая заявка';
$mail->Body    = print_r($_POST, true);

$mail->send();

if(!$mail->send()){
    echo "Mailer Error: " . $mail->ErrorInfo;
}else{
    echo "Message sent!";
}