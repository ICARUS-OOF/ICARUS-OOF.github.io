

//#region PAGE SHOWING
//target all elements to save to constants
const page0btn=document.querySelector("#page0btn");
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");
const openmenubtn = document.querySelector("#openmenubtn");
const pageButtons = document.querySelector("#page-buttons");
var allpages=document.querySelectorAll(".page");
const wholescreenCover = document.querySelector("#wholescreen-cover");

const toggleMenuButtonsBtn=document.querySelector("#toggleMenuButtonsBtn");
const toggleMenuButtonsBtnX=document.querySelector("#toggleMenuButtonsBtnX");
const menuItemsList=document.querySelector("nav ul");
toggleMenuButtonsBtn.addEventListener("click", function(){
    toggleMenu(true);
});
toggleMenuButtonsBtnX.addEventListener("click", function(){
    toggleMenu(false);
});


function toggleMenu(state){ /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    if (state){
        if (!menuItemsList.classList.contains("menuShow")){
            menuItemsList.classList.add("menuShow");
        }
    } else {
        if (menuItemsList.classList.contains("menuShow")){
            menuItemsList.classList.remove("menuShow");
        }
    }
    
    //if menu is showing (has the class “menuShow”)
    if(menuItemsList.classList.contains("menuShow")){
        // toggleMenuButtonsBtn.innerHTML="Close Menu"; //change button text to chose menu
        toggleMenuButtonsBtnX.style.display = "block";
        setWholeScreenCover(true);
    }else{ //if menu NOT showing
        //toggleMenuButtonsBtn.innerHTML="Open Menu"; //change button text open menu
        toggleMenuButtonsBtnX.style.display = "none";
        setWholeScreenCover(false);
    }
}

function disableMenus(){
    if(menuItemsList.classList.contains("menuShow")){
        menuItemsList.classList.remove("menuShow");
    }
}

function setWholeScreenCover(state){
    wholescreenCover.style.display = state ? "block" : "none";
}


