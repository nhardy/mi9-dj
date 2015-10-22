#!/usr/bin/env python3.5

import os, subprocess, traceback

import tornado.web, tornado.httpserver, tornado.ioloop, tornado.autoreload

from mi9_dj.handlers import MainHandler, WebSocketHandler, StaticFileHandler

def application():
  return tornado.web.Application(
    [
      (r'/', MainHandler),
      (r'/ws', WebSocketHandler),
      (r'/styles/(.*)', StaticFileHandler, {'path': './mi9_dj/static/styles/'}),
      (r'/images/(.*)', StaticFileHandler, {'path': './mi9_dj/static/images/'}),
      (r'/fonts/(.*)', StaticFileHandler, {'path': './mi9_dj/static/fonts/'}),
      (r'/js/(.*)', StaticFileHandler, {'path': './mi9_dj/static/js/'}),
    ],
    template_path='./mi9_dj/templates/',
    debug=True,
  )

def main():
  subprocess.call(['browserify', 'mi9_dj/client/main.js', '-t', 'babelify', '--outfile', 'mi9_dj/static/js/bundle.js'])

  http_server = tornado.httpserver.HTTPServer(application())
  http_server.listen(8080)

  ## Add files to watch list for autoreload
  for (dir_path, _, files) in os.walk('./mi9_dj/'):
    for f in files:
      tornado.autoreload.watch(os.path.join(dir_path, f))
    break

  tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
  print('Starting server...')
  restarts = 0
  while restarts < 5:
    try:
      main()
    except Exception as error:
      print('Server crashed. See Exception:')
      traceback.print_exc()
      print('Server is restarting...')
      restarts += 1
