import MovingNode from "./MovingNodeInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Rock extends cc.Component implements MovingNode {
    
    //Move the node
    moveNode(xDisplacement: number) {
        this.node.setPosition(this.node.x - xDisplacement, this.node.y);
    }

}
