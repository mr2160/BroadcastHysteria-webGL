import { Node } from './Node.js';

export class Model extends Node {

    constructor(mType, mesh, image, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;
        this.mType = mType;
    }

}
