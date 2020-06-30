class AnphabetCard extends Phaser.Scene{
    constructor() {
        super("AnphabetCard");
    }
    preload(){

    }
    create(){
        var anphabetCard=this.scene.get('AbcLoader');
        anphabetCard.addBg(this);
        anphabetCard.addAbc(this,'AnphabetGame');
        anphabetCard.setReturnBtn(this);
    }
}