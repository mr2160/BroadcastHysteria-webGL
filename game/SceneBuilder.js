import { Mesh } from './Mesh.js';

import { Node } from './Node.js';
import { Model } from './Model.js';
import { Camera } from './Camera.js';

import { Scene } from './Scene.js';
import { Player } from './Player.js';
import { Stand } from './Stand.js';
import { TextureSwitch } from './TextureSwitch.js';
import { Interactable } from './Interactable.js';

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
                return new Model(spec.ime, mesh, texture, spec);
            }
            case 'textureSwitch': {
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                const texture = this.spec.textures[spec.texture];
                const altTexture = this.spec.textures[spec.altTexture];
                return new TextureSwitch(mesh, texture, altTexture, spec);
            }
            default: return new Node(spec);
        }
    }

    createStands(spec, scene){
        switch(spec.type){
            case 'stand': {
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                const texture = this.spec.textures[spec.texture];
                const relChildRot = spec.relChildRot;
                const relChildTrans = spec.relChildTrans;
                let stand = new Stand(spec.target, relChildTrans, relChildRot, mesh, texture, spec);
                if(!spec.placedObject){
                    return stand
                }
                stand.placeObject(scene.nodes[spec.placedObject]);
                return stand
            }
            case 'interactable':{
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                const texture = this.spec.textures[spec.texture];
                if(!spec.textureSwitch){
                    return new Interactable(null, mesh, texture, spec);
                }
                let inter = new Interactable(scene.nodes[spec.textureSwitch], mesh, texture, spec);
                return inter
            }
        }
    }

    build() {
        let scene = new Scene();
        this.spec.nodes.forEach(spec => scene.addNode(this.createNode(spec)));
        this.spec.nodes.forEach(spec => scene.addNode(this.createStands(spec, scene)));
        return scene;
    }

}
