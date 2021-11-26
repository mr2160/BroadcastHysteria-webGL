import { Node } from './Node.js';
import { vec3, mat4 } from '../../lib/gl-matrix-module.js';

export class TextureSwitch extends Node {

    constructor(mesh, image, altImage, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;
        this.altImage = altImage;
        this.alt = false
    }

    switch(){
        this.alt = !this.alt;
    }
}