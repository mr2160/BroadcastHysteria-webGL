import { Node } from './Node.js';
import { TextureSwitch } from './TextureSwitch.js';

export class Interactable extends Node {

    constructor(ime, textureSwitch, mesh, image, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;
        this.textureSwitch = null;
        this.ime = ime;
        if(textureSwitch instanceof TextureSwitch){
            this.textureSwitch = textureSwitch;
        }
        this.switched = false;
    }

    interact(){
        if(this.textureSwitch){
            this.textureSwitch.switch()
        }
        this.switched = !this.switched;
    }
}