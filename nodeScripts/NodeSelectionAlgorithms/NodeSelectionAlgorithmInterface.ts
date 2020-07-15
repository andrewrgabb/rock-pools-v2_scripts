const {ccclass, property} = cc._decorator;

export default interface NodeSelectionAlgorithmInterface extends cc.Component {

    // Returns a reference to the rock that will be used next.
    selectNextRock (): number;

    // Returns a reference to the base that will be used next.
    selectNextBase (): number;

    // Remove a rock
    removeRock ();

    // Remove a base
    removeBase ();
}
