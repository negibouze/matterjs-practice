import Game from './game';

const screen = document.getElementById('screen')
const startButton = document.getElementById('start')
const rotateButton = document.getElementById('rotate')
const goButton = document.getElementById('go')
const stopButton = document.getElementById('stop')
const resetButton = document.getElementById('reset')
const leftButton = document.getElementById('left')
const rightButton = document.getElementById('right')

const game = new Game();
game.init(screen);
game.render();

const play = () => {
    game.run();
    buttonState.playing();
}

const rotate = () => {
    game.rotate();
}

const go = () => {
    game.go();
}

const pause = () => {
    buttonState.pause();
    game.stop();
}

const retry = () => {
    buttonState.init();
    game.reset();
}

const left = () => {
    game.left();
}

const right = () => {
    game.right();
}

const addClickEvent = (obj, fn) => {
    obj.addEventListener('click', fn);
}

const buttonState = {
    init: () => {
        buttonState.disableAll();
        startButton.disabled = false;
    },
    playing: () => {
        buttonState.enableAll();
        startButton.disabled = true;
        resetButton.disabled = true;
    },
    pause: () => {
        buttonState.enableAll();
        goButton.disabled = true;
        stopButton.disabled = true;
    },
    enableAll: () => {
        startButton.disabled = false;
        rotateButton.disabled = false;
        goButton.disabled = false;
        stopButton.disabled = false;
        resetButton.disabled = false;
        leftButton.disabled = false;
        rightButton.disabled = false;
    },
    disableAll: () => {
        startButton.disabled = true;
        rotateButton.disabled = true;
        goButton.disabled = true;
        stopButton.disabled = true;
        resetButton.disabled = true;
        leftButton.disabled = true;
        rightButton.disabled = true;
    }
}

addClickEvent(startButton, play);
addClickEvent(rotateButton, rotate);
addClickEvent(goButton, go);
addClickEvent(stopButton, pause);
addClickEvent(resetButton, retry);
addClickEvent(leftButton, left);
addClickEvent(rightButton, right);
