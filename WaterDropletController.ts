import stack from "./Stack";
const {ccclass, property} = cc._decorator;

@ccclass
export default class WaterDropletController extends cc.Component {

    //gamePaused variable
    gamePaused: boolean = false;

    @property(cc.Prefab)
    waterDroplet: cc.Prefab = null;
    
    xPos: number = 0.9;
    totalNumberOfDroplets: number = 3;
    numberOfActiveDroplets: number = 0;
    timer: number = 0;

    onLoad () {
        this.createDroplets()
    }

    createDroplets () {
        for (let index = 0; index < this.totalNumberOfDroplets; index++) {
            let waterDroplet: cc.Node = cc.instantiate(this.waterDroplet);
            waterDroplet.name = "droplet" + index;
            this.node.addChild(waterDroplet);
            waterDroplet.setPosition(this.node.x*this.xPos,this.node.y*0.85);
            this.xPos -= 0.1;
        }
        
    }

    addDroplet () {
        if (this.numberOfActiveDroplets < this.totalNumberOfDroplets) {
            let name: string = "droplet" + this.numberOfActiveDroplets;
            let waterDroplet: cc.Node = this.node.getChildByName(name);
            waterDroplet.setPosition(waterDroplet.x, this.node.y * 0.85);

            this.numberOfActiveDroplets ++;

            this.timer = 0;
        }   
    }

    removeDroplet () {
        if (this.numberOfActiveDroplets > 0 && !this.gamePaused) {
            let name: string = "droplet" + (this.numberOfActiveDroplets - 1);
            let waterDroplet: cc.Node = this.node.getChildByName(name);
            waterDroplet.setPosition(waterDroplet.x, 2 * this.node.y);

            this.numberOfActiveDroplets --;
        }
    }

    
    waterIsRemaining (): boolean {
        return (this.numberOfActiveDroplets > 0);
    }

    update (dt) {
        this.timer += dt;
        if (this.timer >= 1.2) {
            this.removeDroplet();
            this.timer = 0;
        }
    }

    // Pause the game in order to turn off buoyancy
    pauseGame () {
        this.gamePaused = true;
    }
}
