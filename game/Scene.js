export class Scene {

    constructor() {
        this.nodes = [];
    }

    addNode(node) {
        if(node){
            this.nodes.push(node);
        }
    }

    traverse(before, after) {
        this.nodes.forEach(node => node.traverse(before, after));
    }

    removeNode(node) {
        this.nodes.pop(node)
    }

}
