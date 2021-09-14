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
    return json.dumps({"connected": client.isconnected()})


def saveCreds(args):
    with open("storedCreds.json", "w") as f:
        f.write(json.dumps(args))
        f.close()


def closeServer(args={}):
    global runServer
    runServer = False
    return "done"


server.addCustomEndpoint("/scan", scan)
server.addCustomEndpoint("/connect", connect)
server.addCustomEndpoint("/connectionStatus", status)
server.addCustomEndpoint("/saveCreds", saveCreds)
server.addCustomEndpoint("/closeServer", closeServer)

print(status())

runServer = not client.isconnected()
startTime = 0

while runServer:
    server.serve()
    print("server running")


accessPoint.active(False)

# lastTrigger = time.time_ns()
#
#
# def sendTick(pin):
#     global lastTrigger
#
#     if time.time_ns() - lastTrigger > 200000000:
#
#         try:
#             print("sending requset")
#             d = json.dumps({"trackerID": "hi", "time": time.time()})
#
#             urequests.post("http://benwilliamson.org:3000/tick", headers={'content-type': 'application/json'},
#                            data=d)
#             print("tick recived")
#         except:
#             print("send failed")
#         lastTrigger = time.time_ns()

tm = TickManager()

p = Pin(2, Pin.IN, Pin.PULL_UP)
p.irq(tm.tick, trigger=Pin.IRQ_RISING)

while True:
    tm.syncTicks()
