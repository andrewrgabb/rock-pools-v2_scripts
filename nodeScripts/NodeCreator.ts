const {ccclass, property} = cc._decorator;

import UIFactoryInterface from "./UIFactory/UIFactoryInterface";

@ccclass
export default class NodeCreator extends cc.Component {

    numberOfBases = 5;

    // Lists of all available Nodes
    rockList: cc.Node[] = [];
    baseList: cc.Node[] = [];

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        let UIFactory = this.node.getComponent("FancyUIFactory");
        this.instantiateBases(UIFactory);
        this.instantiateRocks(UIFactory);
    }

    instantiateRocks (UIFactory: UIFactoryInterface) {
        for (let i = 0; i < 8; i++) {
            let newRock: cc.Node = UIFactory.createNodeOfType(i);
            newRock.name = "rock" + i;
            this.node.addChild(newRock);
            newRock.setPosition(2*this.node.width, 0);
            this.rockList.push(newRock);
        }
    }

    instantiateBases (UIFactory: UIFactoryInterface) {
        for (let i = 0; i < this.numberOfBases; i++) {
            let newBase: cc.Node = UIFactory.createNodeOfType(8);
            newBase.name = "base" + i;
            this.node.addChild(newBase);
            newBase.setPosition(2*this.node.width, 0);
            this.baseList.push(newBase);
        }
    }

    getRock (i: number): cc.Node {
        return this.rockList[i];
    }

    getBase (i: number): cc.Node {
        return this.baseList[i];
    }
}
