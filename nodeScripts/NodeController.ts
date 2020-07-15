
const {ccclass, property} = cc._decorator;

import NodeSelectionAlgorithmInterface from "./NodeSelectionAlgorithms/NodeSelectionAlgorithmInterface";
import FancyAlgorithm from './NodeSelectionAlgorithms/FancyAlgorithm'
import Rock from './Rock'
import Base from './Base'

@ccclass
export default class NodeController extends cc.Component {

    //Make a request via a strategy algorithm thing for the next rock that will be created.
    // --> Algorithm will predetermine the order / selection of rocks.
    //Make a request for a specific rock through Rock Factory.

    // Lists of current Nodes
    rockList: Rock[] = [];
    baseList: Base[] = [];

    // Time variable
    time: number = 0;
    rockNumber: number = 0;
    rockCreationInterval: number = 2.5;
    START_SPEED: number = 350;
    MAX_SPEED: number = 450;

    speed: number;

    // Counter
    counter: number = 0;

    // Rock Selection Algorithm
    nodeSelectionAlgorithm: NodeSelectionAlgorithmInterface = new FancyAlgorithm();

    //Initial Nodes
    nodeCount: number = 0;

    // Sand position
    sandYPos: number = -280;

    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {
        this.speed = this.START_SPEED;
        this.node.getChildByName("darkWaterShader").zIndex ++;
        let xPos1 = -(this.node.width)/2 + this.node.getComponent("FancyUIFactory").createNodeOfType(8).width/2;
        this.spawnNewBase(xPos1);
        let xPos2 = (this.baseList[0].node.x + this.baseList[0].node.width );
        this.spawnNewBase(xPos2);
        this.spawnNewRock(xPos2);
    }
    
    spawnNewRock (xPos: number) {
        // Generate a new node in the scene with a preset template
        let rockSelection: number = this.nodeSelectionAlgorithm.selectNextRock();
        let newRock: cc.Node = this.node.getComponent("NodeCreator").getRock(rockSelection);
        // Put the newly added node under the canvas node
        this.rockList.push(newRock.getComponent("Rock"));
        //this.node.addChild(newRock);
        newRock.setPosition(cc.v2(xPos,this.sandYPos+newRock.height/2));
    }

    spawnNewBase (xPos: number) {
        // Generate a new node in the scene with a preset template
        let baseSelection: number = this.nodeSelectionAlgorithm.selectNextBase();
        // Generate a new node in the scene with a preset template
        let newBase: cc.Node = this.node.getComponent("NodeCreator").getBase(baseSelection);
        // Put the newly added node under the canvas node
        let newBaseScript: Base = newBase.getComponent("Base");
        newBaseScript.addNode();
        this.baseList.unshift(newBaseScript);
        newBase.setPosition(cc.v2(xPos,this.sandYPos)); 
    }

    updateTime (dt) {
        
        this.counter += dt;

        if (this.counter >= 0.01) {

            //Determine if any nodes are almost offscreen, and then add nodes replace them.
            this.baseList.forEach(element => {
                //Add a new base / rock when the old base / rock is almost offscreen
                if ( element.node.x <= 0) { //-(this.node.width+element.node.width)/2
                    if (!element.isNodeReplaced()) {
                        let xPos = (this.baseList[0].node.x+this.baseList[0].node.width);
                        this.spawnNewBase(xPos);
                        this.spawnNewRock(xPos);
                        element.replaceNode()
                    }
                }
                //Delete bases that have moved offscreen
                if ( element.node.x <= -(this.node.width/2+element.node.width) ) {
                    this.removeBase();
                    this.nodeSelectionAlgorithm.removeBase();
                }
            });

            //Delete rocks that have moved offscreen
            this.rockList.forEach(element => {
                if ( element.node.x <= -(this.node.width/2+element.node.width) ) {
                    this.removeRock();
                    this.nodeSelectionAlgorithm.removeRock();
                }
            });

            //Move all nodes at the same speed
            let displacement: number = this.speed * this.counter;

            this.rockList.forEach(element => {
                element.moveNode(displacement);
            });
            this.baseList.forEach(element => {
                element.moveNode(displacement);
            });

            //Increase the speed incrementally over time until it reaches the max speed
            this.time += this.counter;
            if (this.time > 0.5 && this.speed < this.MAX_SPEED) {
                this.speed ++;
                this.time = 0;
            }

            this.counter = 0;
        }
    }

    removeRock () {
        this.rockList.shift();
    }

    removeBase () {
        this.baseList.pop()
    }
}