<?php $name = $_POST['name'];
$email = $_POST['email'];
$emailText = $_POST['emailText'];
$formcontent="$emailText";
$recipient = "dorianwilczynski1@gmail.com";
$subject = "Wiadomość od $name - Dorian Wilczyński";
$headers = 'From: ' . $email . "\r\n";
$headers .= 'Content-Type: text/HTML; charset=utf-8' . "\r\n";
mail($recipient, $subject, $formcontent, $headers) or die("Error!");
echo "Dziękuję! Kliknij wstecz aby powrócić na stronę główną.";
?>