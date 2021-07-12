from webServer import WebServer
import json

server = WebServer(80)


def scan(args):
    networks = client.scan()

    ssids = set()  # this is a set to prevent mesh networks appearing twice

    for network in networks:
        ssids.add(network[0].decode())

    return json.dumps({"ssids": list(ssids)})


def connect(args):
    print(args)
    client.connect(args["ssid"], args["password"])
    return "Connecting"


def status(args={}):
    return json.dumps({"connected": client.isconnected()})


server.addCustomEndpoint("/scan", scan)
server.addCustomEndpoint("/connect", connect)
server.addCustomEndpoint("/connectionStatus", status)

print(status())

while True:
    server.serve()
