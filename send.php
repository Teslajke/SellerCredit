<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require './src/PHPMailer.php';
require './src/SMTP.php';
require './src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
$mail = new PHPMailer();

$mail->CharSet = 'UTF-8';

$mail->IsSMTP(); // это включает SMTP. Вы не закомментировали, поэтому оно не работало
$mail->Host       = "smtp.yandex.ru";
$mail->SMTPDebug  = 0;
$mail->SMTPAuth   = true;
$mail->SMTPSecure = "ssl";
$mail->Port       = 465;
$mail->Username   = "roshchin@alt1.finance";
$mail->Password   = "yogrznsmnhjpunyv";


$mail->setFrom("roshchin@alt1.finance");   
$mail->addAddress('roshchin@alt1.finance');

$mail->isHTML(true);
$mail->Subject = 'Новая заявка';
$mail->Body    = print_r($_POST, true);

//$mail->send();
if(!$mail->send()){
    echo "Mailer Error: " . $mail->ErrorInfo;
}else{
    echo "Message sent!";
}