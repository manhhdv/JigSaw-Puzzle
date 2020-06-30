class Puzzles extends Phaser.Scene {

    constructor() {
        super("Puzzles");
    }

    preload() {
    }

    create() {
        var puzzles=this.scene.get('AbcLoader');
        puzzles.addBg(this);
        puzzles.addAbc(this,'PuzzleGame');
        puzzles.setReturnBtn(this);
    }
}