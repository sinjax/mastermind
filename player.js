function player(){
	this.provide_guess = function() {
		console.log("Cheese");
	};
	this.recieve_feedback = function(feedback){

	};
}

x = player();
x.provide_guess();