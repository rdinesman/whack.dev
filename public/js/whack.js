//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// GLOBAL VARIABLES ///////////////////////////////////////////
	// Empty string to hold inbound inner HTML
	var htmlStr = "";

	// Raptors with different speeds, images, and point values
		var raptor1 = {
			"name" : "raptor1",
			"spd" : "2000",
			"img" : "/img/raptor2.png",
			"value" : "1"

		}

		var raptor2 = {
			"name" : "raptor2",
			"spd" : "1000",
			"img" : "/img/raptor1.png",
			"value" : "2"
		}

		var raptor3 = {
			"name" : "raptor3",
			"spd" : "500",
			"img" : "/img/raptor3.png",
			"value" : "3"
		}

	// Arrays that hold all the raptors and the list of empty boxes
	var raptors = [raptor1, raptor2, raptor3];
	var nums = ["#box1", "#box2", "#box3", "#box4", "#box5", "#box6", "#box7", "#box8", "#box9", "#box10", "#box11", "#box12", "#box13", "#box14", "#box15","#box16"];
	var timeouts = ["#box1", "#box2", "#box3", "#box4", "#box5", "#box6", "#box7", "#box8", "#box9", "#box10", "#box11", "#box12", "#box13", "#box14", "#box15","#box16"];

	// Default game variables
	var score = 0;
	var time = 0;
	var play = false;
	var lives = 3;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// FUNCTIONS //////////////////////////////////////////////////
	// Main game function.
	var playGame = function(){
		var game = setInterval(function(){
			if (play){
				$("#time").html(++time);
				var raptor = getRaptor();
				var box = displayRaptor(raptor);

				// timeouts["#" + $(box).attr("id")] = setTimeout(function(){
				// 	lives --;
				// 	$(box).attr("value", 0);
				// 	nums.push('#' + $(box).attr("id"));
				// 	$(box).html("");
				// }, raptor.speed);

				// $(".box").off();
				// $(".box").on("click", function(event){
					
				// 	if ($(this).html() != ""){
				// 		//Add the box back to the array, and delete the raptor
				// 		nums.push('#' + $(this).attr("id"));
				// 		$(this).html("");

				// 		//Add the score the score, set the box's value back to zero
				// 		score += parseInt($(this).attr("value"));
				// 		$(this).attr("value", 0);
				// 		$("#score").html(score);
						
				// 		console.log('#' + $(this).attr("id"));
				// 		console.log(timeouts['#' + $(this).attr("id")]);
				// 		clearTimeout(timeouts['#' + $(this).attr("id")]);
				// 		console.log("cleared:");
				// 		console.log(timeouts['#' + $(this).attr("id")]);
				// 	}
				// });
				
				

				//Updates the life counter
				var liveImg = "";
				for (var i = 0; i < lives; i++){
					liveImg += "X ";
				}
				$("#lives").html(liveImg);


				if (checkLose()){
					clearInterval(game);
				}
			}
			else{
				clearInterval(game);
			}
		}, 1000);
	}

	// Check how long the game has been running, and returns 
	// an appropriate raptor
	var getRaptor = function(){
		if (time < 20){
			return raptors[0];
		}
		else if (time < 40){
			var rand = Math.floor(Math.random() * 2);
			return raptors[rand];
		}
		else{
			var rand = Math.floor(Math.random() * 3);
			return raptors[rand];
		}
	}

	// Given a raptor, displays the raptor in a random box that
	// doesn't already have a raptor in it
	var displayRaptor = function(raptor){
		// console.log("Starting displayRaptor");
		var good = false;
		var box;
		var rand = Math.floor(Math.random() *nums.length);
		var htmlStr = "<img class = 'raptor' src = '" + raptor.img + "'>";
		$(nums[rand]).attr("value", raptor.value);
		$(nums[rand]).html(htmlStr);
		console.log("Raptor popping up in " + nums[rand]);
		// console.log(rand);
		// console.log(nums[rand]);
		// console.log(raptor)
		// console.log(htmlStr);
		var timeoutBox = nums[rand];
		setTheTimeout(timeoutBox);
		// timeouts[nums[rand]] = setTimeout(function(){
		// 			console.log(timeoutBox);
		// 			lives --;
		// 			$(timeoutBox).attr("value", 0);
		// 			nums.push('#' + $(timeoutBox).attr("id"));
		// 			$(timeoutBox).html("<p>Some stuff</p>");
		// 		}, raptor.speed);
		// console.log('Setting: ' + timeouts[nums[rand]]);
		nums.splice(rand, 1);
		// return $(nums[rand]);
		// console.log(nums);
		
	}

	var setTheTimeout = function(timeoutBox){
		console.log(timeoutBox);
		var speed = 2000;
		timeouts[timeoutBox] = setTimeout(function(){
					lives --;
					$(timeoutBox).attr("value", 0);
					nums.push('#' + $(timeoutBox).attr("id"));
					$(timeoutBox).html("");
				}, speed);
	}

	// If lives are zero, or every box has a raptor, you lose
	var checkLose = function(){
		if (lives == 0){
			// console.log("Lives are zero. Game over.")
			alert("You were mauled to death!");
			play = false;
			return true;
		}
		else if (nums.length == 0){
			// console.log("All boxes full, game over.")
			alert("You were overrun by raptors and eaten!");
			play = false;
			return true;
		}
	}

	// Sets all the game variables to default, and clears the baord
	var clear = function(){
		nums = ["#box1", "#box2", "#box3", "#box4", "#box5", "#box6", "#box7", "#box8", "#box9", "#box10", "#box11", "#box12", "#box13", "#box14", "#box15","#box16"];
		score = 0;
		time = 0;
		lives = 3;

		$("#score").html(score);
		$("#lives").html("X X X");
		$("#time").html(time);
		for (var i = 1; i < 17; i++){
			$("#box"+i).html("");
		}
	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// MAIN ///////////////////////////////////////////////////////
	// Set up the boxes, and fill boxes[]
	for (var i = 1; i < 17; i++)
	{
		htmlStr +='<div class = "box" id = box' + i + ' value = 0>'+
					// '<div class = "grate" id = "grate'+ i +'">'+

					// '</div>'+
				'</div>';
		
	}
	$("#main").html(htmlStr);

	// Click listener for the start button. Starts/stops the game
	$("#start").click(function(event){
		play = !play;
		if (play){
			clear();
			playGame();	
		}
	})

	$(".box").on("click", function(event){
					
		if ($(this).html() != ""){
			//Add the box back to the array, and delete the raptor
			nums.push('#' + $(this).attr("id"));
			$(this).html("");

			//Add the score the score, set the box's value back to zero
			score += parseInt($(this).attr("value"));
			$(this).attr("value", 0);
			$("#score").html(score);
			
			// console.log('#' + $(this).attr("id"));
			console.log('Clearing: ' + timeouts['#' + $(this).attr("id")]);
			clearTimeout(timeouts['#' + $(this).attr("id")]);
			// console.log("cleared:");
			// console.log(timeouts['#' + $(this).attr("id")]);
		}
	});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//