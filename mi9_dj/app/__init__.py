from collections import deque

from ..lib.youtube.downloader import download
from ..lib.youtube.video import Video

class App:
  def __init__(self):
    self.playlist = deque()
    self._state = {
      'playing': True,
      'volume': 1.0,
      'playlist': deque(),
    }

  async def add_video(self, code):
    await download(code)
    self._state['playlist'].append(Video(code))

  def set_volume(self, level):
    self._state['volume'] = level

  def get_state(self):
    playlist = [video.serialize() for video in self._state['playlist']]
    return {
      'playing': self._state['playing'],
      'volume': self._state['volume'],
      'playlist': playlist,
    }
