const modal = document.getElementById("modal");
const modal2 = document.getElementById("modal2");
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
let tasks = document.getElementById("tasks2");
let yes = true;



var Player = null;

var start = false;
var predZacetkom = [false, false, false];

let task1 = document.getElementById("ena");
let task2 = document.getElementById("dva");
let task3 = document.getElementById("tri");


let checker = arr => arr.every(Boolean);

function poslusaj() {
    openModal(modal);
    document.addEventListener('keydown', function () {

        if(checker(predZacetkom)){
            closeModal(modal);
        }
    });

}



function pinNewTask(e) {
    let newTask = document.createElement("li");
    newTask.textContent = e;
    newTask.className = "task";
    tasks.appendChild(newTask);
}

function randTask() {
    openModal(modal2);

    var taskname = ["KAMERA","SLIKA", "REZISER", "AUDIO"];
    var taskDescription = ["Kamera je izgubila fokus, popravi jo!","Video mix zeza, preveri hitro!", "NUJNO, KONEC SVETA! REZISER BI KAVO", "Ohoho kolega, audio frcera, bo treba popravit"];

    let i = Math.floor(Math.random()*taskname.length);
    var div = document.getElementById('response');
    //console.log(taskname[i] + ": " + taskDescription[i]);
    pinNewTask(taskname[i] + ": " + taskDescription[i]);

}

function score(num) {

    var score = document.getElementById("score");
    var st = parseInt(document.getElementById("num").innerText) + parseInt(num);
    score.innerText = "SCORE: " + st;
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

                if(!checker(predZacetkom)){
                    demo.innerHTML = "GAME OVEER!";
                    demo.style.backgroundColor = "red";
                    demo.style.color = "white";
                    endgame();
                    clearInterval(x);
                }
                else {
                    demo.innerHTML = "You win, congratulations!";
                    demo.style.backgroundColor = "red";
                    demo.style.color = "white";
                    clearInterval(x);
                }



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

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})


function gamePlay() {
    const x = setInterval(randTask, 15000)

}


function endgame() {

    //location.reload()


}
//clearInterval(interval);
//clearInterval(interval2);

