class bootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }

    preload() {
        this.load.pack('pack_img', 'datagame/resImg/img.json', 'file_img');
        this.load.pack('pack_puzzles', 'datagame/resImg/abcPuzzles.json', 'abcPuzzle');
        this.load.pack('pack_puzzleora', 'datagame/resImg/abcPuzzleOra.json', 'abcPuzzleOra');
        this.load.pack('pack_sound','datagame/soundData/sound.json','sound');
        this.load.atlas('lits', 'assets/res/lit.png', 'datagame/AtlasFrame/lit.json');
        this.load.atlas('abc', 'assets/res/lit.png', 'datagame/AtlasFrame/dataNameAbc.json');

    }

    create() {
        this.scene.start("WellcomeScene");
    }
}
