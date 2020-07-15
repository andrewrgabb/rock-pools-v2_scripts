
const {ccclass, property} = cc._decorator;

@ccclass
export default class Tap extends cc.Component {

    @property(cc.Prefab)
    tapNode: cc.Prefab = null;

    onLoad () {
        let tapNode: cc.Node = cc.instantiate(this.tapNode);
        tapNode.name = "tapNode";
        this.node.addChild(tapNode);
        tapNode.setPosition(0,0);
    }

    hideTap () {
        this.node.getChildByName("tapNode").destroy();
    }
}
