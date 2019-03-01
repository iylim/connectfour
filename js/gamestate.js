class GameState {
  constructor(player1, player2, player1Turn) {
    this.player1 = player1;
    this.player2 = player2;
    this.player1Turn = true;
  }

  resetPlayer() {
    this.player1Turn = true;
  }

  getPlayer1Turn() {
    return this.player1Turn;
  }

  switchTurns() {
    this.player1Turn = !this.player1Turn;
  }
}

const gameState = new GameState('player1', 'player2', true);
  export default gameState;
