import { Player } from './Player.js';
import { Scene } from './Scene.js';

export class PotekIgre {

    constructor(player, scene){

        this.grafikaDiv = document.getElementById("grafika");
        this.blocker = document.getElementById("blocker");
        this.modal = document.getElementById("modal");
        this.modal2 = document.getElementById("modal2");
        this.overlay = document.getElementById('overlay')
        this.tasks = document.getElementById("tasks2");
        
        this.player = player;
        this.scene = scene;

        this.playing = false;
        this.score = 0;
        
        var object = this;
        document.addEventListener('click', function () {
            if(!this.playing) object.startGame();
        })
    }


    pinNewTask(e) {
        let newTask = document.createElement("li");
        newTask.textContent = e;
        newTask.className = "task";
        tasks.appendChild(newTask);
    }

    randTask() {
        this.openModal(modal2);

        var taskname = ["KAMERA","SLIKA", "REZISER", "AUDIO"];
        var taskDescription = ["Kamera je izgubila fokus, popravi jo!","Video mix zeza, preveri hitro!", "NUJNO, KONEC SVETA! REZISER BI KAVO", "Ohoho kolega, audio frcera, bo treba popravit"];

        let i = Math.floor(Math.random()*taskname.length);
        var div = document.getElementById('response');
        this.pinNewTask(taskname[i] + ": " + taskDescription[i]);

    }

    updateScore() {
        var score = document.getElementById("score");
        score.innerText = "SCORE: " + this.score;
    }

    startGame(){
        this.grafikaDiv.style.display = "flex";
        this.blocker.style.display = "none";
        this.playing = true;
    }

    openModal(modal) {
        if (modal == null) return;
        modal.style.display = "block";
    }
    
    closeModal(modal) {
        if (modal == null) return
        modal.style.display = "none"
    }

    update(dt){
        this.updateScore();
    }

}
//clearInterval(interval);
//clearInterval(interval2);


// countdown() {
//     if(start == false) {
//         var seconds = 10;
//         var demo = document.getElementById("demo");
//         start = true;
//         // Update the count down every 1 second
//         // Update the count down every 1 second
//         var x = setInterval(function () {

//             // Display the result in the element with id="demo"
//             demo.innerHTML = "Stream starts in: " + seconds;
//             demo.style.backgroundColor = "white";
//             // If the count down is finished, write some text
//             if (seconds < 0) {

//                 if(!checker(predZacetkom)){
//                     demo.innerHTML = "GAME OVEER!";
//                     demo.style.backgroundColor = "red";
//                     demo.style.color = "white";
//                     endgame();
//                     clearInterval(x);
//                 }
//                 else {
//                     demo.innerHTML = "You win, congratulations!";
//                     demo.style.backgroundColor = "red";
//                     demo.style.color = "white";
//                     clearInterval(x);
//                 }



//             }
//             seconds = seconds - 1;
//         }, 1000);
//     }
// }

// this.predZacetkom = [false, false, false];
//         this.task1 = document.getElementById("ena");
//         this.task2 = document.getElementById("dva");
//         this.task3 = document.getElementById("tri");
//         this.checker = arr => arr.every(Boolean);
//         //this.x = setInterval(randTask, 15000)
