import Game from './game';

const game = new Game();
game.init(document.getElementById('container'));
game.render();

const start = () => {
    game.run();
    game.addBlock();
}

const stop = () => {
    game.stop();
}

document.getElementById('start').addEventListener('click', start);
