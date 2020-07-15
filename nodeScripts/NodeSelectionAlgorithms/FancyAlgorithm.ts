import NodeSelectionAlgorithmInterface from "./NodeSelectionAlgorithmInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FancyAlgorithm extends cc.Component implements NodeSelectionAlgorithmInterface {
    

    nextBase: number = -1;
    nextSeashell: number = -1;
    rocksInUse: number[] = [];
    basesInUse: number[] = [];
    seashellsInUse: number[] = [];
    keepSearching: boolean = true;

    numberOfBases = 5;

    selectNextRock (): number {
        var rockSelection: number = 0;
        while (this.keepSearching) {
            this.keepSearching = false;
            rockSelection = Math.floor(Math.random() * 8);
            this.rocksInUse.forEach(element => {
                if (element == rockSelection) {
                    this.keepSearching = true;
                }
            });
        }
        this.keepSearching = true;
        this.rocksInUse.push(rockSelection);
        return rockSelection;
    }

    selectNextBase(): number {
        if (this.nextBase == this.numberOfBases - 1) {
            this.nextBase = -1;
        }
        this.nextBase ++;
        this.basesInUse.push(this.nextBase);
        return this.nextBase ;
    }

    removeRock () {
        this.rocksInUse.shift();
    }

    removeBase() {
        this.basesInUse.shift();
    }
}
