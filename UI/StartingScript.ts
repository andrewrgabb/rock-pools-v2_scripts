
const {ccclass, property} = cc._decorator;

@ccclass
export default class StartingScript extends cc.Component {

    // Background music
    @property({
        type: cc.AudioClip,
    })
    backgroundMusic: cc.AudioClip = null;

    start () {
        this.node.getComponent("Menu").showMenu();
        cc.audioEngine.playMusic(this.backgroundMusic, true);
    }
}
