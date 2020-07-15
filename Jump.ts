import Bouyancy from "./Buoyancy";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Jump extends cc.Component {

    //gamePaused variable
    gamePaused: boolean = false;
    //Jump once per tap variable
    jumped: boolean = false;

    // Jump Sound
    @property({
        type: cc.AudioClip,
    })
    jumpSound: cc.AudioClip = null;

    jump () {
        this.jumped = true;
        let currentPosition: number = this.node.y;
        if ((this.node.parent.getComponent("WaterDropletController").waterIsRemaining()) && (!this.gamePaused )&& (currentPosition < this.node.parent.height/2+this.node.height/2)) {
            cc.audioEngine.playEffect(this.jumpSound, false);
            this.node.getComponent(Bouyancy).setVelocity(-500);
        }
    }

    onLoad () {
        //Mouse event
        this.node.parent.on(cc.Node.EventType.TOUCH_START,
            this.touchstart,this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END,
            this.touchend,this);
    }
    
    touchstart() {
        if (!this.jumped) {
            this.jump();
            this.node.parent.getComponent("Timer").hideTap();
        }
    }

    touchend() {
        this.jumped = false;
    }

    pauseGame () {
        this.gamePaused = true;
    }
}