//select all subtopic pages
function hideall(){ //function to hide all pages
    for(let onepage of allpages){ //go through all subtopic pages
        onepage.style.display="none"; //hide it
    }
}
function show(pgno, toggleMenuOnShow){ //function to show selected page no
    hideall();
    if (toggleMenuOnShow){
        toggleMenus();
    }
    //select the page based on the parameter passed in
    let pageElementList=document.getElementsByClassName("page"+pgno);
    for (var pageElement of pageElementList){
        pageElement.style.display="block";  
    }
    //show the page
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/

page0btn.addEventListener("click", function () {
    show(0);
    disableMenus();
    setWholeScreenCover(false);
});
page1btn.addEventListener("click", function () { 
    show(1);
    disableMenus();
    setWholeScreenCover(false);
});
page2btn.addEventListener("click", function () { 
    show(2);
    disableMenus();
    setWholeScreenCover(false);
});
page3btn.addEventListener("click", function () {
    show(3);
    disableMenus();
    setWholeScreenCover(false);
});
page4btn.addEventListener("click", function () {
    show(4);
    disableMenus();
    setWholeScreenCover(false);
});
page5btn.addEventListener("click", function () {
    show(5);
    disableMenus();
    setWholeScreenCover(false);
});
hideall();
show(0);
disableMenus();
setWholeScreenCover(false);
//#endregion


//#region SFX BUTTONS
function assignSFXButtons(groupName, count){
    for (let i = 0; i < count; i++){
        const buttonElement = document.getElementById(groupName + "_" + i);
        const audioToPlay = new Audio(`audio/${groupName}_${i}.mp3`);
        buttonElement.addEventListener("click", function(){
            audioToPlay.play();
            if (!buttonElement.classList.contains("sfx-button-click")){
                buttonElement.classList.add("sfx-button-click");
                setTimeout(function(){
                    buttonElement.classList.remove("sfx-button-click");
                }, audioToPlay.duration * 1000);
            }
        });
    }
}


assignSFXButtons("flex", 3);

assignSFXButtons("vel", 2);
assignSFXButtons("slide", 2);
assignSFXButtons("pan", 2);

assignSFXButtons("freq", 4);
assignSFXButtons("reverb", 2);

assignSFXButtons("quiz_freq", 2);
assignSFXButtons("quiz_mix", 2);

//#endregion





//#region QUIZ

function isCorrectRadio(qnNum){
    const targetElement = document.querySelector(`input[name='q${qnNum}']:checked`);
    if (targetElement == null){
        return false;
    }
    const ans = targetElement.value;
    return ans == "c";
}
function isCorrectCheckbox(qnNum, correctAnsCount){
    const ansArray = document.querySelectorAll(`input[name='q${qnNum}']:checked`);
    if (ansArray == null){
        return false;
    }
    if (ansArray.length != correctAnsCount){
        console.log(ansArray.length)
        return false;
    }
    for (var box of ansArray){
        if (box.value == "w")
        {
            return false;
        }
    }
    return true;
}
function isCorrectTextbox(qnNum, correctAns){
    const targetElement = document.querySelector(`input[name='q${qnNum}']`);
    var ans = targetElement.value;
    return correctAns.toLowerCase() === ans.toLowerCase();
}


const quizQuestionHolder = document.getElementById("quiz-qn-holder");
const quizStartButton = document.getElementById("quiz-start-button");
const quizResultHolder = document.getElementById("quiz-results-holder");
quizStartButton.addEventListener("click", function(){
    quizStartButton.style.display = "none";
    quizQuestionHolder.style.display = "block";
    quizResultHolder.style.display = "none";
    ResetQuiz();
});

function ResetQuiz(){
    const q0 = document.querySelector(`input[name='q0']:checked`);
    if (q0 != null){
        q0.checked = false;
    }
    const q1 = document.querySelectorAll(`input[name='q1']:checked`);
    for (var box of q1){
        box.checked = false;
    }
    const q2 = document.querySelector(`input[name='q2']:checked`);
    if (q2 != null){
        q2.checked = false;
    }
    const q3 = document.querySelector(`input[name='q3']`);
    if (q3 != null){
        q3.value = "";
    }
}

const submitQuizButton = document.getElementById("submit-quiz-button");
submitQuizButton.addEventListener("click", function(){
    const resultsText = document.getElementById("quiz-results-text")
    quizStartButton.style.display = "block";
    quizQuestionHolder.style.display = "none";
    quizResultHolder.style.display = "block";
    var correctCount = 0;
    const maxCorrectCount = 4;

    if (isCorrectRadio(0)){
        correctCount++;
    }
    if (isCorrectCheckbox(1, 2)){
        correctCount++;
    }
    if (isCorrectRadio(2)){
        correctCount++;
    }
    if (isCorrectTextbox(3, "Reverb")){
        correctCount++;
    }

    resultsText.innerHTML = `You got <i>${correctCount} out of ${maxCorrectCount}</i> questions correct!`;
});


//#endregion



const colorArray = ["red", "green", "blue", "pink", "cyan"];
const posArray = [18, 78, 135, 185, 243, 299, 357,     49, 107, 213, 269, 328];
//-172, -130, -87, -47, -5, 38, 79,   -151, -95, 12, 69, 125
const noteNameArray = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C#",
    "D#",
    "F#",
    "G#",
    "A#"
]

const literalNoteNameArray = [
    "c",
    "d",
    "e",
    "f",
    "g",
    "a",
    "b",
    "cs",
    "ds",
    "fs",
    "gs",
    "as"
]

function addNotesfx(i){
    var audioName = "note-" + literalNoteNameArray[i];
    totalNoteArray[i].addEventListener("click", function(){
        console.log(audioName);
        var sfx = new Audio(`audio/${audioName}.mp3`);
        sfx.play();
    })
}
const totalNoteArray = document.querySelectorAll(".piano-note, .piano-note-sharp");
for (var i = 0; i < totalNoteArray.length; i++){
    addNotesfx(i);
}


const dynamicArea = document.querySelector("#target-note-holder");
for (let i = 0; i < posArray.length; i++) {
     var noteIndex = Math.floor(Math.random() * posArray.length);
    
    var newDiv = document.createElement('span');
    // Add content and attributes
    //only 5 colors, need to cycle the allocation using %
    //e.g. if i=>0-4, colorChoice=>0-4, 
    //if i>4, e.g. 5, colorChoice=>5%5=0
    let colorChoice=noteIndex%colorArray.length; 
    let colorVar=colorArray[colorChoice];
    newDiv.textContent = noteNameArray[i];
    newDiv.id = 'new-id-'+i; //give unique id
    newDiv.style.width = "26px";
    newDiv.style.height = "50px";
    
    //make it select in order of colorArray and repeat
    newDiv.style.background = colorVar;

    newDiv.style.top = "280px";
    newDiv.style.left = posArray[i] + "px";
    newDiv.classList.add("target-note");

    // Add to the end of the body
    dynamicArea.appendChild(newDiv);
}


