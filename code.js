$(document).ready(function (){
let humanCounter = 0;
let chickenCounter = 0;
let cowCounter = 0;
let finalCounterHuman = 0;
let finalCounterCows = 0;
let finalCounterChickens = 0;
let rollCounter = 2;
let diceArray = [];
buildGame();
$("button#reRoll").click(reRoll);
$("button#endTurn").click(endTurn);
$("button#Start").click(startTurn);

function buildGame(){
    $("button#Start").hide();
    for(let i = 0; i < 13; i++){
        createDice();
    }

}
function randomDieFace(){
    let diceImage = ["chicken","cow","human","raygun","tank"];
    let randomNumber = Math.floor((Math.random() * 5) + 1);
    return diceImage[randomNumber - 1];
}
function createDice(){
    let board = $("div#dice-area");
    let dice = $("<span>");
    let squareWidth = Math.round(window.innerWidth/(5+2))
    let squareHeight = Math.round(window.innerHeight/(5+2));
    let bestDimension = Math.min(squareWidth,squareHeight);
    dice.height(bestDimension);
    dice.width(bestDimension);
    board.append(dice);
    diceArray.push(dice);
    dice.addClass(randomDieFace());
    dice.addClass("unselected");
    dice.click(holdAndUnHold);
}
function holdAndUnHold(){
    let clicked = $(this);
    if (clicked.hasClass("unselected")){
        clicked.removeClass("unselected");
        clicked.addClass("selected");
    }else if(clicked.hasClass("selected")){
        clicked.removeClass("selected");
        clicked.addClass("unselected");
    }else{
        clicked.addClass("selected");
    }
}
function reRoll(){
    reRollAll();
    rollCounter--;
}
function reRollAll() {
    $("span").each(function () {
        let i = $(this);
        if (i.hasClass("cow")) {
            if(i.hasClass("selected")){
                cowCounter++;
                i.removeClass("selected");
                i.addClass("held");
            }else if(i.hasClass("unselected")){
                i.removeClass("cow");
                i.addClass(randomDieFace);
            }
        } else if (i.hasClass("chicken")) {
            if(i.hasClass("selected")){
                chickenCounter++;
                i.removeClass("selected");
                i.addClass("held");
            }else if(i.hasClass("unselected")){
                i.removeClass("chicken");
                i.addClass(randomDieFace);
            }
        } else if (i.hasClass("human")) {
            if(i.hasClass("selected")){
                humanCounter++;
                i.removeClass("selected");
                i.addClass("held");
            }else if(i.hasClass("unselected")){
                i.removeClass("human");
                i.addClass(randomDieFace);
            }
        } else if (i.hasClass("tank")) {
        } else if (i.hasClass("raygun")) {
            if(i.hasClass("selected")){
                i.removeClass("selected");
                i.addClass("held");
            }else if(i.hasClass("unselected")){
                i.removeClass("raygun");
                i.addClass(randomDieFace);
            }
        }
    });
    $("p#humanCount").text(`Human Counter: ${humanCounter}`);
    $("p#chickenCount").text(`Chicken Counter: ${chickenCounter}`);
    $("p#cowCount").text(`Cow Counter: ${cowCounter}`);
    if(rollCounter === 0){
        $("button#reRoll").hide();
    }
}
function endTurn(){
    $("p#humanCount").text(`Human Counter: ${humanCounter}`);
    $("p#chickenCount").text(`Chicken Counter: ${chickenCounter}`);
    $("p#cowCount").text(`Cow Counter: ${cowCounter}`);
    $("button#endTurn").hide();
    $("button#reRoll").hide();

    if(lost()){
        $("p#messageTurn").text(`Better luck next time fellow extra terrestrial`);
    }else{
        $("p#messageTurn").text(`Hunting season is good! You've abducted ${humanCounter} humans, ${cowCounter} cows
        and ${chickenCounter} chickens!`);
        finalCounterChickens += chickenCounter;
        finalCounterCows += cowCounter;
        finalCounterHuman += humanCounter;
    }
    $("button#Start").show();
    if(finalCounterChickens > 0 && finalCounterCows > 0 && finalCounterHuman >0){
        endGame();
    }
}
function endGame(){
    $("p#endGame").text(`Your final scores: You've abducted ${humanCounter} humans, ${cowCounter} cows, and ${chickenCounter} chickens! 
    May you stay legendary!`);
    $("*button").hide();
}
function lost(){
    let tankCount = 0;
    let gunCount = 0;
    let condition;
    $("span").each(function () {
        let i = $(this);
        if(i.hasClass("tank")){
            tankCount++;
        }else if(i.hasClass("raygun")){
            gunCount++;
        }
    });
    if(gunCount >= tankCount){
        condition = false;
    }else if(tankCount > gunCount){
        condition = true;
    }
    return condition;
}
function startTurn(){
    if(lost()){
        cowCounter = 0;
        humanCounter = 0;
        chickenCounter = 0;
    }
    rollCounter = 2;
    $("button#reRoll").show();
    $("button#endTurn").show();
    $("button#Start").hide();
    $("div#dice-area").empty();
    $("p#messageTurn").empty();
    buildGame();
}
});