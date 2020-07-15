import UIFactoryInterface from "./UIFactoryInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FancyUIFactory extends cc.Component implements UIFactoryInterface{

    // Attach prefabs to the class through these properties.

    // Short Rock: Prefab resource
    @property(cc.Prefab)
    shortRock: cc.Prefab = null;

    // Medium Rock: Prefab resource
    @property(cc.Prefab)
    mediumRock: cc.Prefab = null;

    // Long Rock: Prefab resource
    @property(cc.Prefab)
    longRock: cc.Prefab = null;

    // Jagged Rock: Prefab resource
    @property(cc.Prefab)
    jaggedRock: cc.Prefab = null;

    // Jagged Rock 2: Prefab resource
    @property(cc.Prefab)
    jaggedRock2: cc.Prefab = null;

    // Double Rock: Prefab resource
    @property(cc.Prefab)
    doubleRock: cc.Prefab = null;

    // Double Rock 2: Prefab resource
    @property(cc.Prefab)
    doubleRock2: cc.Prefab = null;

    // Outcrop of Rocks: Prefab resource
    @property(cc.Prefab)
    outcropOfRocks: cc.Prefab = null;

    // Sand Base: Prefab resource
    @property(cc.Prefab)
    sandBase: cc.Prefab = null;


    createNodeOfType (type: number): cc.Node {
        switch (type) {
            case 0: {
                let newRock: cc.Node = cc.instantiate(this.shortRock);
                return newRock;
            }
            case 1: {
                let newRock: cc.Node = cc.instantiate(this.mediumRock);
                return newRock;
            }
            case 2: {
                let newRock: cc.Node = cc.instantiate(this.longRock);
                return newRock;
            }
            case 3: {
                let newRock: cc.Node = cc.instantiate(this.jaggedRock);
                return newRock;
            }
            case 4: {
                let newRock: cc.Node = cc.instantiate(this.jaggedRock2);
                return newRock;
            }
            case 5: { // Altered for testing
                let newRock: cc.Node = cc.instantiate(this.doubleRock);
                return newRock;
            }
            case 6: {
                let newRock: cc.Node = cc.instantiate(this.doubleRock2);
                return newRock;
            }
            case 7: {
                let newRock: cc.Node = cc.instantiate(this.outcropOfRocks);
                return newRock;
            }
            case 8: {
                let newSandBase: cc.Node = cc.instantiate(this.sandBase);
                return newSandBase;
            }
        }
    }
}