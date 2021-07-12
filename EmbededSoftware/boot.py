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
client.disconnect()

print(accessPoint.ifconfig())
