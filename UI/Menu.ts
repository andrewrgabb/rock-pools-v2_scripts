
const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    @property(cc.Prefab)
    menu: cc.Prefab = null;

    showMenu() {
        let menu: cc.Node = cc.instantiate(this.menu);
        menu.name = "menu";
        this.node.addChild(menu);
        menu.setPosition(0,0);

        menu.getChildByName("playButton").getComponent(cc.Button).node.on('click', this.startGame, this);
    }

    startGame () {
        this.node.getChildByName("menu").destroy();
        cc.director.loadScene("Pool");
    }
}
