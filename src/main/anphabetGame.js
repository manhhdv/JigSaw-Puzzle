class AnphabetGame extends Phaser.Scene {
    constructor() {
        super("AnphabetGame");
        this.initTime = 6;
        this.nextRound = true;
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
        this.initTime;
        this.nextRound;
    }

    create() {
        console.log(this.initTime, this.nextRound);
        var abcSound = this.sound.add(this.id_img + 'Sound');
        abcSound.play({
            loop: false
        });
        this.setBg(this);
        var sceneB = this.scene.get('SenceB');
        sceneB.addCloud(this);
        var puzzles = this.scene.get('PuzzleGame');
        this.setreturnBtn(this, abcSound);
        puzzles.setAbcImange(this, this.id_img + 'PuzzleOra');

        var preBtn = this.setPreBtn(this).setInteractive();
        preBtn.on('pointerdown', function () {
            abcSound.stop();
            this.scene.sleep();
             this.initTime = 6;
            this.scene.start("AnphabetGame", {frameAbc: this.listAbc, indexImg: this.id_img_pre});
        }, this);

        var replayBtn = this.setReplayBtn(this).setInteractive();
        replayBtn.on('pointerdown', function () {
            this.initTime = 6;
            abcSound.stop();
            abcSound.play({
                loop: false
            });
        }, this);

        var nextBtn = this.setNextBtn(this).setInteractive();
        nextBtn.on('pointerdown', function () {
            abcSound.stop();
            this.scene.sleep();
             this.initTime = 6;
            this.scene.start("AnphabetGame", {frameAbc: this.listAbc, indexImg: this.id_img_next});
        }, this);
        var pauseBtn = this.setPauseBtn(this).setInteractive();
        pauseBtn.setInteractive({useHandCursor: true}).on('pointerdown', function () {
            if (this.nextRound == true) {
                this.initTime = 6;
                this.sound.play("btn", {loop: false});
                setTimeout(() => this.playbtn = this.add.image(950, game.config.height / 2, 'lits', 'pauseBtn_r'), 100);
                this.nextRound = false;
                // this.sound.stopAll();
                // abcSound.play({loop: false});
            } else {
                this.initTime = 6;
                this.sound.stopAll();
                abcSound.play({loop: false});
                this.playbtn.destroy();
                this.playbtn = null;
                this.nextRound = true;
            }
        }, this);
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.initTime -= 1;// One second
                if (this.initTime <= 0&&this.nextRound==true ) {
                    this.initTime = 6;
                    this.scene.start("AnphabetGame", {frameAbc: this.listAbc, indexImg: this.id_img_next});
                }
            },
            callbackScope: this,
            loop: true
        });

    }

    setBg(object) {
        var bg = object.add.image(0, 0, 'bg1');
        bg.setOrigin(0);
        return bg;
    }

    setPauseBtn(sceneName) {
        var pauseBtn = sceneName.add.image(950, game.config.height / 2, 'lits', 'pauseBtn_c');
        return pauseBtn;
    }

    setreturnBtn(object, abcSound) {
        let senceB = object.scene.get('SenceB');
        let re = senceB.addReturnBtn(object);
        re.setInteractive().on('pointerdown', function () {
            abcSound.stop();
            this.clickSound(this);
            object.scene.sleep();
            object.scene.start('AnphabetCard');
        }, this);
        return re;
    }

    setNextBtn(object) {
        var nextBtn = object.add.image(950, 500, 'lits', 'nextBtn1');
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
