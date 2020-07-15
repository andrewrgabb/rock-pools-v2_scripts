import MovingNode from "./MovingNodeInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Rock extends cc.Component implements MovingNode {
    
    nodeReplaced: boolean = false;
    
    //Move the node
    moveNode(xDisplacement: number) {
        this.node.setPosition(this.node.x - xDisplacement, this.node.y);
    }

    // Keep track of whether a replacement base / rock has been generated
    replaceNode () {
        this.nodeReplaced = true;
    }

    // Allow the node to eventually be replaced again
    addNode () {
        this.nodeReplaced = false;
    }

    isNodeReplaced (): boolean {
        return this.nodeReplaced;
    }

}
