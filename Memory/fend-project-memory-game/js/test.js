$(document).ready(function(){
     var current_open=[];
  function shuffleDeck(){
   var list=$(".card");
   shuffle(list);
   $(".deck").append(list);
 }
 shuffleDeck();

   //Show card function shows the cards in play
   function ShowCard(event){
     var card=event.target;
      if(card.className=="card"){
      card.className="card open show";
       } else{
     console.log("False");
        }
   }

   function Logic(event){
      $(event.target).unbind('click');
     ShowCard(event);
      if(current_open.length==1){
        console.log("Check");
          if(event.target.innerHTML==current_open[0].innerHTML){
            console.log("Its a match");
            event.target.className="card match";
            current_open[0].className="card match";
            current_open.length=0;
          }else{
             setTimeout(function(){
              event.target.className="card";
               current_open[0].className="card";
                  current_open.length=0;
                  // $(".card").bind('click',Logic);
                  console.log(current_open.length);
             },500);

          }
      }else{

          current_open.push(event.target);

      }
   }
     $(".card").click(Logic);
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
