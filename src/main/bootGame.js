class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload(){
<<<<<<< HEAD
        this.load.pack('pack_img','data_json/resImg/img.json','file_img');
        this.load.pack('pack_puzzles','data_json/resImg/abcPuzzles.json','abcPuzzle');
        this.load.pack('pack_puzzleora','data_json/resImg/abcPuzzleOra.json','abcPuzzleOra');
        this.load.atlas('lits', 'assets/res/lit.png', 'data_json/lit.json');
        this.load.atlas('abc', 'assets/res/lit.png', 'data_json/dataNameAbc.json');
=======
this.load.pack('pack_img','data_json/resImg/img.json','file_img');
this.load.pack('pack_puzzles','data_json/resImg/abcPuzzles.json','abcPuzzle');
this.load.pack('pack_puzzleora','data_json/resImg/abcPuzzleOra.json','abcPuzzleOra');
this.load.atlas('lits', 'assets/res/lit.png', 'data_json/lit.json');
this.load.atlas('abc', 'assets/res/lit.png', 'data_json/dataNameAbc.json');
>>>>>>> 400c74bfd82d518ef5703ef916ee5c338763d0e6
    }
    create(){
        console.log('start');
        // this.scene.start("PuzzleGame");
        this.scene.start("SenceA");
        // this.scene.start("Puzzles");
    }
}
