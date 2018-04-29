<?php
include "connexion.php";
header("Content-Type: application/json; charset=UTF-8");

$ctr = 0;
if(isset($_GET['numero']) && isset($_GET['reponses'])){
  $numero = $_GET['numero'];
  $reponses = $_GET['reponses'];

  // Récupère la question en base
  $sql = $db->prepare('SELECT * from question WHERE numero = ?');
  $sql->execute([$numero]);
  $ligne = $sql->fetch(PDO::FETCH_ASSOC);
  $sql->closeCursor();

  // Si la question existe bien
  if(!empty($ligne)){
    // On vérifie les réponses une par une.
    // Attention, les indices des noms vont de 1 à 4
    // alors que les indices des réponses vont de 0 à 3 !
    for($i=1; $i<5; $i++){
      if(md5($ligne["nom$i"]) == $reponses[$i-1])
        $ctr++;
    }
  }
}
// Ne renvoie d'un nombre, sans structure particulière
echo $ctr;
die();
?>
