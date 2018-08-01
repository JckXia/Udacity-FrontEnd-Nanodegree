/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

$( document ).ready(function() {

 //current_open is an array which keeps track of flipped cards
  var current_open=[];

 var doubleCheck=1;
  //Counter keeps track of moves made by the player
  var counter=0;

  //counter_flag determines when to add one to counter, as every move is done with 2 clicks
  var counter_flag=1;

  //Initate timer
  var timer_flag=1;

  //Clock controls start and stop of timer
  var clock;

  //match variable determines when the game ends
  var match=0;

  //ratings object controls rating of the player's performance
  var ratings={
      twoStar:4,
      oneStar:7
  };


 //Everytime a game starts, the deck is shuffled
 //Shuffle function is used later on, when replay button is pressed
 function shuffleDeck(){
  var list=$(".card");
  shuffle(list);
  $(".deck").append(list);
}
shuffleDeck();

//time() function keeps track of the time that the player have spent playing
function time(){
  var time=$(".timer");
  var t=0;
clock=setInterval(function(){
t+=1;
time[0].innerText=t;}, 1000);
}

//restart function for everytime the replay button is pressed
function restart(){

//First, we extract the deck, formalize everything to inital state(class="card")
 var list=document.querySelectorAll("ul.deck li");

   for(var i=0;i<list.length;i++){
     list[i].className="card";
   }
   //Clear any element in the current_open array from pervious session
   current_open.length=0;

//Reiniate moves counter to 0
   var moves=$(".moves");
   moves[0].textContent=0;
   counter=0;

   //We stop the clock, and we allow it to start once more when one of the card is pressed
   clearTimeout(clock);
     var time=$(".timer");
     time[0].innerHTML="0";
     timer_flag=1;

    //Reset the stars to inital state->(className="fa fa-star")
    var stars=document.querySelectorAll("ul.stars li i");
    for(var i=0;i<stars.length;i++){
      stars[i].className="fa fa-star";
    }
    //Restart match count
    match=0;
 // To finish off this process, we shuffle the deck
   shuffleDeck();
}
$( ".restart" ).on( "click", restart );


//ScoreBoard function determines player performance
function ScoreBoard(counter){
  var list=document.querySelectorAll("ul.stars li i");
    if(counter>=ratings.twoStar&&counter<ratings.oneStar){

      list[0].className="fa fa-star-o";
    }
    if(counter>=ratings.oneStar){
      list[1].className="fa fa-star-o";
    }
}
//Show card function shows the cards in play
function ShowCard(event){
  var card=event.target;
   if(card.className=="card"){
   card.className="card open show";
    } else{
  console.log("False");
     }
}
//This is where the main game logic occurs
  $(".card").click(function(event){


    //The counter will only be incremented on every 2 clicks
   if(counter_flag&&doubleCheck){
     counter+=1;
     counter_flag=0;
   }else{
     counter_flag=1;
  //   doubleCheck=1;
   }

 if(timer_flag){
  time();
   timer_flag=0;
 }

  //Here, we update the move counter each time a card is pressed
    var moves=$(".moves");
    moves[0].textContent=counter;

 //Determines player performance
    ScoreBoard(counter);

 //Logic outline: An array keeps track of opened/flipped cards
 //If newly flipped card is the same as the already opened, we set both to
 // matched, which is kept in track by a variable

   //Actions is only done when the event target is a card
   //This prevents myserious errors from happening,i.e clicking in the center resulting
   // inn undefined behaviour
    if(event.target.className=="card"){
     var card=event.target;
     card.className="card open show";

           //If there is an element in the current_open array
        if(current_open.length==1){

      doubleCheck=0;
            if(current_open[0].innerHTML==card.innerHTML){

                console.log("Same card");
                doubleCheck=0;
                card.className="card match";
                current_open[0].className="card match";

                match+=1;
                 if(match==8){
                   //End game case, where the player has won the game
                   setTimeout(function(){
                     var time=$(".timer");

                var performance=document.getElementsByClassName("fa fa-star").length;

                     swal({title:"Game finished!",icon:"success",button:"restart",text: "You took "+time[0].innerHTML+" seconds"+" in "+counter+" moves. Your rating is "+performance+" stars."})
.then((value) => {
  swal(`Game restarted!`);
  restart();
});
                      clearTimeout(clock);
                   },500);
                 }
                 //else, we pop off the old element in the array and start this process again
                    current_open.length=0;

            }else{
              doubleCheck=1;
              //Otherwise, we display both images for 0.5 seconds before we flip them down
              //current_open[0].on('click');
              console.log("reached");

             setTimeout(function(){

               card.className="card";
               current_open[0].className="card";
               current_open.length=0;
             },500);

            }
        }
        else{
          doubleCheck=0;
          current_open.push(card);
        }
      }
  });
  // Handler for .ready() called.
});


  //shuffling function
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
