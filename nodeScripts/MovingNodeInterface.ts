
const {ccclass, property} = cc._decorator;

export default interface MovingNode extends cc.Component {

    //Move the node
    moveNode(xDisplacement: number);
}
