from wifi import connectToNetwork
from time import sleep
import network


def clear():
    print("\x1B\x5B2J", end="")
    print("\x1B\x5BH", end="")


clear()


accessPoint = network.WLAN(network.AP_IF)
accessPoint.active(True)
accessPoint.config(essid="Hamster Tracker", password="Gjba1976")

client = network.WLAN(network.STA_IF)
client.active(True)
client.config(dhcp_hostname="Hamster Tracker")
client.connect("Williamson WiFi", "Gjba1976")


print("Connecting", end="")
while not client.isconnected():
    print(".", end="")
    sleep(0.25)
print("")
print(client.ifconfig())
