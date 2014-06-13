
function AIPlayer () {
	this.c = all_combos();
	this.current_guess = [0,0,1,1];
	this.S = Array.apply(null, {length: this.c.length}).map(Number.call, Number);
	this.unused = Array.apply(null, {length: this.c.length}).map(Number.call, Number);
	this.current_guess_index = this.unused.filter(function (element) {
		return (
			this.c[element][0] == this.current_guess[0] && 
			this.c[element][1] == this.current_guess[1] && 
			this.c[element][2] == this.current_guess[2] && 
			this.c[element][3] == this.current_guess[3] 
		)
	},this)[0];
}

AIPlayer.prototype = Player.prototype

// 
AIPlayer.prototype.take_turn= function(state,callback) {
	// No previous state, don't bother with this lot, just go with the initial guess of 0,0,1,1
	if(state.length != 0){
		prev_state = state[state.length - 1]
		// First lets remove the thing we've already
		this.unused.splice(this.current_guess_index,1)
		for (var i = this.S.length - 1; i >= 0; i--) {
			j = judge(this.c[this.S[i]],this.current_guess)
			if(j["whites"] != prev_state["whites"] || j["blacks"] != prev_state["blacks"]){
				this.S.splice(i,1)
			}
		};
		// console.log("S is now: %d long",this.S.length)
		var min = Math.pow(2, 53);
		var newcurrent;
		for (var i = 0; i < this.unused.length; i++) {
			
			var max = 0;
			for (var white = 0; white <= 4; white++) {
				for (var black = 0; black <= 4-white; black++) {
					var score = 0;
					for (var possible = 0; possible < this.S.length; possible++) {
						var judged = judge(this.c[this.unused[i]],this.c[this.S[possible]])

						if(
							judged["whites"] == white && 
							judged["blacks"] == black){
							score ++;
						}
					};
					if(score > max){
						max = score;
					}
				};
			};
			if(max < min || (max <= min && this.S.indexOf(this.unused[i])>-1)){
				// console.log("%s scores %d",JSON.stringify(this.c[this.unused[i]]),max)
				min = max;
				newcurrent = this.unused[i];
			}
		};
		this.current_guess = this.c[newcurrent];
		this.current_guess_index = newcurrent
	}
	// console.log("Done, guessing: %s",JSON.stringify(this.current_guess))
	if(callback!=undefined) callback(this.current_guess)
	return this.current_guess;
}
// AIPlayer.prototype.provide_code = function(provide_code_callback) {
//     var code = [0,1,0,4];
//     if(provide_code_callback!=undefined)
//     	provide_code_callback(code);
//     return code;
// }
ap = new AIPlayer()
state = []
correct = ap.provide_code()
function game_turn () {
	console.log("Starting turn %d",state.length+1)
	ret = ap.take_turn(state);
	console.log("Recieved guess: %s",JSON.stringify(ret))
	judgement = judge(correct,ret)
	console.log("Made Judgement: %s",JSON.stringify(judgement))
	state.push([ret,judgement]);
	if(judgement["whites"] == 4){
		console.log("Victory!")
		return true;
	}
	return false;
}
