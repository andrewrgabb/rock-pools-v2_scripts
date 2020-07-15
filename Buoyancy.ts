import WaterDropletController from "./WaterDropletController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bouyancy extends cc.Component {

    counter: number = 0;

    waterYPos: number;

    // Gravity constant
    gravity: number = 1000;
    // Buoyancy constant
    buoyancy: number = 2000;

    // Velocity variable
    velocity: number = 0;

    // Displacement to move the fish by
    yDisplacement: number = 0;

    // Type of splash to play
    soundChoice: number;

    //Node Height
    fishHeight: number = 0;

    // Splash Sound
    @property({
        type: cc.AudioClip,
    })
    splashSoundG: cc.AudioClip = null;

    // Splash Sound
    @property({
        type: cc.AudioClip,
    })
    splashSoundB: cc.AudioClip = null;

    // Splash Sound
    @property({
        type: cc.AudioClip,
    })
    splashSoundD: cc.AudioClip = null;

    // Sound Played
    soundPlayed: boolean = false;

    onLoad () {
        //Determine where the water level is to identify where buoyancy should start.
        let water: cc.Node = this.node.parent.getChildByName("water")
        this.waterYPos = water.y + water.height/2
        this.fishHeight = this.node.height
    }

    updateTime (dt) {

        this.counter += dt;
        
        if (this.counter >= 0.01) {

            // Apply gravity to the fish
            this.velocity += this.gravity * this.counter;

            if (this.velocity < 0) {
                this.soundPlayed = false;
            }

            // Apply an impulse every 0.1 seconds that the fish is in the water
            let currentPosition: number = this.node.y;
            if (currentPosition < this.waterYPos) {
                //Play splash sound
                if (this.velocity > 500 && !this.soundPlayed) {
                    this.soundPlayed = true;
                    this.playSound();
                }
                //Apply Impulse
                this.velocity -= this.buoyancy * this.counter *  (this.waterYPos - currentPosition)/this.fishHeight * (1 + this.velocity/this.gravity);
                this.node.parent.getComponent(WaterDropletController).addDroplet();
            }
            if (currentPosition < this.waterYPos - this.fishHeight * 1.5 && this.velocity > 0) {
                this.setVelocity(-80);
            }

            // Apply the velocity to the fish
            this.yDisplacement = this.velocity * this.counter;
            this.node.setPosition(this.node.x, this.node.y - this.yDisplacement);

            //Rotate the fish according to its velocity
            let currentRotation: number = - this.node.angle;
            let rotateTo: number = this.velocity/16;

            
            if ((currentRotation - rotateTo)  > 8) {
                this.node.angle = - (currentRotation - 8);
            } else {
                this.node.angle = - (rotateTo);
            }

            this.counter = 0;
        }
    }

    setVelocity(newVelocity: number) {
        this.velocity = newVelocity;
    }

    //Play sound
    playSound () {
        this.soundChoice = Math.random();
        if (this.soundChoice > 0.66) {
            cc.audioEngine.playEffect(this.splashSoundD, false);
        } else if (this.soundChoice > 0.33) {
            cc.audioEngine.playEffect(this.splashSoundB, false);
        } else {
            cc.audioEngine.playEffect(this.splashSoundG, false);
        }
    }
}
