from webServer import WebServer

server = WebServer(80)


def callback(test):
    print(test)

    return "Understood"


server.addCustomEndpoint("/test", callback)

while True:
    server.serve()
