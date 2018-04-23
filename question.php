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
    http_response_code(204); // Résultat vide, la question n'existe pas
  }
}else{
  echo json_encode([]);
}
?>
