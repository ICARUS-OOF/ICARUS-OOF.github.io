
//Stores the viewport width
let widthOutput = window.innerWidth;

//#region PAGE SHOWING
//target all elements to save to constants
const page0btn=document.querySelector("#page0btn");
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");
const pageButtons = document.querySelector("#page-buttons");
var allpages=document.querySelectorAll(".page");
const wholescreenCover = document.querySelector("#wholescreen-cover");

const toggleMenuButtonsBtn=document.querySelector("#toggleMenuButtonsBtn");
const toggleMenuButtonsBtnX=document.querySelector("#toggleMenuButtonsBtnX");
//Assign toggle menu click events
toggleMenuButtonsBtn.addEventListener("click", function(){
    toggleMenu(true);
});
toggleMenuButtonsBtnX.addEventListener("click", function(){
    toggleMenu(false);
});

//Actively updates 'widthOutput' upon window resizes
function reportWindowSize(){
    widthOutput = window.innerWidth;
    if (isAtBreakpoint()){
        pageButtons.style.display = "none";
        setWholeScreenCover(false);
    } else {
        pageButtons.style.display = "block";
    }
}
window.addEventListener("resize", reportWindowSize);
reportWindowSize();

//If at breakpoint, width < 800px
function isAtBreakpoint(){
    return widthOutput <= 800;
}

//Toggles menu on and off
function toggleMenu(state){
    //Doesn't work for above breakpoint
    if (!isAtBreakpoint()){
        return;
    }
    
    if (state){
        pageButtons.style.display = "block";
        toggleMenuButtonsBtnX.style.display = "block";
        setWholeScreenCover(true);
    } else {
        pageButtons.style.display = "none";
        toggleMenuButtonsBtnX.style.display = "none";
        setWholeScreenCover(false);
    }
}

//Disable menu entirely
function disableMenus(){
    //Doesn't work for above breakpoint
    if (!isAtBreakpoint()){
        return;
    }
    pageButtons.style.display = "none";
}

//Enables or disables semi-transparent screen cover
function setWholeScreenCover(state){
    //Ternary operator used
    wholescreenCover.style.display = state ? "block" : "none";
}


//Hide all pages
function hideall(){
    for(let onepage of allpages){ 
        onepage.style.display="none";
    }
}
//Shows all sections with this page number class
function show(pgno){
    hideall();
    //Gets all sections with the class of "page{pgno}" 
    let pageElementList=document.getElementsByClassName("page"+pgno);
    //Loop through all found sections and display them
    for (var pageElement of pageElementList){
        pageElement.style.display="block";  
    }
}

//Assigns all buttons to display their respective pages
page0btn.addEventListener("click", function () {
    //Show page x
    show(0);
    //Disable menu if at breakpoint
    disableMenus();
    //Disable wholescreen cover
    setWholeScreenCover(false);
    //Clear all properties in the piano game
    clearPianoGame();
});
page1btn.addEventListener("click", function () { 
    show(1);
    disableMenus();
    setWholeScreenCover(false);
    clearPianoGame();
});
page2btn.addEventListener("click", function () { 
    show(2);
    disableMenus();
    setWholeScreenCover(false);
    clearPianoGame();
});
page3btn.addEventListener("click", function () {
    show(3);
    disableMenus();
    setWholeScreenCover(false);
    clearPianoGame();
});
page4btn.addEventListener("click", function () {
    show(4);
    disableMenus();
    setWholeScreenCover(false);
    clearPianoGame();
});
page5btn.addEventListener("click", function () {
    show(5);
    disableMenus();
    setWholeScreenCover(false);
    clearPianoGame();
});
//Hide all pages and then show 0th one, disable black screen
hideall();
show(0);
setWholeScreenCover(false);
//#endregion


//#region SFX BUTTONS
function assignSFXButtons(groupName, count){
    //Loop through specified button count
    for (let i = 0; i < count; i++){
        //find button with the group name and the respective index
        const buttonElement = document.getElementById(groupName + "_" + i);
        //Find the audio to play
        const audioToPlay = new Audio(`audio/${groupName}_${i}.mp3`);
        //Assign the button to anonymous function
        buttonElement.addEventListener("click", function(){
            //Play audio
            audioToPlay.play();
            //If button element does not have this class yet, add the class
            if (!buttonElement.classList.contains("sfx-button-click")){
                buttonElement.classList.add("sfx-button-click");
                //After the audio's duration, remove the class
                setTimeout(function(){
                    buttonElement.classList.remove("sfx-button-click");
                }, audioToPlay.duration * 1000); //timeout is in milliseconds and duration is in seconds, so multiply by 1000
            }
        });
    }
}

