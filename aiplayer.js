
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
		
		// Now remove possible correct answers which don't return the same judgement as the current guess
		for (var i = this.S.length - 1; i >= 0; i--) {
			j = judge(this.c[this.S[i]],this.current_guess)
			if(j["whites"] != prev_state["whites"] || j["blacks"] != prev_state["blacks"]){
				this.S.splice(i,1)
			}
		};
		
		var min = Math.pow(2, 53);
		var newcurrent;
		// Min max bit:
		// 		amoungst all the guesses not tried so far, 
		// 			find the judgement combination that would match the most in current possibilities
		//				(this is like the worst case scenario, the MOST current possibilities it would keep active)
		// 		hold on to the guess that has the smallest, worst case scenario
		//			if the a few are all equally small, prefer those which are current possibilities
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
				
				min = max;
				newcurrent = this.unused[i];
			}
		};
		this.current_guess = this.c[newcurrent];
		this.current_guess_index = newcurrent
	}
	
	if(callback!=undefined) callback(this.current_guess)
	return this.current_guess;
}

