<?php
include "connexion.php";
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['numero'])){
  // Récupère la question en base
  $numero = $_GET['numero'];
  $sql = $db->prepare('SELECT * from question WHERE numero = ?');
  $sql->execute([$numero]);
  $ligne = $sql->fetch(PDO::FETCH_ASSOC);
  $sql->closeCursor();

  // Si la question a été trouvée en base, on construit
  // la structure de données à renvoyer
  if(!empty($ligne)){
    $r = new stdClass();
    $r->numero = $ligne['numero'];
    $r->question = $ligne['question'];
    $r->definitions = array();
    $t->reponses = array();
    for($i=1; $i<5; $i++){
      $r->definitions[] = $ligne["def$i"];
      $rep = $ligne["nom$i"];
      $r->reponses[] = ['nom' => $rep, 'id' => md5($rep)];
    }
    // Fonction PHP bien pratique pour mélanger les questions
    shuffle($r->reponses);
    // Renvoie le résultat
    echo json_encode($r);
  }else{
    // Lorsque la dernière question a été atteinte, on lance une erreur 404 pour indiquer la fin du quizz
    http_response_code(404);
    die();
  }
}else{
  echo json_encode([]);
}
?>
