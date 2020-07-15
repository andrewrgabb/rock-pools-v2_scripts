const {ccclass, property} = cc._decorator;

export default interface UIFactoryInterface extends cc.Component {

    // Returns a reference to the rock that will be used next.
    createNodeOfType (type: number): cc.Node;

}
