var numeroQuestion = 0;
var score = 0;
var question;
var reponsesDonnees = 0; // Compteur de réponses actuellement données pour la question en cours
var optionsDraggable = {
  opacity: 0.5,
  revert: 'invalid',
  cursor: 'grab',
};
var optionsDroppable = {
  accept: '.reponse',
  over: function(e, ui){$(e.target).addClass("highlight")},
  out: function(e, ui){$(e.target).removeClass("highlight")},
  drop: elementDrop,
};
var vitesseFondu = 800;

// Initialisations
$(function(){
  questionSuivante();
  $("#boutonValider").click(validerReponses);
})

// Vérfifie les réponses et passe à la question suivante
function validerReponses(){
  console.log("TODO à valider");
  $("body").fadeOut(vitesseFondu, questionSuivante);
}

// Récupère en ajax la question suivante
function questionSuivante(){
  numeroQuestion++;
  requete = $.getJSON({
    url: "question.php",
    data: {
      numero: numeroQuestion
    },
  })
  .done(afficheQuestion)
  .fail(erreurOuFin);
}

// Affiche la question reçue en ajax
function afficheQuestion(chalenge){
  question = chalenge; // la variable question est définie globalement
  $("#titreQuestion").html(question['question']);
  aire = $("#aireDeJeu").html('');
  for(i=1;i<5;i++)
    creeQuestion(aire, question['def' + i], question['nom' + i]);
  // RAZ ompteur de réponses déposées
  reponsesDonnees = 0;
  // Masque le bouton de validation
  $("#boutonValider").css({visibility: 'hidden', opacity: 0});
  // Apparition de la question
  $("body").fadeIn(vitesseFondu);
}

// Ajoute un couple question / réponse à l'aire de jeu
function creeQuestion(cible, nom, definition){
  ligne = $('<div>').addClass('ligne').appendTo(cible);
  $('<div>').addClass('question').html(nom).appendTo(ligne);
  $('<div>').addClass('dropZone').html('&nbsp;').droppable(optionsDroppable).appendTo(ligne);
  $('<div>').addClass('reponse').html(definition).draggable(optionsDraggable).appendTo(ligne);
}

// Appelée lorsqu'un élément est déposé par glissé-déposé
function elementDrop(e, ui){
  // Repositionne l'élément qui vient d'être déposé
  $(ui.draggable).animate({left: '-33%'}, 'fast');
  // Si le draggable vient de quitter un droppable, rendre la place de nouveau disponible
  // pour un prochain draggable.
  ancien = $(ui.draggable).data('ancienConteneur');
  if(undefined !== ancien)
    ancien.droppable('option', 'disabled', false);
  // Oblige l'élément qui vient de recevoir la réponse à ne plus accepter de nouvelles valeurs
  $(e.target).removeClass('highlight').droppable('option', 'disabled', true);
  // Enregistre dans le draggable l'objet vers lequel il vient d'être déposé.
  // Permet, lors de son prochain déplacement, de rendre de nouveau la place disponible
  // pour un prochain draggable.
  $(ui.draggable).data('ancienConteneur', $(e.target));
  if(++reponsesDonnees >= 4){
    $("#boutonValider").css('visibility', 'visible').animate({opacity: 1}, 1500);
  };
}

// En cas d'erreur ou si la dernière question a été atteinte (erreur 404)
function erreurOuFin(xqhr, status, message){
  if(xqhr.status == 404)
    finDuQuizz();
  else{
    alert("Une erreur est survenue : " + message);
  }
}

// Si la dernière question a été atteinte, on affiche le score final
function finDuQuizz(){
  alert("fin du quizz");
}
