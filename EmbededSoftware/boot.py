import network
import time
import json


def clear():
    print("\x1B\x5B2J", end="")
    print("\x1B\x5BH", end="")


clear()


accessPoint = network.WLAN(network.AP_IF)
accessPoint.active(True)
accessPoint.config(essid="Hamster Tracker")

client = network.WLAN(network.STA_IF)
client.active(True)
client.config(dhcp_hostname="Hamster Tracker")
client.disconnect()

with open("storedCreds.json", "r") as f:
    data = json.loads(f.read())
    f.close()

client.connect(data["ssid"], data["password"])

startTime = time.time()
while not client.isconnected() and time.time() - startTime < 10:
    print(".", end="")
    time.sleep(1)