//All respective SFX Buttons
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
//Function for checking correct option for radio questions
function isCorrectRadio(qnNum){
    //Get target element
    const targetElement = document.querySelector(`input[name='q${qnNum}']:checked`);
    //If element is not found (user did not answer questiom), then default to wrong
    if (targetElement == null){
        return false;
    }
    //Get value of what the user selected
    const ans = targetElement.value;
    //If the value is C, that means correct
    return ans == "c";
}
//Function for checking correct options selected for a checkbox questions
function isCorrectCheckbox(qnNum, correctAnsCount){
    //Get the array of checkbox questions elements
    const ansArray = document.querySelectorAll(`input[name='q${qnNum}']:checked`);
    //If array is empty, user did not answer anything, WRONG
    if (ansArray == null){
        return false;
    }
    //If array count does not match the correct ans count, WRONG
    if (ansArray.length != correctAnsCount){
        return false;
    }
    //Loop through each checkbox
    for (var box of ansArray){
        //If even a single box has a value of "wrong", WRONG
        if (box.value == "w")
        {
            return false;
        }
    }

    //If none of the above conditions apply, then CORRECT
    return true;
}
//Checks if quiz texbox question is correct
function isCorrectTextbox(qnNum, correctAns){
    //Get target element
    const targetElement = document.querySelector(`input[name='q${qnNum}']`);
    //Get the value of the user input
    var ans = targetElement.value;
    //Convert the answer and the input to lower case (to remove case-sensitivity)
    //And then compare, if equal, CORRECT
    return correctAns.toLowerCase() === ans.toLowerCase();
}

//Get stuff for the end and stat of the quiz
const quizQuestionHolder = document.getElementById("quiz-qn-holder");
const quizStartButton = document.getElementById("quiz-start-button");
const quizResultHolder = document.getElementById("quiz-results-holder");
//If quiz starts
quizStartButton.addEventListener("click", function(){
    quizStartButton.style.display = "none"; //Disable start btn
    quizQuestionHolder.style.display = "block"; //Enable quiz questions
    quizResultHolder.style.display = "none"; //Disable result holder
    ResetQuiz(); //Reset all quiz properties
});

//Function to reset player input in the quiz
function ResetQuiz(){
    //Find all question inputs are reset them to empty
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

//Btn to submit quiz
const submitQuizButton = document.getElementById("submit-quiz-button");
//Event
submitQuizButton.addEventListener("click", function(){
    //Get the results text
    const resultsText = document.getElementById("quiz-results-text");
    quizStartButton.style.display = "block"; //Enable back the start button
    quizQuestionHolder.style.display = "none"; //Disable questions
    quizResultHolder.style.display = "block"; //Enable the results holder
    
    var correctCount = 0; //Integer to count num of correct
    const maxCorrectCount = 4; //Number of questions

    //Check for question right or wrong. If yes, add to correctCount
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

    //Update the content of the resultsText
    resultsText.innerHTML = `<h4>The results are...</h4><br>You got <i>${correctCount} out of ${maxCorrectCount}</i> questions correct!`;
});


//#endregion

//#region PIANO GAME
//Master note holder for all notes
const pianoNoteHolder = document.querySelector("#note-holder");
//-1 means no note is currently being pressed
var currentPressedIndex = -1;
var currentPianoScore = 0;
//Possible colors for target notes
const colorArray = ["red", "green", "blue", "pink", "cyan"];
const posArray = [18, 78, 135, 185, 243, 299, 357,     49, 107, 213, 269, 328];
//18, 78, 135, 185, 243, 299, 357,     49, 107, 213, 269, 328
//Names of the notes in display form
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
];
//Names of the notes in simplified form (File format)
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
];

//Assigning of event delegation
function noteButtonDelegation(evt){
    //Get who sent the event
    var sender = evt.target;
    //If sender is a playable note or sharp note
    if (sender.classList.contains("piano-note") || sender.classList.contains("piano-note-sharp")){
        //Each note has an ID in this format "piano-note-1". To just get the index, remove "piano-note-" (11 characters) and then parse int to this var
        var senderIndex = parseInt(sender.id.slice(11));
        //Get the audio file name from the file formatted note name array
        let audioName = "note-" + literalNoteNameArray[senderIndex];
        var sfx = new Audio(`audio/${audioName}.mp3`);
        //Play sfx
        sfx.play();
        
        //If there is a note currently being played, then cannot play note now, So return
        if (currentPressedIndex != -1){
            return;
        }
        //assign the current pressed index to this note
        currentPressedIndex = senderIndex;
        //After 500ms cooldown, reset index back to -1 to signal notes can be played again
        setTimeout(function(){
            currentPressedIndex = -1;
        }, 500);
    }
}
//Parent delegation, all note children will listen to this event
pianoNoteHolder.addEventListener("click", noteButtonDelegation);

