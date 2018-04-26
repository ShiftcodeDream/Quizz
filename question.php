<?php
include "connexion.php";
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['numero'])){
  $numero = $_GET['numero'];
  $sql = $db->prepare('SELECT * from question WHERE numero = ?');
  $sql->execute([$numero]);
  $ligne = $sql->fetch(PDO::FETCH_ASSOC);
  $sql->closeCursor();

  if(!empty($ligne)){
    echo json_encode($ligne);
  }else{
    http_response_code(404); // Erreur 404, la question n'existe pas (fin du quizz)
    die();
  }
}else{
  echo json_encode([]);
}
?>
