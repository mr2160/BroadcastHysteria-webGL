import { Node } from './Node.js';

export class Model extends Node {

    constructor(ime, mesh, image, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;
        this.ime = ime;
    }

}
