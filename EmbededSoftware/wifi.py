import network
import time

def connectToNetwork(creds, timeout=50):
    wifi = network.WLAN(network.STA_IF)

    if not wifi.isconnected():
        wifi.active(True)
        wifi.connect(creds["ssid"], creds["password"])

        startTime = time.time();
        while not wifi.isconnected() and (time.time() - startTime) < timeout:
            yield wifi.isconnected()
    
    yield "timeout"