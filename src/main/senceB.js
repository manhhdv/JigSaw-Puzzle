class SenceB extends Phaser.Scene {

    constructor() {
        super("SenceB");
    }

    preload() {
    }

    create() {
        var senceA = this.scene.get('SenceA');
        senceA.setTitleGame(this);

        var puzzlesBtn = this.add.image(game.config.width / 8, game.config.height / 1.71, 'lits', 'puzzlesBtn_c');

        puzzlesBtn.setInteractive().on('pointerdown', function () {
            this.scene.start('Puzzles');
        }, this);
        var acBtn = this.add.image(game.config.width / 1.8, game.config.height / 1.71 + 176, 'lits', 'acBtn_c');
        acBtn.setRotation(-Math.PI / 2);

        acBtn.setInteractive().on('pointerdown', function () {
            this.scene.start('AnphabetCard');
        }, this);
        var returnBtn = this.addReturnBtn(this);
        returnBtn.setInteractive().on('pointerdown', function () {
            this.scene.start('SenceA');
        }, this);
    }
    addReturnBtn(object) {
        // var returnBtn = object.add.image(game.config.width / 1.09, game.config.height / 1.2, 'lits', 'returnBtn_c');
        let returnBtn = object.add.image(game.config.width / 1.09, game.config.height / 1.2 + 94, 'lits', 'returnBtn_r');
        returnBtn.setRotation(-Math.PI / 2);
        return returnBtn;
    }
}