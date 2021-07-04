from webServer import WebServer

server = WebServer(80)

while True:
    server.serve()
