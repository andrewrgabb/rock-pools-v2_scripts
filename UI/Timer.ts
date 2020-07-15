
const {ccclass, property} = cc._decorator;

@ccclass
export default class Timer extends cc.Component {

    //gamePaused variable
    gamePaused: boolean = false;

    // Timer Label
    @property(cc.Label)
    timeLabel: cc.Label = null;

    // Highscore Label
    @property(cc.Label)
    highscoreLabel: cc.Label = null;

    // local storage
    ls = cc.sys.localStorage;
    // Highscore
    highscore: number = 0;

    // Time variable
    time: number = 0;

    // Menu variable
    menuShown: boolean = false;

    // One second reached variable
    oneSecond: number = 0;

    // Is the tap to jump label visible?
    tapVisible: boolean = true;

    // Game Started Variable
    gameStarted: boolean = false;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // Update highscore
        if (this.ls.getItem("highscore") == null) {
            this.ls.setItem("highscore", 0);
            this.highscore = 0;
        } else {
            this.highscore = this.ls.getItem("highscore");
        }
        this.highscoreLabel.string = this.timeToStringOfTime(this.highscore);
    }

    update (dt) {
        if (!this.gameStarted) {
            this.time += dt;
            if (this.time >= 0.4) {
                this.time = 0;
                this.gameStarted = true;
            }
        } else if (!this.gamePaused) {

            this.node.getComponent("NodeController").updateTime(dt);
            this.node.getChildByName("fish").getComponent("Buoyancy").updateTime(dt);

            this.time += dt;
            this.oneSecond += dt;
            // Call the timer update function everytime a second has passed
            if (this.oneSecond >= 1) {
                this.oneSecond = 0;
                this.timeLabel.string = this.timeToStringOfTime(this.time);
            }
        } else {
            this.hideTap();
            this.oneSecond += dt;
            if (this.oneSecond >= 1.6) {
                if (this.highscore < this.time) {
                    this.ls.setItem("highscore", this.time);
                }
                //reset
                //this.ls.setItem("highscore", 0);
                if (!this.menuShown) {
                    this.node.getComponent("Menu").showMenu();
                    this.menuShown = true;
                }
                
            }
        }
        
    }

    pauseGame () {
        this.gamePaused = true;
    }

    timeToStringOfScore (time: number): string {
        // Organise the current time into minutes seconds and hours
        return "" + Math.floor(time);
    }

    timeToStringOfTime (time: number): string {
        // Organise the current time into minutes seconds and hours
        let totalSeconds: number = Math.floor(time);
        let seconds: number = totalSeconds % 60;
        let totalMinutes: number = (totalSeconds - seconds) / 60;
        let minutes: number = totalMinutes % 60;
        let hours = (totalMinutes - minutes) / 60;

        // Convert to Strings
        let secondsString: string = seconds.toString();
        let minutesString: string = minutes.toString();
        let hoursString: string = hours.toString();

        // Make the Strings look nicer
        if (secondsString.length < 2) {
            secondsString = "0"+secondsString;
        }
        if (minutesString.length < 2) {
            minutesString = "0"+minutesString;
        }
        if (hoursString.length < 2) {
            hoursString = "0"+hoursString;
        }

        let timeString: string;

        // Change the Timer label
        if (hours == 0) {
            timeString = minutesString + ":" + secondsString;
        }
        else {
            timeString = hoursString + ":" + minutesString + ":" + secondsString;
        }

        return timeString;
    }

    hideTap () {
        if (this.tapVisible) {
            this.tapVisible = false;
            this.node.getComponent("Tap").hideTap();
        }
    }

}
