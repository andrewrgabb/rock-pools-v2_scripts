
const {ccclass, property} = cc._decorator;

@ccclass
export default class Pause extends cc.Component {

    pauseGame() {
        this.node.getComponent("Timer").pauseGame();
        this.node.getComponent("WaterDropletController").pauseGame();
        this.node.getChildByName("fish").getComponent("Jump").pauseGame();
        this.node.getChildByName("fish").getComponent(cc.RigidBody).gravityScale = 7;
    }
}
