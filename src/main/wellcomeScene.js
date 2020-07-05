class WellcomeScene extends Phaser.Scene {

    constructor() {
        super("WellcomeScene");
    }

    preload() {

    }

    create() {
        console.log(this.scene.key);
        var bg_sound = this.sound.add('bg');
        var clickSound = this.sound.add('btn');
        var configSound = {
            loop: false
        };
        bg_sound.play(configSound);

        var bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0);
        var bg = this.setTitleGame(this);
        bg[0].setPosition(game.config.width / 6.4, -150);
        bg[1].setPosition((game.config.width) / 2.666666667, -150);
        bg[2].setPosition(game.config.width / 2.258, -150);

        var playBtn_r = this.add.image(game.config.width / 2.666667, game.config.height / 1.2, 'lits', 'play_btn_r');

        playBtn_r.setRotation(-Math.PI / 2);
        playBtn_r.setScale(0);
        var bootGame=this.scene.get('BootGame');
        bootGame.changeSceneEffect(this,16);
        var timeline = this.tweens.timeline({
            delay: 2000,
            tweens: [
                {
                    targets: bg[0],
                    props: {
                        y: {value: game.config.height / 5.4, duration: 500, ease: 'Bounce.easeOut'}
                    },
                    delay: 1000
                },
                {
                    targets: bg[1],
                    props: {
                        y: {value: game.config.height / 2.7, duration: 1000, ease: 'Bounce.easeOut'}
                    },
                    delay: 0
                },
                {
                    targets: bg[2],
                    props: {
                        y: {value: game.config.height / 1.8 + 39, duration: 1000, ease: 'Bounce.easeOut'}
                    },
                    delay: 0
                },
                {
                    targets: playBtn_r,
                    scaleX: '+=1',
                    scaleY: '+=1',
                    duration: 1000,
                    ease: 'Sine.easeInOut',
                    delay: 0,
                    paused: false,
                    repeat: 0
                }
            ]
        });

        playBtn_r.setInteractive().on('pointerdown', function (event) {
            bg_sound.stop();
            clickSound.play(configSound);
            this.cameras.main.once('camerafadeincomplete', function (camera) {
                camera.fadeIn(200, 255);
            });
            setTimeout(() => this.scene.start('SenceB'), 200);

        }, this);

    }

    setTitleGame(object) {

        var title_game = object.add.image(game.config.width / 6.4, game.config.height / 5.4, 'lits', 'title_game');
        var title_game_1 = object.add.image(game.config.width / 2.666666667, game.config.height / 2.7, 'lits', 'title_game_1');
        var title_game_2 = object.add.image(game.config.width / 2.258, game.config.height / 1.8 + 39, 'lits', 'title_game_2');
        title_game_2.setRotation(-Math.PI / 2);
        return [title_game, title_game_1, title_game_2];
    }
}




