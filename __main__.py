#!/usr/bin/env python3.5

import os, subprocess, traceback

import tornado.web, tornado.httpserver, tornado.ioloop, tornado.autoreload

from mi9_dj.handlers import MainHandler, WebSocketHandler, StaticFileHandler

class AutoReload(Exception):
  pass

def application():
  return tornado.web.Application(
    [
      (r'/', MainHandler),
      (r'/ws', WebSocketHandler),
      (r'/styles/(.*)', StaticFileHandler, {'path': './mi9_dj/static/styles/'}),
      (r'/images/(.*)', StaticFileHandler, {'path': './mi9_dj/static/images/'}),
      (r'/fonts/(.*)', StaticFileHandler, {'path': './mi9_dj/static/fonts/'}),
      (r'/js/(.*)', StaticFileHandler, {'path': './mi9_dj/static/js/'}),
      (r'/(favicon\.ico)', StaticFileHandler, {'path': './mi9_dj/static/'}),
    ],
    template_path='./mi9_dj/templates/',
    debug=True,
  )

def preprocessing():
  print('Bundling javascript...')
  subprocess.call(['./node_modules/browserify/bin/cmd.js', 'mi9_dj/client/main.js', '-t', 'babelify', '--outfile', 'mi9_dj/static/js/bundle.js'])
  print('Bundling styles...')
  subprocess.call(['./node_modules/stylus/bin/stylus', 'mi9_dj/client/main.styl', '-o', 'mi9_dj/static/styles/main.css'])

def autoreload_hook():
  print('Restarting due to file changes...')

def main():
  preprocessing()

  http_server = tornado.httpserver.HTTPServer(application())
  http_server.listen(8080)

  ## Add files to watch list for autoreload
  for (dir_path, _, files) in os.walk('./mi9_dj/'):
    for f in files:
      if f in ['bundle.js', 'main.css']:
        continue
      tornado.autoreload.watch(os.path.join(dir_path, f))
  tornado.autoreload.add_reload_hook(autoreload_hook)

  print('Starting server...')
  tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
  print('Starting...')
  restarts = 0
  while restarts < 5:
    try:
      main()
    except Exception:
      print('Server crashed. See Exception:')
      traceback.print_exc()
      print('Server is restarting...')
      restarts += 1
