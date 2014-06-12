function Interface() {}

<<<<<<< HEAD
Player.prototype.take_turn= function(state) {
    // The player is making a guess
}

=======
Interface.prototype.code_chosen = function(n) {
    console.log("The code chosen was:", n)
}

Interface.prototype.guess_made = function(guess, state) {
    console.log("New guess made:", guess);
    console.log("New state:", state);
}


function Game(interface_class, player1_class, player2_class) {
    this.interface = new interface_class();
    this.player1 = new player1_class();
    this.player2 = new player2_class();

    this.state = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
}

Game.prototype.start = function() {
    var code = this.player1.provide_code();

    this.interface.code_chosen(code);

    while (!this.game_finished()) {
        guess = this.player2.take_turn(this.state)
    }
}

Game.prototype.game_finished = function() {
    return false;
}


function Player() {}

Player.prototype.take_turn = function(state) {
    // This indicates that the player can take their first turn
}

>>>>>>> 4018e0715b60e01e8d05cfb836163a5e2645f1cc
Player.prototype.provide_code = function() {
    var code = [];
    for (i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 5));
    }
    return code;
}
