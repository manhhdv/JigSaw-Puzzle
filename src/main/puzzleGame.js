class PuzzleGame extends Phaser.Scene {
    constructor() {
        super("PuzzleGame");
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
        this.coutDrop;
    }

    create() {
        this.coutDrop = 0;
        this.setBg(this);
        var sceneB = this.scene.get('SenceB');
        sceneB.addCloud(this);
        this.setAbcImange(this, this.id_img + 'PuzzleOra');
        this.gameBg(this);
        var nextBtn = this.setNextBtn(this).setInteractive();
        nextBtn.on('pointerdown', function () {
            let clickSound = this.sound.add('btn');
            clickSound.play({loop: false});
            this.scene.start("PuzzleGame", {frameAbc: this.listAbc, indexImg: this.id_img_next});
        }, this);

        this.setreturnBtn(this);
        var position = {
            '1': [1.23, 5],
            '2': [1.18, 2.5],
            '3': [1.32, 2.5],
            '4': [1.23, 1.85]
        };
        var dropPosition = {
            '1': [522, 477],
            '2': [582, 271],
            '3': [309, 219],
            '4': [253, 432]
        }
        var abcPuzzle = [1, 2, 3, 4];
        abcPuzzle = this.shuffle(abcPuzzle);
        for (let i = 0; i < 4; i++) {
            let x = position[i + 1][0];
            let y = position[i + 1][1];
            let dx = dropPosition[abcPuzzle[i]][0];
            let dy = dropPosition[abcPuzzle[i]][1];
            this.createPuzzle(this, this.id_img + 'Puzzle' + abcPuzzle[i], x, y, dx, dy, abcPuzzle[i])
        }
    }

    createPuzzle(sceneName, name, positionX, positionY, dropPositionX, dropPositionY, key) {
        let puzzle = sceneName.setAbcPuzzle(this, name, positionX, positionY).setInteractive();
        puzzle.setName(key);
        this.setDragandDrop(sceneName, puzzle, key, dropPositionX, dropPositionY);
        return puzzle;
    }

    startDrag(img) {
        img.on('dragstart', function (pointer, gameObject) {
            img.setScale(1);
            img.setAngle(0);
            
        })
    }

    setDragandDrop(sceneName, abcPuzzle, name, ax, by) {
        var countMode = 0;
        sceneName.input.setDraggable(abcPuzzle);
        var zone = sceneName.add.zone(ax, by, 336, 275).setDropZone();
        zone.setName(name);

        sceneName.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = pointer.x;
            gameObject.y = pointer.y;
            sceneName.children.bringToTop(gameObject);
        });
        abcPuzzle.on('dragstart', function (pointer, gameObject) {
            let pickSound = sceneName.sound.add('pick');
                    pickSound.play({
                        loop: false
                    });
            abcPuzzle.setScale(1);
            abcPuzzle.setAngle(0);
        })
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                sceneName.tweens.add({
                    targets: gameObject,
                    x: gameObject.input.dragStartX,
                    y: gameObject.input.dragStartY,
                    scale: 0.3,
                    angle: Phaser.Math.Between(20, 290),
                    ease: 'Bounce.easeIn',
                    duration: 1500,
                    delay: 0,
                    repeat: 0,

                    hold: 1000
                });
            }
        });
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (dropZone.name === gameObject.name) {
                this.tweens.timeline({
                    tweens: [
                        {
                            targets: gameObject,
                            x: dropZone.x,
                            y: dropZone.y,
                            scale: '+=0.2',
                            duration: 300,
                            ease: 'Sine.easeInOut',
                            delay: 0,
                            paused: false,
                            repeat: 0
                        },
                        {
                            targets: gameObject,
                            scale: '-=0.2',
                            duration: 300,
                            ease: 'Sine.easeInOut',
                            delay: 0,
                            paused: false,
                            repeat: 0
                        }
                    ]
                });
                gameObject.input.enabled = false;
                this.coutDrop++;
                if (this.coutDrop % 4 == 0) {
                    let droppedSound = sceneName.sound.add('bingo');
                    droppedSound.play({
                        loop: false
                    });
                }
                if (this.coutDrop == 16) {
                    this.playAbcSound();
                }
            } else {
                sceneName.tweens.add({
                    targets: gameObject,
                    x: gameObject.input.dragStartX,
                    y: gameObject.input.dragStartY,
                    scale: 0.3,
                    angle: Phaser.Math.Between(20, 290),
                    ease: 'Bounce.easeIn',
                    duration: 1500,
                    delay: 0,
                    repeat: 0,
                    hold: 1000
                });
            }
        }, this);
    }

    playAbcSound() {
        var abcSound = this.sound.add(this.id_img + 'Sound');
        abcSound.play({
            loop: false,
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
            this.clickSound(object);
            object.scene.start('Puzzles');
        }, this);
        return re;
    }

    setAbcPuzzle(object, name, ax, ay) {
        var abcPuzzle = object.add.image(game.config.width / ax, game.config.height / ay, name).setScale(0.3);
        abcPuzzle.setAngle(Phaser.Math.Between(20, 360));
        return abcPuzzle;
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
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
