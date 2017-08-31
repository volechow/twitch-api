function getStreamData(user) {
	$.getJSON(
		"https://wind-bow.glitch.me/twitch-api/streams/"+user,
		function(data) {
			var status_div;
			if (Boolean(data.stream)) {
				status_div = '<div class="col-sm-1 col-xs-2" class="status online" style="color:green;" id="'+user+'-status">online</div>';
			} else {
				status_div = '<div class="col-sm-1 col-xs-2" class="status offline" style="color:red;" id="'+user+'-status">offline</div>'
			}
			$("#results").append(
				'<div class="col-xs-12">'
				+'<a href="https://www.twitch.tv/'+user+'">'
				+'<div class="result col-xs-12" id="'+user+'">'
				+'<div class="row">'
				+ status_div
				+'<div class="col-sm-1 col-xs-3" class="logo"><img class="img-responsive" id="'+user+'-logo"></div>'
				+'<div class="col-sm-10 col-xs-7" id="'+user+'-content">'
				+'</div>'
				+'</div>'
				+'</div>'
				+'</a>'
				+'</div>'
			);
			getChannelData(user);
		} 
	);
}

function getChannelData(user) {
	$.getJSON(
		"https://wind-bow.glitch.me/twitch-api/channels/"+user, 
		function(data) {
			if (data.error) {
				$("#"+user+"-logo").attr("src", "not-found.jpeg");
				$("#"+user+"-status").removeAttr("style");
				$("#"+user+"-status").text("not found");
			} else {
				$("#"+user+"-logo").attr("src", data.logo);
				$("#"+user+"-content").html("\
					<p>"+data.display_name+"</p>\
					<p>"+data.status+"</p>");
			}
		}
	);
}

function getAllUsers(users) {
	$("#results").empty();
	for (var i = 0; i < users.length; i++) {
		getStreamData(users[i]);
	}
}

$( document ).ready(function() {
	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"]
	getAllUsers(users);
	
	$("#search-btn").click(function() {
		if ($("#search").val() !== "") {
			getStreamData($("#search").val());
		}
	});
	
	$("#all-btn").click(function() {
		getAllUsers(users);
	});

	$("#clear-btn").click(function() {
		$("#results").empty();
	});
});
