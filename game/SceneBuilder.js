import { Mesh } from './Mesh.js';

import { Node } from './Node.js';
import { Model } from './Model.js';
import { Camera } from './Camera.js';

import { Scene } from './Scene.js';
import { Player } from './Player.js';
import { Stand } from './Stand.js';

export class SceneBuilder {

    constructor(spec) {
        this.spec = spec;
    }

    createNode(spec) {
        switch (spec.type) {
            case 'camera': return new Camera(spec);
            case 'player': return new Player(spec);
            case 'model': {
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                const texture = this.spec.textures[spec.texture];
                return new Model(spec.mType, mesh, texture, spec);
            }
            default: return new Node(spec);
        }
    }

    createStands(spec, scene){
        if(spec.type == "stand"){
            const mesh = new Mesh(this.spec.meshes[spec.mesh]);
            const texture = this.spec.textures[spec.texture];
            const relChildRot = spec.relChildRot;
            const relChildTrans = spec.relChildTrans;
            let stand = new Stand(relChildTrans, relChildRot, mesh, texture, spec);
            if(!spec.placedObject){
                return stand
            }
            stand.placeObject(scene.nodes[spec.placedObject]);
            return stand
        }
    }

    build() {
        let scene = new Scene();
        this.spec.nodes.forEach(spec => scene.addNode(this.createNode(spec)));
        this.spec.nodes.forEach(spec => scene.addNode(this.createStands(spec, scene)));
        return scene;
    }

}
