import Game from './game';

const start = document.getElementById('start');
const add = document.getElementById('add');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

const game = new Game();
game.init(document.getElementById('container'));
game.render();

const play = () => {
    game.run();
    buttonState.playing();
}

const addBlock = () => {
    game.addBlock();
}

const pause = () => {
    buttonState.pause();
    game.stop();
}

const retry = () => {
    buttonState.init();
    game.reset();
}

const addClickEvent = (obj, fn) => {
    obj.addEventListener('click', fn);
}

const buttonState = {
    init: () => {
        start.disabled = false;
        add.disabled = true;
        stop.disabled = true;
        reset.disabled = true;
    },
    playing: () => {
        start.disabled = true;
        add.disabled = false;
        stop.disabled = false;
        reset.disabled = true;
    },
    pause: () => {
        start.disabled = false;
        add.disabled = true;
        stop.disabled = true;
        reset.disabled = false;
    }
}

addClickEvent(start, play);
addClickEvent(add, addBlock);
addClickEvent(stop, pause);
addClickEvent(reset, retry);
