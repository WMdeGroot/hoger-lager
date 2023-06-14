let userCredits = 25;
let bankThrowOne;
let bankThrowTwo;
let bankTotalThrow; //totale worp van de bank
let throwOne;
let throwTwo;
let totalThrow; //totale worp van de gebruiker
let gameOnGoing; //is het spel nog bezig?
let gameWinner; //laat zien of je hebt gewonnen of verloren
let higerPressed; //Kijkt op welke knop je hebt gedrukt
let lowerPressed; //Kijkt op welke knop je hebt gedrukt
let higerButton = document.querySelector(".higer-button"); //zet de class die higer-button heet in een variable
let creditCount = document.querySelector("#credits-counter");
let myThrowCount1 = document.querySelector("#trow-counter1");
let myThrowCount2 = document.querySelector("#trow-counter2");
let bankThrowCount1 = document.querySelector("#trow-counter-second1");
let bankThrowCount2 = document.querySelector("#trow-counter-second2");
let consoleText = document.querySelector("#innertext-console-html");
let gainEl = document.querySelector("#gain-counter");
let buttonDisableHigh = document.querySelector("#buttonHigh");
let buttonDisableLow = document.querySelector("#buttonLow");
let buttonDisableThrow = document.querySelector("#buttonThrow");

const throwClick = new Audio("/audio/click.mp3"); //zoekt audio op
const menuLoop = new Audio("/audio/menuloop.mp3");
const tieAudio = new Audio("/audio/tieaudio.mp3");
const winAudio = new Audio("/audio/winneraudio.mp3");
const loseAudio = new Audio("/audio/loseraudio.mp3");
const drumRolls = new Audio("/audio/drumrolls.mp3");

const myBtn1 = document.querySelector('.higer-button'); 
myBtn1.addEventListener('click', higherConfirm);

const myBtn2 = document.querySelector('.lower-button');
myBtn2.addEventListener('click', lowerConfirm);

const myBtn3 = document.querySelector('.throw-dice-button');
myBtn3.addEventListener('click', creditCheck);

const myBtn4 = document.querySelector('#click-to-gain');
myBtn4.addEventListener('click', gainClicker);


let confirmAge = confirm("Bent u 18 of ouder?");

if (confirmAge == false){

    while(confirmAge == false){
        alert("U moet minimaal 18 zijn.");
        confirmAge = confirm("Bent u 18 of ouder?");
    }

} else{}

let userName = prompt("Wat is uw naam?");

if (userName === ""){
    while(userName === "" || userName === null){
        alert("Deze naam kan niet");
        userName = prompt("Wat is uw naam");
    } 
} else{}

alert("Dag " + (userName) + " welkom bij het spel hoger & lager");

alert("Als u de spelregels wilt zien kunt u rechtsonder het veld op 'Spelregels' klikken.");

buttonDisableHigh.setAttribute('disabled', 'disabled');
buttonDisableLow.setAttribute('disabled', 'disabled');
//hierboven heb ik alle nodige variablen opgeschreven

consoleText.innerHTML = "Hier word alles wat je doet bijgehouden..";
creditCount.innerHTML = userCredits;



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  } //maakt nieuwe functie aan die een random getal aanmaakt tussen de 2 gekozen getallen..

function throwDiceButton() { //onClick functie zie html

    buttonDisableHigh.removeAttribute('disabled');
    buttonDisableLow.removeAttribute('disabled');
    buttonDisableThrow.setAttribute('disabled', 'disabled');

    gameOnGoing = true; //de game is begonnen

    userCredits = userCredits - 5;
    creditCount.innerHTML = userCredits;

    console.log(userCredits + (" Credits over"));


    console.log("Het spel is bezig = " + gameOnGoing); //is het spel bezig? aangegeven met true or false.

    throwOne = getRandomIntInclusive(1,6); //roept functie op die we eerder hadden aangemaakt
    throwTwo = getRandomIntInclusive(1,6);
    totalThrow = throwOne + throwTwo; //telt de worpen bij elkaar op

    console.log(throwOne);
    console.log(throwTwo);
    console.log(totalThrow + " Totaal worp"); //totale worp in console

    // alert( "Je gooit " + getRandomIntInclusive(1,6) + " en " + getRandomIntInclusive(1,6))

    alert("Je hebt gegooid: " + throwOne + " en " + throwTwo);
    alert("In totaal heb je: " + totalThrow + (" gegooid ") + "Denk je dat de bank hoger of lager dan jou gooid?"); //toont gebruiker alle shit

    myThrowCount1.innerHTML = throwOne; //laat de worp in html bestand zien
    myThrowCount2.innerHTML = throwTwo;

    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ("Je hebt 5 credits gebruikt");

    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ("Je totaal aantal credits = ") + userCredits;

    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ("Je gooit intotaal " + totalThrow);

    throwClick.play();

    menuLoop.play();
}

function bankThrow(){
    bankThrowOne = getRandomIntInclusive(1,6);
    bankThrowTwo = getRandomIntInclusive(1,6);
    bankTotalThrow = bankThrowOne + bankThrowTwo;

    console.log(bankThrowOne);
    console.log(bankThrowTwo);
    console.log(bankTotalThrow + " Totaal worp van de bank");

    // alert("De bank heeft gegooid: " + bankThrowOne + " en " + bankThrowTwo);

    bankThrowCount1.innerHTML = bankThrowOne;
    bankThrowCount2.innerHTML = bankThrowTwo;

    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ("De bank gooit totaal: " + bankTotalThrow);
    
    if(lowerPressed == true){
        winnerCheckerLower()
    } else if (higerPressed == true){
        winnerCheckerHiger()
    }
}

