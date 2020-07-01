class WellcomeScene extends Phaser.Scene {

    constructor() {
        super("WellcomeScene");
    }

    preload() {

    }

    create() {
        var bg_sound=this.sound.add('bg');
        bg_sound.play({
            loop:false
        });
        this.setTitleGame(this);
        // var playBtn_c = this.add.image(game.config.width / 2.666667, game.config.height / 1.2, 'lits', 'play_btn_c');
        var playBtn_r = this.add.image(game.config.width / 2.666667, game.config.height / 1.2, 'lits', 'play_btn_r');
        // playBtn_c.setRotation(-Math.PI / 2);
        playBtn_r.setRotation(-Math.PI / 2);
        playBtn_r.setInteractive().on('pointerdown', function (event) {
            this.scene.start('SenceB');
            console.log("hello");
        }, this);
        // playBtn_c.setInteractive().on('pointerdown', function (event) {
        //     this.scene.start('SenceB');
        //     console.log("hello");
        // }, this);
    }
    setTitleGame(object) {
        var bg = object.add.image(0, 0, 'bg');
        bg.setOrigin(0);
        var title_game = object.add.image(game.config.width / 6.4, game.config.height / 5.4, 'lits', 'title_game');
        var title_game_1 = object.add.image((game.config.width) / 2.666666667, game.config.height / 2.7, 'lits', 'title_game_1');
        var title_game_2 = object.add.image(game.config.width / 2.258, game.config.height / 1.8 + 39, 'lits', 'title_game_2');
        title_game_2.setRotation(-Math.PI / 2);
    }
}




