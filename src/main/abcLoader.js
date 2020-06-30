class AbcLoader extends Phaser.Scene {

    constructor() {
        super("AbcLoader");
        // this.nameABC=nameABC;
    }

    preload() {
    }

    create() {
    }

    addBg(object) {
        var bggame = object.add.image(0, 0, 'bg1');
        bggame.setOrigin(0);
        var select_title = object.add.image(game.config.width / 2.782, game.config.height / 8, 'lits', 'select_title');
    }

    addAbc(object, sence) {
        var abcBtn = [];
        var frame_abc = ['c', 'd'];
        for (var i = 0; i < frame_abc.length; i++) {
            let nameabc = frame_abc[i];
            object.add.image(game.config.width / 25.6 + 180 * i, game.config.height / 4, 'lits', 'chooseBtn_r');
            abcBtn[i] = object.add.image(game.config.width / 25.6 + 40 + 180 * i, game.config.height / 4 + 60, 'abc', frame_abc[i]);
            abcBtn[i].setRotation(-Math.PI / 2);
        }
        for (var i = 0; i < abcBtn.length; i++) {
            this.setAbcBtnEvent(this,sence,abcBtn[i],frame_abc[i]);
        }
    }
    setAbcBtnEvent(object,sence,abcBtn,data){
        console.log(sence);
        abcBtn.setInteractive().on('pointerdown', function () {
            object.scene.start(sence,{name_image:data});
        },object);
    }
    setReturnBtn(object){
        let senceB = object.scene.get('SenceB');
        let re = senceB.addReturnBtn(object);
        re.setInteractive().on('pointerdown', function () {
            object.scene.start('SenceB');
        }, object);
        return re;
    }
}