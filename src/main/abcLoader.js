class AbcLoader extends Phaser.Scene {

    constructor() {
        super("AbcLoader");
        // this.nameABC=nameABC;
    }

    addBg(object) {
        var bggame = object.add.image(0, 0, 'bg1');
        bggame.setOrigin(0);
        var select_title = object.add.image(game.config.width / 2.782, game.config.height / 8, 'lits', 'select_title');
    }

    addAbc(object, sence) {
        var abcBtn = [];
        var abc = [];
        var a = -1;

        var frame_abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        for (var i = 0; i < frame_abc.length; i++) {
            let nameabc = frame_abc[i];
            let abcBtn = null;
            if (i % 6 == 0) a++;
            if (i != 6 && i != 14) {
                abcBtn = object.add.image(game.config.width / 25.6 + 180 * (i % 6), game.config.height / 4 + a * 100, 'lits', 'chooseBtn_r');
                abc[i] = object.add.image(game.config.width / 25.6 + 30 + 180 * (i % 6), game.config.height / 4 + 60 + a * 100, 'abc', frame_abc[i]);

                abc[i].setRotation(-Math.PI / 2);
            } else {
                abcBtn = object.add.image(game.config.width / 25.6 + 180 * (i % 6), game.config.height / 4 + a * 100, 'lits', 'chooseBtn_r');
                abc[i] = object.add.image(game.config.width / 25.6 + 30 + 180 * (i % 6), game.config.height / 4 + 60 - 47 + a * 100, 'abc', frame_abc[i]);

            }
            this.setAbcBtnEvent(this, object, sence, abcBtn, frame_abc, i);
        }
    }

    setAbcBtnEvent(object, sceneName, sence, abcBtn, data, index) {

        abcBtn.setInteractive().on('pointerdown', function () {
            this.clickSound(sceneName);
            object.scene.sleep();
            sceneName.scene.sleep();
            object.scene.start(sence, {frameAbc: data, indexImg: index});
        }, object);
    }

    setReturnBtn(object) {
        let senceB = object.scene.get('SenceB');
        let re = senceB.addReturnBtn(object);
        re.setInteractive().on('pointerdown', function () {
            this.clickSound(object);
            object.scene.sleep();
            object.scene.start('SenceB');
        }, this);
        return re;
    }

    clickSound(sceneName) {
        var clickSound = sceneName.sound.add('btn');
        var configSound = {
            loop: false
        };
        clickSound.play(configSound);
        return clickSound;
    }
}