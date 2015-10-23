import tornado.websocket, tornado.gen
import json
import asyncio

from ..app import App

class WebSocketHandler(tornado.websocket.WebSocketHandler):
  _APP = App()
  _sockets = set()

  def _write_all(self, message):
    for ws in self._sockets:
      ws.write_message(message)

  def _send_state(self):
    state = {'cmd': 'state'}
    state.update(self._APP.get_state())
    print('state:', state)
    self._write_all(json.dumps(state))

  def initialize(self):
    self._APP.add_callback(self._send_state)

  def open(self):
    self._sockets.add(self)
    self._send_state()

  @tornado.gen.coroutine
  def on_message(self, content):
    print(content)
    message = json.loads(content)
    cmd = message['cmd']

    if 'value' in message:
      value = message['value']

    if cmd == 'add_video':
      _ = yield self._APP.add_video(value)
      # TODO: Send message to sender that video was added successfully
      self._send_state()
      print(self._APP.get_state())

    elif cmd == 'toggle_playback':
      self._APP.toggle_playback()
    elif cmd == 'volume':
      pass

  def on_close(self):
    self._sockets.remove(self)
