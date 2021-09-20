
import urequests
import ntptime
import json
import time

class TickManager:
    def __init__(self):
        self.id = "0000001"
        self.rotations = 0
        self.lastTrigger = time.time()
        ntptime.settime()

    def postData(self):
        print("posting")
        d = {"hardwareID": self.id, "rotations": self.rotations, "time": time.time()}
        headers = {"Accept": "application/json, text/plain, */*", 'Content-type': 'application/json'}
        try:
            urequests.post("http://data.benwilliamson.org", headers=headers, data=json.dumps(d))
            self.rotations = 0
        except:
            print("failed")

    def rotate(self, pin):
        if time.time() != self.lastTrigger:
            self.rotations += 1
            self.lastTrigger = time.time()

    def syncTicks(self):
        if time.time() % 60 == 0 and self.rotations != 0:
            self.postData()
            time.sleep(1)
