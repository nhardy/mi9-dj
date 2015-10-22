#!/usr/bin/env python3.5

import asyncio
from mi9_dj.app import App

async def run():
  app = App()
  await app.add_video('dQw4w9WgXcQ')

loop = asyncio.get_event_loop()
print('Starting')
loop.run_until_complete(run())
loop.close()
print('Done')
