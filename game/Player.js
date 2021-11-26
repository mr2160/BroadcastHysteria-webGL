import { vec3, mat4 } from '../../lib/gl-matrix-module.js';

import { Utils } from './Utils.js';
import { Node } from './Node.js';
import { Scene } from './Scene.js';
import { Model } from './Model.js';
import { Stand } from './Stand.js';
import { Interactable } from './Interactable.js';

export class Player extends Node {

    constructor(options) {
        super(options);
        Utils.init(this, this.constructor.defaults, options);
        this.mousemoveHandler = this.mousemoveHandler.bind(this);
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);
        this.keys = {};
        this.heldKey = {};
    }

    addScene(scene){
        this.scene = scene
    }
    addCamera(camera){
        this.camera = camera
        this.addChild(camera)
    }

    grab(){
        if(this.heldObject){
            return
        }
        let minDist = 1000
        let minObject = null
        this.scene.nodes.forEach(node => {
            
            if(node instanceof Stand){
                let t = vec3.clone(this.translation)
                let n = vec3.clone(node.translation);
                let dist = vec3.distance(t, n);
                if(minDist >= dist){
                    minDist = dist;
                    minObject = node;
                }
            }
        });
        if(minObject && minDist < 4){
            this.heldObject = minObject.pickUp(this.heldObject);
            minObject.setPlacedObject(null);
        }
    }

    letgo(){
        if(!this.heldObject){
            return    
        }

        let minDist = 1000
        let minObject = null
        this.scene.nodes.forEach(node => {
            if(node instanceof Stand){
                let t = vec3.clone(this.translation)
                let n = vec3.clone(node.translation);
                let dist = vec3.distance(t, n);
                if(minDist >= dist){
                    minDist = dist;
                    minObject = node;
                }
            }
        });
        if(minObject && minDist < 4){
            minObject.placeObject(this.heldObject);
            this.heldObject = null;
        }       
    }

    interact(){
        let minDist = 1000;
        let minObject = null;
        this.scene.nodes.forEach(node => {
            if(node instanceof Interactable){
                let t = vec3.clone(this.translation)
                let n = vec3.clone(node.translation);
                let dist = vec3.distance(t, n);
                if(minDist >= dist){
                    minDist = dist;
                    minObject = node;
                }
            }
        });
        if(minObject && minDist < 4){
            minObject.interact();
        }  
    }

    
    update(dt) {
        const c = this;
        const cam = this.camera

        const forward = vec3.set(vec3.create(),
            -Math.sin(cam.rotation[1]), 0, -Math.cos(cam.rotation[1]));
        const right = vec3.set(vec3.create(),
            Math.cos(cam.rotation[1]), 0, -Math.sin(cam.rotation[1]));

        // 1: add movement acceleration
        let acc = vec3.create();
        if (this.keys['KeyW']) {
            vec3.add(acc, acc, forward);
        }
        if (this.keys['KeyS']) {
            vec3.sub(acc, acc, forward);
        }
        if (this.keys['KeyD']) {
            vec3.add(acc, acc, right);
        }
        if (this.keys['KeyA']) {
            vec3.sub(acc, acc, right);
        }
        if (this.keys['KeyE']) {
            this.letgo();
        }
        if (this.keys['KeyQ']) {
            this.grab();
        }
        if (this.keys['Space']) {
            if(!this.heldKey['Space']){
                this.interact();
                this.heldKey['Space'] = true;
            }
        }

        // 2: update velocity
        vec3.scaleAndAdd(c.velocity, c.velocity, acc, dt * c.acceleration);

        // 3: if no movement, apply friction
        if (!this.keys['KeyW'] &&
            !this.keys['KeyS'] &&
            !this.keys['KeyD'] &&
            !this.keys['KeyA'])
        {
            vec3.scale(c.velocity, c.velocity, 1 - c.friction);
        }

        // 4: limit speed
        const len = vec3.len(c.velocity);
        if (len > c.maxSpeed) {
            vec3.scale(c.velocity, c.velocity, c.maxSpeed / len);
        }
    }

    keyPress(code, action){
        
    }

    enable() {
        document.addEventListener('mousemove', this.mousemoveHandler);
        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('keyup', this.keyupHandler);
    }

    disable() {
        document.removeEventListener('mousemove', this.mousemoveHandler);
        document.removeEventListener('keydown', this.keydownHandler);
        document.removeEventListener('keyup', this.keyupHandler);

        for (let key in this.keys) {
            this.keys[key] = false;
        }
    }

    mousemoveHandler(e) {
        const dx = e.movementX;
        const dy = e.movementY;
        const c = this.camera;

        c.rotation[0] -= dy * c.mouseSensitivity;
        c.rotation[1] -= dx * c.mouseSensitivity;

        const pi = Math.PI;
        const twopi = pi * 2;
        const halfpi = pi / 2;

        if (c.rotation[0] > halfpi) {
            c.rotation[0] = halfpi;
        }
        if (c.rotation[0] < -halfpi) {
            c.rotation[0] = -halfpi;
        }

        c.rotation[1] = ((c.rotation[1] % twopi) + twopi) % twopi;
        c.updateTransform()
    }

    keydownHandler(e) {
        this.keys[e.code] = true;
    }

    keyupHandler(e) {
        this.keys[e.code] = false;
        this.heldKey[e.code] = false;
    }
    
}

Player.defaults = {
    velocity         : [0, 0, 0],
    mouseSensitivity : 0.002,
    maxSpeed         : 6,
    friction         : 0.1,
    acceleration     : 20
};