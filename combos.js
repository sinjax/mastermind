//Generate every set of codes
function all_combos () {
	var all_combos = [];
	for(var i = 0; i < 6; i++){
		for(j=0; j < 6; j++){
			for(k=0; k< 6; k++){
				for (n=0; n < 6; n++){
					combo = [i,j,k,n];
					all_combos.push(combo);
				}
			}
		}
	}
	return all_combos;
}

//Test how many times it takes the player to guess them



//Average it out	
