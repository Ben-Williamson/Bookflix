
import urequests
import ntptime
import json
import time

class TickManager:
    def __init__(self):
        self.ticks = []
        self.id = "0000001"
        self.lastTrigger = time.time_ns()
        self.bufferLength = 50
        ntptime.settime()

    def addToQueue(self, data):
        if len(self.ticks) < self.bufferLength:
            self.ticks.append(data)
        else:
            self.ticks.append(data)
            self.ticks = self.ticks[-self.bufferLength:]

    def postData(self):
        print("posting")
        d = {"hardwareID": self.id, "ticks": self.ticks}
        headers = {"Accept": "application/json, text/plain, */*", 'Content-type': 'application/json'}
        try:
            urequests.post("http://data.benwilliamson.org", headers=headers, data=json.dumps(d))
            self.ticks = []
            print("done")
        except:
            print("failed")

    def tick(self, pin):
        if time.time_ns() - self.lastTrigger > 200000000:
            self.addToQueue(ntptime.time())
            print(self.ticks)
            self.lastTrigger = time.time_ns()

    def syncTicks(self):
        if time.time() % 10 == 0 and len(self.ticks) > 0:
            print(time.time(), "post now")
            self.postData()
            time.sleep(1)
