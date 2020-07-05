class bootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }

    preload() {
        this.load.pack('pack_img', 'datagame/resImg/img.json', 'file_img');
        this.load.pack('pack_puzzles', 'datagame/resImg/abcPuzzles.json', 'abcPuzzle');
        this.load.pack('pack_puzzleora', 'datagame/resImg/abcPuzzleOra.json', 'abcPuzzleOra');
        this.load.pack('pack_sound', 'datagame/soundData/sound.json', 'sound');
        this.load.atlas('lits', 'assets/res/lit.png', 'datagame/AtlasFrame/lit.json');
        this.load.atlas('abc', 'assets/res/lit.png', 'datagame/AtlasFrame/dataNameAbc.json');

    }

    create() {
        console.log(this.parent);
        this.scene.start("WellcomeScene");
    }

    changeSceneEffect(sceneName, num) {
        var blocks = sceneName.add.group({key: 'block', repeat: 300});

        Phaser.Actions.GridAlign(blocks.getChildren(), {
            width: 23,
            cellWidth: 50,
            cellHeight: 50,
            x: 25,
            y: 25
        });
        var _this = sceneName;
        var i = 0;
        blocks.children.iterate(function (child) {
            _this.tweens.add({
                targets: child,
                scaleX: 0,
                scaleY: 0,
                alpha: 0,
                y: '+=64',
                angle: 180,
                ease: 'Power3',
                duration: 1000,
                delay: (i * 100)
            });
            i++;
            if (i % num === 0) {
                i = 0;
            }
        });
    }
}
