//setup keyboard Enter key
function keyboardPress(event) {
  if (event.keyCode == 13 || event.which == 13) {
    event.preventDefault();
    searchTwitch();
  }
}

function searchTwitch() {
  //seed data
  var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];

  // declare all required variables
  var displaArea    = document.getElementById('displaArea');
  var logo          = document.getElementById('logo');
  var streamer      = document.getElementById('streamer');
  var details       = document.getElementById('details');
  var inputValue    = document.getElementById('input').value;
  var xmlhttp       = new XMLHttpRequest();
  var twitchUrl     = 'https://api.twitch.tv/kraken/streams/' + inputValue;
  console.log('twitchUrl: ' + twitchUrl);

  //The XMLHttpRequest.readyState property returns the state an XMLHttpRequest client is in. (see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { //4 means The operation is complete.
      var twitchResponse = JSON.parse(xmlhttp.responseText);
      console.log('twitchResponse: ' + twitchResponse);
        //clear old data
      displayStreams(twitchResponse);
    } else {
      console.error(xmlhttp.statusText);
    }
    // console.log(xmlhttp.onerror);
}
  xmlhttp.open('GET', twitchUrl, true);
  xmlhttp.send();

  function displayStreams(twitchResponse) {
    console.log('twitchResponse.stream: ' + twitchResponse.stream);
      switch (twitchResponse.stream) {
        case null:
        displayOfflineStreams(twitchResponse)
        break;
        case 'error':
        displayClosedAccount(twitchResponse)
        break;
        default:
        displayAllStreams(twitchResponse)
      }
  }

//build strings and display html on page
  function displayAllStreams(twitchResponse) {
    //clear displaArea
    displaArea.children.innerHTML = '';
    // console.log(twitchResponse.stream['game']);
    var streamerLogo   = '<img src="' + twitchResponse.stream.channel.logo + '" alt="streamer logo">';
    var streamerName   = '<h5><a target="_blank" href="' + twitchResponse.stream.channel.url + '">' + twitchResponse.stream.channel.display_name + '</a>' + ' is playing ' + '<a target="_blank" href="https://www.twitch.tv/directory/game/StarCraft%20II">' + twitchResponse.stream['game'] + '</a>' + '</h5>';
    var gameDetails    = '<h4>' + twitchResponse.stream.channel.status + '</h4>';
    var streamerStatus = 'account closed'; //placeholder - use only when account closed
    logo.innerHTML = streamerLogo;
    details.innerHTML = gameDetails;
    streamer.innerHTML = streamerName;
    }

  function displayOnlineStreams(twitchResponse) {
    if (twitchResponse.stream == null) {
      console.log('stream is null');
    }
  }

  function displayOfflineStreams(twitchResponse) {
    console.log('offline-stream');
  }

  function displayClosedAccount(twitchResponse) {
    console.log('closed-stream');
  }
  // There was a connection error of some sort
  // xmlhttp.onerror = function(err) {
  //   alert(err);
  // }
}
