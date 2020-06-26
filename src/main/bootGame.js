class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload(){
        this.load.image('bg', 'assets/res/bg_0.png');
        this.load.atlas('lits', 'assets/res/lit.png', 'assets/data_json/lit.json');
    }
    create(){
        console.log('start');
        this.scene.start("SenceA");

    }
}