import { Player } from './Player.js';
import { Scene } from './Scene.js';
import { Stand } from './Stand.js';

export class PotekIgre {

    constructor(player, scene){

        this.grafikaDiv = document.getElementById("grafika");
        this.blocker = document.getElementById("blocker");
        this.modal = document.getElementById("modal");
        this.modal2 = document.getElementById("modal2");
        this.overlay = document.getElementById('overlay')
        this.tasks = document.getElementById("tasks");
        this.demo = document.getElementById("demo");
        this.ending = document.getElementById("ending");
        this.ending1= document.getElementById("ending1");
        this.ending2= document.getElementById("ending2");
        
        this.player = player;
        this.scene = scene;
        this.stands = [];
        this.placingTasks = [];

        this.startTime = null;
        this.endTime = null;

        this.playing = false;
        this.score = 0;

        this.prepareTasks();
        
        var object = this;
        document.addEventListener('click', function () {
            if(!object.playing) object.startGame();
        })
    }

    prepareTasks(){
        console.log(this.scene);
        this.scene.nodes.forEach(node => {
            if(node instanceof Stand && node.target){
                this.stands.push(node);
                this.placingTasks.push(false);
                this.pinNewTask(node.target, this.tasks, node.target)
            }
        });
        console.log(this.stands);
    }

    updateTasks(){
        for (let i = 0; i < this.stands.length; i++){
            if(!this.stands[i].placedObject){
                this.placingTasks[i] = false;
                let taskLi = document.getElementById(this.stands[i].target);
                taskLi.style.color = "red";
                continue
            }
            if(this.stands[i].target == this.stands[i].placedObject.ime){
                
                this.placingTasks[i] = true;
                let taskLi = document.getElementById(this.stands[i].target);
                taskLi.style.color = "green";
            }else{
                this.placingTasks[i] = false;
                let taskLi = document.getElementById(this.stands[i].target);
                taskLi.style.color = "red";
            }
        }
    }

    checkTasks(){
        for(let i = 0; i < this.placingTasks.length; i++){
            if(!this.placingTasks[i]){
                return false
            }
        }
        return true
    }


    pinNewTask(e, element, id) {
        let newTask = document.createElement("li");
        newTask.textContent = e;
        newTask.id = id;
        newTask.className = "task";
        newTask.style.color = "red";
        element.appendChild(newTask);
    }

    randTask() {
        this.openModal(modal2);

        var taskname = ["KAMERA","SLIKA", "REZISER", "AUDIO"];
        var taskDescription = ["Kamera je izgubila fokus, popravi jo!","Video mix zeza, preveri hitro!", "NUJNO, KONEC SVETA! REZISER BI KAVO", "Ohoho kolega, audio frcera, bo treba popravit"];

        let i = Math.floor(Math.random()*taskname.length);
        var div = document.getElementById('response');
        this.pinNewTask(taskname[i] + ": " + taskDescription[i]);

    }


    //updateScore() {
    //    var score = document.getElementById("score");
    //    score.innerText = "SCORE: " + this.score;
    //}

    startGame(){
        this.grafikaDiv.style.display = "flex";
        this.blocker.style.display = "none";
        this.startTime = Date.now();
        this.endTime = this.startTime + (40*1000);
        this.playing = true;
    }

    endGame(){
        this.playing = false;
        this.player.disable();
        this.grafikaDiv.style.display = "none";
        this.ending.style.display = "block";
        if(this.checkTasks()){
            this.ending1.style.backgroundColor = "green"
            this.ending2.style.backgroundColor = "darkgreen"
            this.ending2.innerHTML = "You have escaped Klemens wrath, today..."
            this.ending2.style.left = "30%";
        }
        this.ending.style.display = "block";
    }

    openModal(modal) {
        if (modal == null) return;
        modal.style.display = "block";
    }
    
    closeModal(modal) {
        if (modal == null) return
        modal.style.display = "none"
    }

    updateTime(t){
        var remainingTime = parseInt((this.endTime - t)/1000);
        if(remainingTime < 0){
            this.endGame();
        }
        var sat = 100 - remainingTime;
        var val = 60 + remainingTime;
        var hsl = "hsl(0, "+ sat + "%, "+ val +"%)"
        this.demo.innerHTML = "Stream starts in: " + remainingTime;
        this.demo.style.backgroundColor = hsl;
    }
    update(dt, t){
        this.updateTasks();
        if(this.playing) this.updateTime(t);
        

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
