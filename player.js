
function player(){
}

player.prototype.provide_guess = function() {
	console.log("Cheese");
};
player.prototype.recieve_feedback = function(feedback){

};
player.prototype.provide_code = function() {
}

x = new player();
x.provide_guess();
console.log(x.provide_code())