$(document).ready(function (){
let tankCount = 0;
let humanCounter = 0;
let chickenCounter = 0;
let cowCounter = 0;
let rollCounter = 3;
let diceArray = [];
buildGame();
$("button").click(reRoll);
function buildGame(){
    for(let i = 0; i < 13; i++){
        createDice();
    }

}
function randomDieFace(){
    let diceImage = ["chicken","cow","human","raygun","tank"];
    let randomNumber = Math.floor((Math.random() * 5) + 1);
    let image = diceImage[randomNumber - 1];
    return image;
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
        clicked.addClass("selected")
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
            cowCounter++;
            i.removeClass("cow");
            i.addClass(randomDieFace());
        } else if (i.hasClass("chicken")) {
            chickenCounter++;
            i.removeClass("chicken");
            i.addClass(randomDieFace());
        } else if (i.hasClass("human")) {
            chickenCounter++;
            i.removeClass("human");
            i.addClass(randomDieFace());
        } else if (i.hasClass("tank")) {
        } else if (i.hasClass("raygun")) {
            i.removeClass("raygun");
            i.addClass(randomDieFace());
        }
    })
}
function endGame(){

}

});