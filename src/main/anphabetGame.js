class AnphabetGame extends Phaser.Scene {
    constructor() {
        super("AnphabetGame");

    }

    init(data) {
        this.listAbc = data.frameAbc;
        this.id_img = data.frameAbc[data.indexImg];
        if (data.indexImg == (data.frameAbc.length - 1)) {
            this.id_img_next = 0
        } else {
            this.id_img_next = data.indexImg + 1;
        }
        console.log(this.id_img_next, this.id_img);
        if (data.indexImg == 0) {
            this.id_img_pre = data.frameAbc.length - 1;
        } else {
            this.id_img_pre = data.indexImg - 1;
        }
    }

    create() {
        var abcSound = this.sound.add(this.id_img + 'Sound');
        abcSound.play({
            loop: false
        });
        this.setBg(this);
        var puzzles = this.scene.get('PuzzleGame');
        this.setreturnBtn(this);
        puzzles.setAbcImange(this, this.id_img + 'PuzzleOra');

        var preBtn = this.setPreBtn(this).setInteractive();
        preBtn.on('pointerdown', function () {

            abcSound.stop();
            this.scene.sleep();
            this.scene.start("AnphabetGame", {frameAbc: this.listAbc, indexImg: this.id_img_pre});
        }, this);

        var replayBtn = this.setReplayBtn(this).setInteractive();
        replayBtn.on('pointerdown', function () {
            abcSound.stop();
            abcSound.play({
                loop: false
            });
        }, this);

        var nextBtn = this.setNextBtn(this).setInteractive();
        nextBtn.on('pointerdown', function () {
            abcSound.stop();
            this.scene.sleep();
            this.scene.start("AnphabetGame", {frameAbc: this.listAbc, indexImg: this.id_img_next});
        }, this);

    }

    setBg(object) {
        var bg = object.add.image(0, 0, 'bg1');
        bg.setOrigin(0);
        return bg;
    }

    setreturnBtn(object) {
        let senceB = object.scene.get('SenceB');
        let re = senceB.addReturnBtn(object);
        re.setInteractive().on('pointerdown', function () {
            this.clickSound(this);
            object.scene.sleep();
            object.scene.start('AnphabetCard');
        }, this);
        return re;
    }

    setNextBtn(object) {
        var nextBtn = object.add.image(950, 440, 'lits', 'nextBtn1');
        nextBtn.setRotation(-Math.PI / 2);
        return nextBtn;
    }

    setPreBtn(object) {
        var preBtn = object.add.image(950, 130, 'lits', 'preBtn');
        return preBtn;
    }

    setReplayBtn(object) {
        var replay = object.add.image(725, 110, 'lits', 'replayBtn');
        replay.setRotation(-Math.PI / 2);
        return replay;
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