//Parent area to spawn the falling notes
const dynamicArea = document.querySelector("#target-note-holder");

// Function to spawn a falling note
function spawnTargetNote(){
    //Randomise the index of the note to spawn
    var noteIndex = Math.floor(Math.random() * posArray.length);
    
    //Spawn a note
    var newNote = document.createElement('span');

    //choose a color based on the note index, MODULUS so that the index doesn't go out of the color array
    let colorChoice = noteIndex % colorArray.length; 
    //using that index, select the color from the color array
    let colorVar = colorArray[colorChoice];

    //Change content to the target display name
    newNote.textContent = noteNameArray[noteIndex];
    newNote.style.width = "26px";
    newNote.style.height = "50px";
    
    //assign the background color
    newNote.style.background = colorVar;

    //Spawn on the top
    newNote.style.top = "0px";
    //Assign its original x position
    newNote.style.left = posArray[noteIndex] + "px";

    //add appropraite classes, as well as its own noteIndex class
    newNote.classList.add("target-note");
    newNote.classList.add("noteIndex-" + noteIndex);

    // Append as a child of dynamicArea
    dynamicArea.appendChild(newNote);
}

//Update function to move the notes
function moveNotes(){
    //Loop through all children of the note parent
    for (var thisChild of dynamicArea.children){
        //Get the position 'top' property (Slice the last 2 chars (px) to get the raw number)
        let posTop = parseInt(thisChild.style.top.slice(0, -2));
        //Get the "noteIndex-x" class which is the 1st class (not an id because multiple notes can be the same note)
        //Remove the first 10 characters "noteIndex-" and get the raw Index, passing it as an int
        var targetNoteIndex = parseInt(thisChild.classList[1].toString().slice(10));
        
        //Increment the posTop by 1
        posTop++;

        //Update the child position
        thisChild.style.top = posTop + "px";

        //If position top reaches the threshold to press the note
        if (posTop > 270){
            //If the current pressed note IS the target note, successful, note has been successfully pressed
            if (currentPressedIndex == targetNoteIndex){
                //Remove the child from the noteHolder parent
                dynamicArea.removeChild(thisChild);
                //Set pressed index back to -1 to signal notes can be pressed again
                currentPressedIndex = -1;
                //Increment score by 1
                currentPianoScore++;
                //Update score on the scoreText
                updatePianoScore();
            }
        }
        //If position top reaches the threshold of deletion, user failed to press note
        if (posTop > 340){
            //Simply remove child with no points added
            dynamicArea.removeChild(thisChild);
        }
    }
}

//Get the score counter
const scoreCounter = document.getElementById("piano-score");
//Function to update th content of the score counter to the corresponding piano score
function updatePianoScore(){
    scoreCounter.innerHTML = "SCORE: " + currentPianoScore;
}
//Update score to display 0 when website loads
updatePianoScore();

//Starting button to start the piano minigame
const pianoPlayButton = document.getElementById("piano-play-button");
//Vars to store the intervals for spawning notes and moving notes
var spawnTargetNoteInterval, moveNotesInterval;
//Event to start piano minigame
pianoPlayButton.addEventListener("click", function(){
    console.log("Game Started!");

    pianoNoteHolder.style.display = "block"; // Enable piano note holder
    dynamicArea.style.display = "block"; // Enable parent piano note holder
    pianoPlayButton.style.display = "none"; //Disable play button
    scoreCounter.style.display = "block"; //Enable score counter

    //Falling note is spawned every second
    spawnTargetNoteInterval = setInterval(spawnTargetNote, 1000);
    //Notes are moved every 10ms
    moveNotesInterval = setInterval(moveNotes, 10);
});
//Clears all data and routines for the piano minigame
function clearPianoGame(){
    //Clears all piano game intervals
    clearInterval(spawnTargetNoteInterval);
    clearInterval(moveNotesInterval);
    
    pianoNoteHolder.style.display = "none"; //Disable master note holder
    dynamicArea.style.display = "none"; //Disable parent piano note holder
    pianoPlayButton.style.display = "block"; //Enable play button again for replay
    scoreCounter.style.display = "none"; //Disable score couter

    //Loop through all children of the parent piano note holder for falling notes
    for (var child of dynamicArea.children){
        //Remove the child
        dynamicArea.removeChild(child);
    }
}
//#endregion

//#region FULLSCREEN SUPPORT
//Get the fullscreen button
const btnFS=document.querySelector("#btnFS");
//current fullscreen state
var isFullScreen = false;
btnFS.addEventListener("click",toggleFullScreen);
//Function to toggle on fullscreen
function toggleFullScreen() { 
    //Set fullscreen to its opposite
    isFullScreen = !isFullScreen;
    //Fullscreen functionality implementation for each website platform
    if (isFullScreen){
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}


//#endregion