class PuzzleGame extends Phaser.Scene{
    constructor() {
        super("PuzzleGame");
    }
    init(data){
        console.log('init',data.name_image);
        this.id_img=data.name_image;
    }
    create(){
        // console.log(data);
        this.setBg(this);
        this.setAbcImange(this,this.id_img+'PuzzleOra');
        this.gameBg(this);
        this.setNextBtn(this);
        this.setreturnBtn(this);
        // 4/3,4.8
        var abcPuzzle=[];
        abcPuzzle[0]=null;
        abcPuzzle[1]=this.setAbcPuzzle(this,this.id_img+'Puzzle1',1.23,6).setInteractive();
        abcPuzzle[2]=this.setAbcPuzzle(this,this.id_img+'Puzzle2',1.16,3).setInteractive();
        abcPuzzle[3]=this.setAbcPuzzle(this,this.id_img+'Puzzle3',1.3,3).setInteractive();
        abcPuzzle[4]=this.setAbcPuzzle(this,this.id_img+'Puzzle4',1.23,2).setInteractive();
        this.input.setDraggable(abcPuzzle[1]);
    }
    setBg(object){
        var bg=object.add.image(0,0,'bg');
        bg.setOrigin(0);
        return bg;
    }
    gameBg(object){
        var albumBg=object.add.image(game.config.width/16,game.config.height/9,'album_bg');
        albumBg.setOrigin(0);
        var select_bg=object.add.image(game.config.width/1.4,game.config.height/9,'select_bg');
        select_bg.setOrigin(0);
        var selectBorder=object.add.image(game.config.width/1.4,game.config.height/9,'selectBorder');
        selectBorder.setOrigin(0);
        // var nextBtn=object.add.image(game.config.width/1.45,game.config.height/1.2,'lits','nextBtn');
    }
    setAbcImange(object,nameImg){
        var abcPuzzleOra=object.add.image(game.config.width/16,game.config.height/9,nameImg);
        abcPuzzleOra.setOrigin(0);
        return abcPuzzleOra;
    }
    setNextBtn(object){
        var nextBtn=object.add.image(game.config.width/1.45,game.config.height/1.2,'lits','nextBtn');
        return nextBtn;
    }
    setreturnBtn(object){
        let senceB = object.scene.get('SenceB');
        let re = senceB.addReturnBtn(object);
        re.setInteractive().on('pointerdown', function () {
            object.scene.start('SenceB');
        }, object);
        return re;
    }
    setAbcPuzzle(object,name,ax,ay){
        var abcPuzzle=object.add.image(game.config.width/ax,game.config.height/ay,name).setScale(0.25);
        abcPuzzle.setOrigin(0);
        abcPuzzle.setAngle(Phaser.Math.Between(20, 40));
        return abcPuzzle;
    }
}