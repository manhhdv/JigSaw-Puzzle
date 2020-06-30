class PuzzleGame extends Phaser.Scene {
    constructor() {
        super("PuzzleGame");
    }

    init(data) {
        console.log('init', data.name_image);
        this.id_img = data.name_image;
    }

    create() {
        // console.log(data);
        this.setBg(this);
        this.setAbcImange(this, this.id_img + 'PuzzleOra');
        this.gameBg(this);
        this.setNextBtn(this);
        this.setreturnBtn(this);
        // 4/3,4.8
        var position = {
            '1': [1.23, 6],
            '2': [1.16, 3],
            '3': [1.3, 3],
            '4': [1.23, 2]
        };
        var abcPuzzle = [];
        abcPuzzle[0] = null;
        abcPuzzle[1] = this.setAbcPuzzle(this, this.id_img + 'Puzzle1', position[1][0], position[1][1]).setInteractive();
        abcPuzzle[2] = this.setAbcPuzzle(this, this.id_img + 'Puzzle2', position[2][0], position[2][1]).setInteractive();
        abcPuzzle[3] = this.setAbcPuzzle(this, this.id_img + 'Puzzle3', position[3][0], position[3][1]).setInteractive();
        abcPuzzle[4] = this.setAbcPuzzle(this, this.id_img + 'Puzzle4', position[4][0], position[4][1]).setInteractive();
        abcPuzzle[1].setName("1");
        abcPuzzle[2].setName("2");
        abcPuzzle[3].setName("3");
        abcPuzzle[4].setName("4");

        this.setDragandDrop(this, abcPuzzle[1], "1", 1, 1,0,112);
        this.setDragandDrop(this, abcPuzzle[2], "2", 1, 0,0,0);
        this.setDragandDrop(this, abcPuzzle[3], "3", 0, 0,0,0);
        this.setDragandDrop(this, abcPuzzle[4], "4", 0, 1,86,0);

    }

    startDrag(img) {
        img.on('dragstart', function (pointer, gameObject) {
            img.setScale(1);
            img.setAngle(0);
        })
    }

    setDragandDrop(sceneName, abcPuzzle,name ,ax, by,diffx,diffy) {
        sceneName.input.setDraggable(abcPuzzle);
        var zone = sceneName.add.zone(72 + ax * 336, 75 + by * 275, 336, 275).setRectangleDropZone(336, 275);
        zone.setName(name);
        sceneName.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX ;//- 200;
            gameObject.y = dragY ;//- 100;
            sceneName.children.bringToTop(gameObject);
        });
        this.startDrag(abcPuzzle);

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                gameObject.setScale(0.25);
                gameObject.setAngle(Phaser.Math.Between(20, 40));
            }

        });
        this.input.on('drop', function (pointer, gameObject, dropZone, target) {

            if (dropZone.name === gameObject.name) {
                gameObject.x = dropZone.x-diffx;
                gameObject.y = dropZone.y-diffy;
                gameObject.input.enabled = false;
                console.log(dropZone.name ,gameObject.name);
                console.log(diffx,diffy);
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;

                gameObject.setScale(0.25);
                gameObject.setAngle(Phaser.Math.Between(20, 40));
            }
        });


    }

    setBg(object) {
        var bg = object.add.image(0, 0, 'bg');
        bg.setOrigin(0);
        return bg;
    }

    gameBg(object) {
        var albumBg = object.add.image(game.config.width / 16, game.config.height / 9, 'album_bg');
        albumBg.setOrigin(0);
        var select_bg = object.add.image(game.config.width / 1.4, game.config.height / 9, 'select_bg');
        select_bg.setOrigin(0);
        var selectBorder = object.add.image(game.config.width / 1.4, game.config.height / 9, 'selectBorder');
        selectBorder.setOrigin(0);
        // var nextBtn=object.add.image(game.config.width/1.45,game.config.height/1.2,'lits','nextBtn');
    }

    setAbcImange(object, nameImg) {
        var abcPuzzleOra = object.add.image(game.config.width / 16, game.config.height / 9, nameImg);
        abcPuzzleOra.setOrigin(0);
        return abcPuzzleOra;
    }

    setNextBtn(object) {
        var nextBtn = object.add.image(game.config.width / 1.45, game.config.height / 1.2, 'lits', 'nextBtn');
        return nextBtn;
    }

    setreturnBtn(object) {
        let senceB = object.scene.get('SenceB');
        let re = senceB.addReturnBtn(object);
        re.setInteractive().on('pointerdown', function () {
            object.scene.start('SenceB');
        }, object);
        return re;
    }

    setAbcPuzzle(object, name, ax, ay) {
        var abcPuzzle = object.add.image(game.config.width / ax, game.config.height / ay, name).setScale(0.25);
        abcPuzzle.setOrigin(0);
        abcPuzzle.setAngle(Phaser.Math.Between(20, 40));
        return abcPuzzle;
    }
}