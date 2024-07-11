<?php
class PHP_Email_Form {
  public $to;
  public $from_name;
  public $from_email;
  public $subject;
  public $message;
  public $headers;
  public $smtp;

  public function add_message($content, $label, $length=0) {
    $this->message .= $label . ": " . trim($content) . "\n";
  }

  public function send() {
    if (isset($this->smtp)) {
      // Use SMTP to send emails
      // Implement SMTP sending here using $this->smtp
    } else {
      // Use PHP's mail function to send emails
      $this->headers = "From: " . $this->from_name . " <" . $this->from_email . ">\r\n";
      $this->headers .= "Reply-To: " . $this->from_email . "\r\n";
      $this->headers .= "MIME-Version: 1.0\r\n";
      $this->headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

      return mail($this->to, $this->subject, $this->message, $this->headers);
    }
  }
}
?>