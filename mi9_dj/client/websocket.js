import appState from './state';

let ws;
let connected = false;
let connecting = false;

function init(callback) {
  connecting = true;
  ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port + '/ws');

  ws.onopen = function() {
    connected = true;
    connecting = false;
    if (typeof callback === 'function'){
      callback();
    }
  }

  ws.onmessage = function(e) {
    var content = JSON.parse(e.data);
    var cmd = content.cmd;

    switch(cmd) {
      case 'state':
        let newState = content;
        delete newState.cmd;
        appState.setState(newState);
        break;
    }
  }
}

function sendMessage(message) {
  var _sendMessage = function() {
    console.log('sending...');
    ws.send(message);
  }

  if (!ws || ws.readyState === 2 || ws.readyState == 3){
    init(_sendMessage);
  } else {
    if (connecting){
      setTimeout(function() {
        sendMessage(message);
      }, 15);
    } else {
      _sendMessage();
    }
  }
}

window.onload = function() {
  init();
}

window.onbeforeunload = function() {
  ws.onclose = function() {};
  ws.close();
}

export function addVideo(code) {
  var message = {
    cmd: 'add_video',
    value: code,
  };
  sendMessage(JSON.stringify(message));
}

export function togglePlayback() {
  var message = {
    cmd: 'toggle_playback',
  };
  sendMessage(JSON.stringify(message));
}

export var state;
