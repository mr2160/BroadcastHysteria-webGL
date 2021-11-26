import { Node } from './Node.js';
import { vec3, mat4 } from '../../lib/gl-matrix-module.js';

export class Stand extends Node {

    constructor(relChildTrans, relChildRot, mesh, image, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;
        this.placedObject = null;
        this.relChildTrans = vec3.clone(relChildTrans);
        this.relChildRot = vec3.clone(relChildRot);
    }


    placeObject(object){
        if(this.placedObject){
            return null;
        }
        let translation = vec3.clone(this.translation);
        translation = vec3.add(translation, translation, this.relChildTrans);
        let rotation = vec3.clone(this.rotation);
        rotation = vec3.add(rotation, rotation, this.relChildRot);
        object.translation = translation;
        object.rotation = rotation;
        object.updateTransform();
        object.rendered = true;
        this.placedObject = object;
        return true;
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
