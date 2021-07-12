from machine import Pin
from webServer import WebServer
import time
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


def closeServer(args={}):
    global runServer
    runServer = False
    return "done"


server.addCustomEndpoint("/scan", scan)
server.addCustomEndpoint("/connect", connect)
server.addCustomEndpoint("/connectionStatus", status)
server.addCustomEndpoint("/closeServer", closeServer)

print(status())

runServer = True
startTime = 0

while runServer:
    server.serve()

accessPoint.active(False)

p = Pin(2, Pin.IN, Pin.PULL_UP)

while True:
    print(p.value())
