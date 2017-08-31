function getStreamData(user) {
	$.getJSON(
		"https://wind-bow.glitch.me/twitch-api/streams/"+user,
		function(data) {
			var status;
			if (Boolean(data.stream)) {
				status = "online";
			} else {
				status = "offline";
			}
			$("#"+user+"-status").text(status);
      $("#"+user).addClass(status);
		} 
	);
}

function getChannelData(user) {
	$.getJSON(
		"https://wind-bow.glitch.me/twitch-api/channels/"+user, 
		function(data) {
			if (data.error) {
				$("#"+user+"-logo").attr("src", "not-found.jpeg");
        $("#"+user+"-status").text("not found");
        $("#"+user).addClass("not-found");
			} else {
				$("#"+user+"-logo").attr("src", data.logo);
				$("#"+user+"-content").text(data.status);
			}
		}
	);
}

function appendUser(user) {
	$("#results").append(
		'<div class="result" id="'+user+'">'
			+'<a href="https://www.twitch.tv/'+user+'">'+user+"</a>"
      +'<div id="'+user+'-status">Not Found</div>'
			+'<img class="img-responsive" id="'+user+'-logo" src="not-found.jpeg">'
			+'<div id="'+user+'-content">Placeholder</div>'
		+'</div>'
	);
}

function getAllUsers(users) {
	$("#results").empty();
	for (var i = 0; i < users.length; i++) {
		appendUser(users[i]);
    getStreamData(users[i]);
    getChannelData(users[i]);
  }
}

$( document ).ready(function() {
	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
	getAllUsers(users);
	
	$("#all-btn").click(function() {
    getAllUsers(users);
	});

	$("#online-btn").click(function() {
    $(".offline").hide();
    $(".not-found").hide();
    $(".online").show();
	});

	$("#offline-btn").click(function() {
    $(".online").hide();
    $(".not-found").hide();
    $(".offline").show();
	});


});
