import { Interactable } from './Interactable.js';
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
        this.tasks2 = document.getElementById("tasks2");
        
        this.demo = document.getElementById("demo");
        this.ending = document.getElementById("ending");
        this.ending1= document.getElementById("ending1");
        this.ending2= document.getElementById("ending2");
        
        this.player = player;
        this.scene = scene;
        this.stands = [];
        this.placingTasks = [];
        this.interactables = [];
        this.kavomat = null;
        this.kavomatTask = false;

        this.startTime = null;
        this.endTime = null;

        this.playing = false;
        this.score = 0;
        this.extra = false;
        this.prepareTasks();
        
        var object = this;
        document.addEventListener('click', function () {
            if(!object.playing) object.startGame();
        })
    }

    prepareTasks(){
        this.scene.nodes.forEach(node => {
            if(node instanceof Stand && node.target){
                this.stands.push(node);
                this.placingTasks.push(false);
                var taskString = node.ime + ": " + node.target
                this.pinNewTask(taskString, this.tasks, node.ime)
            }
        });
        this.scene.nodes.forEach(node => {
            if(node instanceof Interactable && node.textureSwitch){
                if(!(node.ime=="Kavomat")){
                    this.interactables.push(node);
                    this.pinNewTask(node.ime, this.tasks, node.ime)
                }else{
                    this.kavomat = node;
                }
            }
        });
    }

    updateTasks(){
        for (let i = 0; i < this.stands.length; i++){
            if(!this.stands[i].placedObject){
                this.placingTasks[i] = false;
                let taskLi = document.getElementById(this.stands[i].ime);
                taskLi.style.color = "red";
                continue
            }
            if(this.stands[i].target == this.stands[i].placedObject.ime){
                this.placingTasks[i] = true;
                let taskLi = document.getElementById(this.stands[i].ime);
                taskLi.style.color = "green";
            }else{
                this.placingTasks[i] = false;
                let taskLi = document.getElementById(this.stands[i].ime);
                taskLi.style.color = "red";
            }
        }

        for (let i = 0; i < this.interactables.length; i++){
            if(!this.interactables[i].switched){
                let taskLi = document.getElementById(this.interactables[i].ime);
                taskLi.style.color = "red";
                continue
            }
            if(this.interactables[i].switched){
                let taskLi = document.getElementById(this.interactables[i].ime);
                taskLi.style.color = "green";
            }else{
                let taskLi = document.getElementById(this.interactables[i].ime);
                taskLi.style.color = "red";
            }
        }

    }

    kavaTask(){
        if(this.kavomatTask && this.kavomat.switched){
            this.kavomat.interact();
            this.updateTasks();
            var sporocilo = "Še komu paše še ena kava? No, meni gotovo."
            this.tasks2.innerHTML = sporocilo;
            this.modal2.classList.add('active');
        }else if(this.kavomatTask && !this.kavomat.switched){
            var sporocilo = "Študent! Zakaj še ni kave?"
            this.tasks2.innerHTML = sporocilo;
            this.modal2.classList.add('active');
        }else{
            this.interactables.push(this.kavomat);
            this.pinNewTask("Kava", this.tasks, this.kavomat.ime);
            var sporocilo = "Hmmm, kaj pa coffee break? ... Zame."
            this.tasks2.innerHTML = sporocilo;
            this.modal2.classList.add('active');
            this.kavomatTask = true;
        }
    }


    extraTask(){
        let i = Math.floor(Math.random()*this.stands.length);
        let j = Math.floor(Math.random()*(this.stands.length-1));
        if(j >= i) j++
        
        let target1 = this.stands[i].target;
        let target2 = this.stands[j].target;
    
        var taskLi1 = document.getElementById(this.stands[i].ime);
        var taskLi2 = document.getElementById(this.stands[j].ime);
        
        this.stands[i].target = target2;
        this.stands[j].target = target1;
        taskLi1.innerHTML = this.stands[i].ime +": "+ this.stands[i].target
        taskLi2.innerHTML = this.stands[j].ime +": "+ this.stands[j].target
        var sporocilo = "Hmmm, kaj če bi obrnili " + target1 + " in " + target2 + "?"
        
        this.tasks2.innerHTML = sporocilo;
        this.modal2.classList.add('active');
        this.updateTasks();
    }

    checkTasks(){
        
        for(let i = 0; i < this.placingTasks.length; i++){
            if(!this.placingTasks[i]){
                return false
            }
        }
        for(let i = 0; i < this.interactables.length; i++){
            if(!this.interactables[i].switched){
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

    startGame(){
        this.grafikaDiv.style.display = "flex";
        this.blocker.style.display = "none";
        this.startTime = Date.now();
        this.endTime = this.startTime + (55*1000);
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
            this.ending2.innerHTML = "Izognil si se reziserjevi jezi, zaenkrat..."
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

    manageReziser(remT){
        let i = Math.floor(remT/10);
        console.log(i);
        let x = Math.floor(Math.random()*5);
        console.log(i);
        if(x>=i){
            //console.log("kava");
            this.kavaTask();
            this.extra = true;
        }else if(x<i){
            //console.log("menjava");
            this.extraTask();
            this.extra = true;
        }
    }

    updateTime(t){
        var remainingTime = parseInt((this.endTime - t)/1000);
        if(remainingTime < 0){
            this.endGame();
        }
        var sat = 100 - remainingTime;
        var val = 60 + remainingTime;
        var hsl = "hsl(0, "+ sat + "%, "+ val +"%)"
        this.demo.innerHTML = "Prenos se začne čez: " + remainingTime;
        this.demo.style.backgroundColor = hsl;
        
        if(remainingTime < 41 && remainingTime%10==0 && remainingTime>1){
            console.log(this.extra)
            if(!this.extra){
                this.manageReziser(remainingTime);    
            }
        }
        if(remainingTime < 36 && (remainingTime%5==0 && remainingTime%10!=0)){
            console.log(this.extra);
            if(this.extra){
                this.modal2.classList.remove('active');
                this.extra = false;
            }

        }
    }
    update(dt, t){
        if(this.playing) this.updateTime(t);
    }

}
