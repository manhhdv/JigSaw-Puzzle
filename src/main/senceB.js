class SenceB extends Phaser.Scene {

    constructor() {
        super("SenceB");
    }

    preload() {
    }

    create() {

        var senceA = this.scene.get('WellcomeScene');
        var clickSound = this.sound.add('btn');
        var configSound = {
            loop: false
        };
        var bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0);
        var cloud = this.addCloud(this);
        var cloud2=[];
        for (let i = 0; i < cloud.length; i++) {
            this.setTween(this, cloud[i], cloud[i].w, cloud[i].x, 0);
            cloud2[i]=this.createCLoud(this, cloud[i].y,cloud[i].scale);

        }
        for (let i = 0; i < cloud.length; i++) {
            setTimeout(() => {
                cloud2[i].setAlpha(1);
                this.setTween(this, cloud2[i], null, game.config.width, -1);

                cloud[i].destroy();
            }, 15000 / (game.config.width / cloud[i].x));
        }

        senceA.setTitleGame(this);

        var puzzlesBtn = this.add.image(game.config.width / 8, game.config.height / 1.71, 'lits', 'puzzlesBtn_c');

        puzzlesBtn.setInteractive().on('pointerdown', function () {
            clickSound.play(configSound);
            this.scene.sleep();
            this.scene.start('Puzzles');
        }, this);
        var acBtn = this.add.image(game.config.width / 1.8, game.config.height / 1.71 + 176, 'lits', 'acBtn_c');
        acBtn.setRotation(-Math.PI / 2);
        acBtn.setInteractive().on('pointerdown', function () {
            clickSound.play(configSound);
            this.scene.sleep();
            this.scene.start('AnphabetCard');
        }, this);
        var returnBtn = this.addReturnBtn(this);
        returnBtn.setInteractive().on('pointerdown', function () {
            clickSound.play(configSound);
            this.scene.sleep();
            this.scene.start('WellcomeScene');
        }, this);
        var bootGame = this.scene.get('BootGame');
        bootGame.changeSceneEffect(this, 23);

    }

    addReturnBtn(object) {
        let returnBtn = object.add.image(game.config.width / 1.09, game.config.height / 1.2 + 94, 'lits', 'returnBtn_r');
        returnBtn.setRotation(-Math.PI / 2);
        return returnBtn;
    }

    createCLoud(sceneName, y,scale) {
        let cloud = sceneName.add.image(game.config.width+200, y, 'lits', 'cloud').setAlpha(0);
        cloud.setScale(scale);
        return cloud;
    }

    addCloud(sceneName) {
        let cloud = [];
        cloud[0] = sceneName.add.image(game.config.width / 8.5333, game.config.height / 6.4, 'lits', 'cloud');
        cloud[1] = sceneName.add.image(game.config.width / 4.096, game.config.height / 4.4, 'lits', 'cloud').setScale(0.8);
        cloud[2] = sceneName.add.image(game.config.width / 2, game.config.height / 10, 'lits', 'cloud').setScale(0.5);
        cloud[3] = sceneName.add.image(game.config.width / 1.52, game.config.height / 2, 'lits', 'cloud').setScale(0.45);
        cloud[4] = sceneName.add.image(game.config.width / 1.2, game.config.height / 6.4, 'lits', 'cloud').setScale(0.9);
        return cloud;
    }

    setTween(sceneName, img, width, pos_x, repeat) {
        sceneName.tweens.add({
            targets: img,
            x: -200,
            ease: 'Linear',
            duration: 15000 / (game.config.width / pos_x),
            delay: 0,
            repeat: repeat,
            repeatDelay: 0,
            hold: 1000
        });
    }
    update() {

    }
}