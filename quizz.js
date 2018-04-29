var numeroQuestion = 0;
var score = 0;
var question;
var reponsesDonnees = 0; // Compteur de réponses actuellement données pour la question en cours
var dialogue = null;
var optionsDraggable = {
  opacity: 0.5,
  revert: 'invalid',
  cursor: 'grabbing',
};
var optionsDroppable = {
  accept: '.reponse',
  over: function(e, ui){$(e.target).addClass("highlight")},
  out: function(e, ui){$(e.target).removeClass("highlight")},
  drop: elementDrop,
};
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
$(init);
function init(){
  numeroQuestion = 0;
  score = 0;
  question;
  reponsesDonnees = 0;
  // Prépare la boîte de dialogue (une seule fois, même si on rejoue)
  if(null == dialogue){
    dialogue = $("#dialogReponses").dialog({
      autoOpen : false,
      modal : true,
      buttons: {
        "OK" : questionSuivante
      }
    });
  }

  // Va chercher la première question
  // et affecte les callbacks aux boutons en attendant
  // la réponse du serveur
  questionSuivante();
  $("#boutonValider").click(validerReponses);
  $("#boutonReset").click(afficheQuestion);
}

// Vérfifie les réponses et passe à la question suivante
function validerReponses(){
  // Créé un tableau contenant les identifiants des réponses dans l'ordre
  reponses = [];
  $(".reponse").each(function(index, t){
    reponses[index] = $(t).data('id');
  });
  // Demande au serveur le nombre de bonnes réponses
  $.getJSON({
    url : "verifie.php",
    data : {
      numero : numeroQuestion,
      reponses : reponses
    }
  })
  .done(afficheNbBonnesReponses)
  .fail(erreurOuFin);
}

function afficheNbBonnesReponses(nombre){
  $("#boutonValider, #boutonReset").css({visibility: 'hidden', opacity: 0});  
  // Change le message en fonction du nombre de bonnes réponses
  // En théorie, si on a 3 bonnes réponses, alors la quatrième est bonne aussi
  // Sauf s'il y a eu un problème (mauvais calcul d'id, corruption dans les données transmises)
  score += nombre;
  console.log(score);
  pluriel ="s";
  switch(nombre){
    case 4 : msg = "Bien joué !"; break;
    case 2 : msg = "Pas mal !"; break;
    case 1 : msg = "Bon début."; pluriel="";  break;
    case 0 : msg = "Aïe !"; pluriel=""; break;
    default : msg = "Oups, problème !";
  }
  dialogue.html(msg + " Tu as " + nombre + " bonne" + pluriel + " réponse" + pluriel + ".").dialog("open");
  // Passe à la question suivante
}

// Récupère en ajax la question suivante
function questionSuivante(){
  if(numeroQuestion > 0)
    dialogue.dialog('close');
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
// Peut aussi être appelée sur un événement onClick
function afficheQuestion(chalenge){
  // Si le paramètre passé est une réponse ajax appropriée
  if(undefined !== chalenge.numero)
    question = chalenge; // la variable question est définie globalement
  $("#titreQuestion").html(question.question);
  // On récupère et vide la div qui contiendra les objets à déplacer
  aire = $("#aireDeJeu").html('');
  for(i=0;i<4;i++)
    creeQuestion(aire, question.definitions[i], question.reponses[i]);
  // RAZ compteur de réponses déposées par drag and drop
  reponsesDonnees = 0;
  // Masque le bouton de validation et de remise à zéro
  $("#boutonValider, #boutonReset").css({visibility: 'hidden', opacity: 0});
}

// Ajoute un couple question / réponse à l'aire de jeu
function creeQuestion(cible, definition, reponse){
  ligne = $('<div>').addClass('ligne').appendTo(cible);
  $('<div>').addClass('question').html(definition).appendTo(ligne);
  $('<div>').addClass('dropZone').html('&nbsp;').droppable(optionsDroppable).appendTo(ligne);
  $('<div>').addClass('reponse').html(reponse.nom).data('id', reponse.id).draggable(optionsDraggable).appendTo(ligne);
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
  reponse.draggable("destroy").css(resetStyle).appendTo(emplacement).draggable(optionsDraggable);
  // Oblige l'élément qui vient de recevoir la réponse à ne plus accepter de nouvelles valeurs
  $(emplacement).removeClass('highlight').droppable('option', 'disabled', true);
  // Enregistre dans le draggable l'objet vers lequel il vient d'être déposé.
  // Permet, lors de son prochain déplacement, de rendre de nouveau la place disponible
  // pour un prochain draggable.
  $(reponse).data('ancienConteneur', emplacement);
  if(reponsesDonnees >= 4){
    $("#boutonValider").css('visibility', 'visible').animate({opacity: 1}, 1500);
  };
  if(reponsesDonnees >= 1){
    $("#boutonReset").css('visibility', 'visible').animate({opacity: 1}, 1500);
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
  // Masque tous les boutons
  $("#boutonValider, #boutonReset").css({visibility: 'hidden', opacity: 0});
  $("#titreQuestion").html("Fin du quizz");
  nombreQuestions = (numeroQuestion-1)*4;
  $("#aireDeJeu").html("<h3>Nous voici arrivés au terme de ce quizz. Sur " + nombreQuestions +
  " définitions, tu en as trouvé " + score + ".</h3>");
  // Créé un bouton pour rejouer
  $("<input>").attr('type', 'button').val('Rejouer').appendTo("#aireDeJeu")
  .css('visibility', 'visible').animate({opacity: 1}, 1500)
  .click(function(){$(this).remove();init()});
}
