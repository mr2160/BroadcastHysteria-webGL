import { Node } from './Node.js';
import { vec3, mat4 } from '../../lib/gl-matrix-module.js';

export class Stand extends Node {

    constructor(mesh, image, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;
        this.placedObject = null;
    }


    placeObject(object){
        if(this.placedObject){
            return
        }
        let translation = vec3.clone(this.translation);
        translation[1] += object.scale[1] + 0.2;
        object.translation = translation
        object.updateTransform();
        object.rendered = true;
        this.placedObject = object;
    }

    pickUp(object){
        if(!this.placedObject){
            return object
        }
        this.placedObject.rendered = false;        
        return this.placedObject;
    }

    getPlacedObject(){
        return this.placedObject;
    }

    setPlacedObject(object){
        this.placedObject = object;
    }
}
