function Player() {}

Player.prototype.take_turn= function(state) {
    // The player is making a guess
}

Player.prototype.provide_code = function() {
    var code = [];
    for (i = 0; i < 6; i++) {
        code.push(Math.floor(Math.random() * 5));
    }
    return code;
}
