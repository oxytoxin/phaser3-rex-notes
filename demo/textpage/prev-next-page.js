'use strict'

import TextPagePlugin from './../../plugins/textpage-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'demo'
        })
    }

    preload() {}

    create() {
        var lines = [];
        for (var i = 0; i < 50; i++) {
            lines.push(i.toString());
        }

        var txt = this.add.text(100, 100, '', {
            maxLines: 7
        });
        txt.page = new TextPagePlugin(txt, {
            //text: lines
        });
        txt.page.setText(lines);
        txt.page.showPage();

        this.input.keyboard.on('keydown_DOWN', txt.page.showNextPage, txt.page);
        this.input.keyboard.on('keydown_UP', txt.page.showPreviousPage, txt.page);


        var printPageIdx = function(){
            var page = txt.page;
            var s = page.pageIdx + "/" + page.pageNum
            if (page.isLastPage) {
                s += "-- last page"
            }
            console.log(s);
        }
        printPageIdx();
        this.input.keyboard.on('keydown_UP', printPageIdx);
        this.input.keyboard.on('keydown_DOWN', printPageIdx);         
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);