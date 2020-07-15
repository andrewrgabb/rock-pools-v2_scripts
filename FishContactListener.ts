
const {ccclass, property} = cc._decorator;

@ccclass
export default class FishContactListener extends cc.Component {

    gamePaused: boolean = false;

    // Rock Sound
    @property({
        type: cc.AudioClip,
    })
    rockSound: cc.AudioClip = null;

    onBeginContact (contact, selfCollider, otherCollider) {
        if ((otherCollider.name).substring(0,4) == "rock" && !this.gamePaused){
            cc.audioEngine.playEffect(this.rockSound, false);

            this.gamePaused = true;
            this.node.parent.getComponent("Pause").pauseGame();
        }
    }
}
