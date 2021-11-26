import { Node } from './Node.js';
import { TextureSwitch } from './TextureSwitch.js';

export class Interactable extends Node {

    constructor(textureSwitch, mesh, image, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;
        this.textureSwitch = null;
        if(textureSwitch instanceof TextureSwitch){
            this.textureSwitch = textureSwitch;
        }
    }

    interact(){
        if(this.textureSwitch){
            this.textureSwitch.switch()
        }
    }
}