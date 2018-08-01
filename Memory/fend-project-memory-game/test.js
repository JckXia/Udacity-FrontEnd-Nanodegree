$(document).ready(function(){
  function shuffleDeck(){
   var list=$(".card");
   shuffle(list);
   $(".deck").append(list);
 }
 shuffleDeck();
     $(".card").click(function(event){
       ShowCard(event);
     });
});
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
