var numeroQuestion = 0;
var question;

$(function(){
  questionSuivante();
  $("#valider").click(validerReponses);
})

function validerReponses(){

}

function questionSuivante(){
  numeroQuestion++;
  question = $.getJSON({
    url: "question.php",
    data: {
      numero: numeroQuestion
    },
  })
  .done('afficheQuestion')
  .fail('finQuizz');
}

function afficheQuestion(chalenge){
  question = chalenge;
  $("#titreQuestion").html(question['question']);
}

function finQuizz(){
  alert("fin du quizz");
}
