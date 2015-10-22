from collections import deque
import subprocess
from mplayer.async import AsyncPlayer
import asyncore

from ..lib.youtube.downloader import download
from ..lib.youtube.video import Video
from ..config import SAVE_LOCATION

class App:
  def __init__(self):
    self.playlist = deque()
    self._callbacks = []
    self._state = {
      'playing': False,
      'volume': 1.0,
      'playlist': deque(),
    }

  def add_callback(self, callback):
    self._callbacks.append(callback)

  async def add_video(self, code):
    await download(code)
    self._state['playlist'].append(Video(code))
    self._callbacks[0]()
    if not self._state['playing']:
      self._play(code)

  def set_volume(self, level):
    self._state['volume'] = level

  def get_state(self):
    playlist = [video.serialize() for video in self._state['playlist']]
    return {
      'playing': self._state['playing'],
      'volume': self._state['volume'],
      'playlist': playlist,
    }

  def _play(self, code):
    self._state['playing'] = True
    self._callbacks[0]()
    print('Playing...')
    location = '{}/{}.m4a'.format(SAVE_LOCATION, code)
    sp = subprocess.Popen(['ffplay', '-nodisp', '-autoexit', location])
    self._state['playing'] = False
    self._state['playlist'].popleft()
    self._callbacks[0]()
    print('Done.')
    if (len(self._state['playlist']) > 0):
      self._play(self._state['playlist'][0].code)