function higherConfirm(){

    let awnserConfirm = confirm("Weet u zeker dat u voor 'hoger' kiest?");

    if (awnserConfirm == true){
        higer();
    } else{}
}

function lowerConfirm(){

    let awnserConfirm = confirm("Weet u zeker dat u voor 'lager' kiest?");

    if (awnserConfirm == true){
        lower();
    } else{}
}

function higer(){

    higerPressed = true;

    alert("Je denkt dat de bank hoger dan jou gaat gooien.. Druk ok om de worp van de bank te zien.");

    setTimeout(bankThrow, 4500); //roept functie ("bankThrow") op

    //hieronder word laten zien of je hebt gewonnen of verloren

    drumRolls.play();

    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ('Je koos voor "Hoger"');

    menuLoop.pause();
}

function winnerCheckerLower(){

    if (totalThrow > bankTotalThrow){
        gameWinner = true;
        winAudio.play();
    } else if (totalThrow == bankTotalThrow){
        gameWinner = undefined;
        tieAudio.play() 
    } else {
        gameWinner = false; 
        loseAudio.play();
    }

    gameEnd();
}

function winnerCheckerHiger(){

    if (totalThrow < bankTotalThrow){
        gameWinner = true;
        winAudio.play();
    } else if (totalThrow == bankTotalThrow){
        gameWinner = undefined;
        tieAudio.play()   
    } else {
        gameWinner = false; 
        loseAudio.play();
    }

    gameEnd();
}

function lower() {

    lowerPressed = true;

    alert("Je denkt dat de bank lager dan jou gaat gooien.. Druk ok om de worp van de bank te zien.");

    setTimeout(bankThrow, 4500); //roept functie ("bankThrow") op

    //hieronder word laten zien of je hebt gewonnen of verloren

    drumRolls.play();

    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ("<br>");
    consoleText.innerHTML += ('Je koos voor "Lager"');

    menuLoop.pause();

}

function gameEnd(){

    //hieronder word er gekeken of je hebt gewonnen of verloren

    if (gameWinner == true){
        console.log("Gebruiker heeft gewonnen");
        userCredits = userCredits + 10;
        creditCount.innerHTML = userCredits;
        console.log("Je hebt 10 credits gewonnen dus heb je nog " + userCredits + " credits nog over")
        consoleText.innerHTML += ("<br>");
        consoleText.innerHTML += ("Je hebt gewonnen en je credits verdubbeld. credits + 10");
        consoleText.innerHTML += ("<br>");
        consoleText.innerHTML += ("Je totaal aantal credits = ") + userCredits;
    } else if (gameWinner == false){
        console.log("Gebruiker heeft verloren");
        consoleText.innerHTML += ("<br>");
        consoleText.innerHTML += ("Je hebt helaas verloren.. je krijgt geen credits.");
    } else {
        console.log("Credits back / none spend");
        userCredits = userCredits + 5;
        creditCount.innerHTML = userCredits;
        consoleText.innerHTML += ("<br>");
        consoleText.innerHTML += ("Je hebt gelijk gespeelt. credits + 5");
        consoleText.innerHTML += ("<br>");
        consoleText.innerHTML += ("Je totaal aantal credits = ") + userCredits;
    }
    
    //nadat je gewonnen of verloren hebt sluit het spel af.

    gameOnGoing = false;
    console.log("Het spel is bezig = " + gameOnGoing); //checkt of het spel nog bezig is.

    //hieronder sluit het spel af

    if (gameOnGoing == false){
        bankTotalThrow = undefined; //reset de gegooide dobbelstenen van de bank
        totalThrow = undefined; //reset de gegooide dobbelstenen van de gebruiker
    } else{}

    buttonDisableHigh.setAttribute('disabled', 'disabled');
    buttonDisableLow.setAttribute('disabled', 'disabled');

    setTimeout(diceCounter, 4000); //wacht 1.2 seconde voordat de functie word geroepen
    setTimeout(activateThrowDice, 4000);
    setTimeout(gameRestart, 1000);
}

function activateThrowDice(){
    buttonDisableThrow.removeAttribute('disabled');
}

function creditCheck(){
    if (userCredits <= 0){ 
        alert("je kan niet meer spelen want je hebt geen credits..");
        alert("Spel afgesloten..");
    } else if (userCredits >= 1){
        throwDiceButton();
    }
    
    //functie kijkt of je nog credits hebt om deel te nemen.
}

function diceCounter(){
    myThrowCount1.innerHTML = ""; //veranderd de gegooide worp in html in ".." zodat het spel weer opnieuw kan beginnen.
    myThrowCount2.innerHTML = "";
    
    bankThrowCount1.innerHTML = "";
    bankThrowCount2.innerHTML = "";
}

function gainClicker(){
    gainEl.innerHTML ++
    validationCheck();
}

function validationCheck(){
    if (gainEl.innerHTML === "250"){
        userCredits = userCredits + 5;
        creditCount.innerHTML = userCredits;
        consoleText.innerHTML += ("<br>");
        consoleText.innerHTML += ("<br>");
        consoleText.innerHTML += ('Je hebt 250 keer geclicked dus krijg je 5 credits erbij!');
        consoleText.innerHTML += ("<br>");
        consoleText.innerHTML += ("Je hebt nu intotaal " + userCredits + " credits");
    } else {}

    if (gainEl.innerHTML === "250"){
        gainEl.innerHTML = 0;
    } else{}
}

function gameRestart(){
    alert("Het spel begint nu opnieuw.");
    higerPressed = higerPressed = '';
    lowerPressed = lowerPressed = '';

    awnserConfirm = awnserConfirm = '';
}