function Player() {}

Player.prototype.make_guess = function() {
    // The player is making a guess
}

Player.prototype.start_game = function() {
    // This indicates that the player can take their first turn
}

Player.prototype.receive_feedback = function(feedback) {
    // This passes the feedback from the player's last guess
    this.last_feedback = feedback;
};

Player.prototype.provide_code = function() {
    var code = [];
    for (i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 5));
    }
    return code;
}