const modal = document.getElementById("modal");
const modal2 = document.getElementById("modal2");
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
let tasks = document.getElementById("tasks2");
let yes = true;


var start = false;
var predZacetkom = [false, false, false, false, false];

let task1 = document.getElementById("ena");
let task2 = document.getElementById("dva");
let task3 = document.getElementById("tri");
let task4 = document.getElementById("stiri");
let task5 = document.getElementById("pet");

let checker = arr => arr.every(Boolean);

function poslusaj() {
    openModal(modal);
    document.addEventListener('keydown', checkKey);

}

function checkKey(e) {
    switch (e.key) {
        case "k":
            console.log(e.key);
            task4.src = "../common/images/tick.png";
            predZacetkom[3] = true;
            if(checker(predZacetkom)){
                closeModal(modal);
            };
            break;
        case "c":
            console.log(e.key);
            task1.src = "../common/images/tick.png";
            predZacetkom[0] = true;
            if(checker(predZacetkom)){
                closeModal(modal);
            };
            break;
        case "l":
            console.log(e.key);
            task2.src = "../common/images/tick.png";
            predZacetkom[1] = true;
            if(checker(predZacetkom)){
                closeModal(modal);
            };
            break;
        case "r":
            console.log(e.key);
            task3.src = "../common/images/tick.png";
            predZacetkom[2] = true;
            if(checker(predZacetkom)){
                closeModal(modal);
            };
            break;
        case "g":
            console.log(e.key);
            task5.src = "../common/images/tick.png";
            predZacetkom[4] = true;
            if(checker(predZacetkom)){
                closeModal(modal);
            };
            break;
    }

}


function pinNewTask(e) {
    let newTask = document.createElement("li");
    newTask.textContent = e;
    newTask.className = "task";
    tasks.appendChild(newTask);
}

function randTask() {
    openModal(modal2);

    var taskname = ["KAMERA","LUCKE", "REZISER",];
    var taskDescription = ["Kamera je izgubila fokus, popravi jo!","Lucke strajkajo!!! HITRO!", "NUJNO, KONEC SVETA! REZISER BI KAVO"];


    let i = Math.floor(Math.random()*taskname.length);
    var div = document.getElementById('response');
    //console.log(taskname[i] + ": " + taskDescription[i]);
    pinNewTask(taskname[i] + ": " + taskDescription[i]);



}

function score() {

    return;
}

function countdown() {
    if(start == false) {
        var seconds = 10;
        var demo = document.getElementById("demo");
        start = true;
        // Update the count down every 1 second
        // Update the count down every 1 second
        var x = setInterval(function () {

            // Display the result in the element with id="demo"
            demo.innerHTML = "Stream starts in: " + seconds;
            demo.style.backgroundColor = "white";
            // If the count down is finished, write some text
            if (seconds < 0) {
                clearInterval(x);
                demo.innerHTML = "WE ARE LIVE!";
                demo.style.backgroundColor = "red";
                demo.style.color = "white";

            }
            seconds = seconds - 1;
        }, 1000);
    }
}



function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
}
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})


function gamePlay() {
    const x = setInterval(randTask, 10000)

}



//clearInterval(interval);
//clearInterval(interval2);