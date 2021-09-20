from machine import Pin
from webServer import WebServer
from tickManager import TickManager
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
    print(client.isconnected())
    return json.dumps({"connected": client.isconnected()})


def saveCreds(args):
    with open("storedCreds.json", "w") as f:
        f.write(json.dumps(args))
        f.close()

def hardwareID(args):
    return "100101"

def closeServer(args={}):
    global runServer
    runServer = False
    return "done"


server.addCustomEndpoint("/scan", scan)
server.addCustomEndpoint("/connect", connect)
server.addCustomEndpoint("/connectionStatus", status)
server.addCustomEndpoint("/saveCreds", saveCreds)
server.addCustomEndpoint("/hardwareID", hardwareID)
server.addCustomEndpoint("/closeServer", closeServer)

print(status())

runServer = not client.isconnected()
startTime = 0

print("starting server")
while runServer:
    server.serve()
    print("server running")
print("Closed server")

accessPoint.active(False)

tm = TickManager()

p = Pin(2, Pin.IN, Pin.PULL_UP)
p.irq(tm.rotate, trigger=Pin.IRQ_RISING)

while True:
    tm.syncTicks()
