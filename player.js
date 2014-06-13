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

    this.state = [];
    this.turn = 0;
}

Game.prototype.start = function() {
    var self = this;

    this.player1.provide_code(function(code) {
        self.interface.code_chosen(code);
        self.code = code;

        self.next_turn();
    });
}
judge_totals = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0);
function judge(code,guess){
	n_whites = 0;
	n_blacks = 0;
	totals = judge_totals.slice(0); 
	for (var i = 0; i < code.length; i++) {
		totals[code[i]]++;
	};
	for (var i = 0; i < code.length; i++) {
		if(code[i] == guess[i]) {
			n_whites ++;
			totals[code[i]]--;
		} else if(totals[guess[i]] > 0){
			n_blacks ++ ;
			totals[guess[i]] --;
		}
	};

	return {
		"whites":n_whites,
		"blacks":n_blacks,
	}
}
Game.prototype.next_turn = function() {
    if (this.game_finished()) {
        this.interface.game_finished(this.state);
    } else {
        var self = this;
        this.player2.take_turn(this.state, function(guess) {

            self.state.push(judge(self.code,guess));
            self.turn += 1;

            self.interface.guess_made(guess, self.state);
            setTimeout(function() {
                self.next_turn();
            }, 2000);
        });
    }
}

Game.prototype.game_finished = function() {
    if (this.turn == 10) {
        return true;
    }

    for (var i in this.state) {
        if (this.state[i].whites == 4) {
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
    if(provide_code_callback!=undefined)provide_code_callback(code);
}

function UserPlayer() {};

UserPlayer.prototype = Player.prototype;


