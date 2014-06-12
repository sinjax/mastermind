function Interface() {}

Interface.prototype.code_chosen = function(n) {
    console.log("The code chosen was:", n)
}

Interface.prototype.guess_made = function(guess, state) {
    console.log("New guess made:", guess);
    console.log("New state:", state);
}


function Game() {
    this.state = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}

Game.prototype.start = function(interface_class, player1_class, player2_class) {
    this.interface = new interface_class();
    this.player1 = new player1_class();
    this.player2 = new player2_class();

    code = this.player1.provide_code();

    this.interface.code_chosen(code);

    while (!this.game_finished()) {}
}

Game.prototype.game_finished = function() {
    return false;
}


function Player() {}

Player.prototype.take_turn = function(state) {
    // This indicates that the player can take their first turn
}

Player.prototype.provide_code = function() {
    var code = [];
    for (i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 5));
    }
    return code;
}