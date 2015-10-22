'use strict';

var ws;
var connected = false;
var state;

function init(callback) {
  ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port + '/ws');

  ws.onopen = function() {
    connected = true;
    if (typeof callback === 'function'){
      callback();
    }
  }

  ws.onmessage = function(e) {
    var content = JSON.parse(e.data);
    var cmd = content.cmd;

    switch(cmd) {
      case 'state':
        state = content;
        delete state.cmd;
        console.log(state);
        break;
    }
  }
}

function sendMessage(message) {
  var _sendMessage = function() {
    console.log('sending...');
    ws.send(message);
  }

  if (!ws || ws.readyState !== 1){
    init(_sendMessage);
  } else {
    _sendMessage();
  }
}

window.onload = function() {
  init();
  // var message = {
  //   cmd: 'add_video',
  //   value: 'dQw4w9WgXcQ',
  // };
  // setTimeout(function() {sendMessage(JSON.stringify(message));}, 500);
  // setTimeout(function() {sendMessage(JSON.stringify(message));}, 1500);
  // setTimeout(function() {sendMessage(JSON.stringify(message));}, 2500);
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

export var state;
