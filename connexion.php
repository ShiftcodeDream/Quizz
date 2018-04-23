<?php
$serveur = "localhost";
$database = "quizz";
$login = "quizz";
$password = "quizz";

$db = new PDO("mysql:host=$serveur;dbname=$database;charset=utf8", $login, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>
