
// eslint-disable-next-line max-len
import { START_BUTTON_NODE, SCORE_COUNT_NODE, SCORE_RECORD_NODE, MESSAGE_NODE, BOARD_NODE, AD_NODE } from './constants.js';
import { Board } from './classes/Board.js';
import { StartButton } from './classes/StartButton.js';
import { ScoreCounter } from './classes/ScoreCounter.js';
import { Advertisement } from './classes/Advertisement.js';
import { Message } from './classes/Message.js';
import { EventHandler } from './classes/EventHandler.js';

const startButton = new StartButton(START_BUTTON_NODE, stopGame, startGame);
const scoreCounter = new ScoreCounter(SCORE_COUNT_NODE, SCORE_RECORD_NODE);
const message = new Message(MESSAGE_NODE, scoreCounter, startGame, stopGame);
const board = new Board(BOARD_NODE, scoreCounter);
const eventHandler = new EventHandler(board, gameOver);
const advertisement = new Advertisement(AD_NODE);

function startGame() {
  advertisement.setAd();
  board.resetLinkedCards();
  board.firstSpawn(2);
  startButton.toggle();

  eventHandler.start();
}

function stopGame() {
  advertisement.setGameInfo();
  scoreCounter.reset();
  board.clear();
  startButton.toggle();

  eventHandler.stop();
}

function gameOver(won) {
  if (scoreCounter.counter > scoreCounter.record) {
    scoreCounter.updateRecord();
  }

  scoreCounter.updateHTML();
  message.showMessage(won);
}
