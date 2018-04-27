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
var resetStyle = {
  position: '',
  width: '',
  height: '',
  right: '',
  bottom: '',
  left: '',
  top: '',
  opacity: '',
};
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
  // Récupère les blocs réponse et emplacement de dépose de la question
  reponse = $(ui.draggable);
  emplacement = $(e.target);
  // Si le draggable vient de quitter un droppable, rendre la place de nouveau disponible
  // pour un prochain draggable.
  // Sinon, on compte une nouvelle réponse donnée.
  ancien = reponse.data('ancienConteneur');
  if(undefined !== ancien){
    ancien.droppable('option', 'disabled', false)
    .html('&nbsp;')
    .removeClass('pleine');
  }else{
    reponse.addClass('posee').before( $('<div>').addClass('reponseVide').html('&nbsp;') );
    reponsesDonnees++;
  }

  // Repositionne l'élément qui vient d'être déposé
  // $(ui.draggable).animate({left: '-33%'}, 'fast');
  // On déplace l'élément
  emplacement.addClass('pleine').html('');
  // Retire les styles inline mis en place par jQuery ui
  // et réactive le drag and drop suite au déplacement de l'objet dans le DOM
  reponse.css(resetStyle).appendTo(emplacement).draggable(optionsDraggable);
  console.log('double dragon');
  // Oblige l'élément qui vient de recevoir la réponse à ne plus accepter de nouvelles valeurs
  $(emplacement).removeClass('highlight').droppable('option', 'disabled', true);
  // Enregistre dans le draggable l'objet vers lequel il vient d'être déposé.
  // Permet, lors de son prochain déplacement, de rendre de nouveau la place disponible
  // pour un prochain draggable.
  $(reponse).data('ancienConteneur', emplacement);
  if(reponsesDonnees >= 4){
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
