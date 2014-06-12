function Interface() {}

Interface.prototype.code_chosen = function(n) {
    console.log("The code chosen was:", n)
}

Interface.prototype.guess_made = function(guess, state) {
    console.log("New guess made:", guess);
    console.log("New state:", state);
};

Interface.prototype.game_finished = function(state) {
    console.log("Game finished:", state);
}


function Game(interface_class, player1_class, player2_class) {
    this.interface = new interface_class();
    this.player1 = new player1_class();
    this.player2 = new player2_class();

    this.state = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    this.turn = 0;
}

Game.prototype.start = function() {
    this.player1.provide_code(function(code) {
        this.interface.code_chosen(code);
        this.code = code;

        this.next_turn();
    });
}

Game.prototype.next_turn = function() {
    if (this.game_finished()) {
        this.interface.game_finished(this.state);
    } else {
        this.player2.take_turn(this.state, function(guess) {
            result = {
                "misses": 0,
                "partially_correct": 0,
                "correct": 0
            };

            for (var i in guess) {
                if (guess[i] == code[i]) {
                    result["correct"] += 1;
                } else if (guess[i] in code) {
                    result["partially_correct"] += 1;
                } else {
                    result["misses"] += 1;
                }
            }

            this.state[this.turn] = result;
            this.turn += 1;

            this.interface.guess_made(guess, this.state);
            setTimeout(this.next_turn, 2000);
        });
    }
}

Game.prototype.game_finished = function() {
    if (this.turn == 10) {
        return true;
    }

    for (var i in this.state) {
        if (this.state[i].correct == 4) {
            return true;
        }
    }

    return false;
}


function Player() {}

Player.prototype.take_turn = function(state, take_turn_callback) {
    // This indicates that the player can take their first turn
    var code = [];
    for (i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 5));
    }
    take_turn_callback(code);
}

Player.prototype.provide_code = function(provide_code_callback) {
    var code = [];
    for (i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 5));
    }
    provide_code_callback(code);
}

g = Game(Interface, UserPlayer, AiPlayer)