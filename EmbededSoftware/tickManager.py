
import urequests
import ntptime
import json
import time

class TickManager:
    def __init__(self):
        self.ticks = []
        self.id = "this is a test"
        self.lastTrigger = time.time_ns()
        self.bufferLength = 5
        ntptime.settime()

    def addToQueue(self, data):
        if len(self.ticks) < self.bufferLength:
            self.ticks.append(data)
        else:
            self.ticks.append(data)
            self.ticks = self.ticks[-self.bufferLength:]

    def postData(self):
        print("posting")
        d = json.dumps(self.ticks)
        # try:
        urequests.post("https://api.benwilliamson.org/tick", headers={'content-type': 'application/json'}, data=d)
        print("done")
        # except:
        #     print("failed")

    def tick(self, pin):
        if time.time_ns() - self.lastTrigger > 200000000:   
            self.addToQueue({"tickID": hash(time.time_ns()), "trackerID": self.id, "time": time.time_ns()})
            print(self.ticks)
            self.lastTrigger = time.time_ns()

    def syncTicks(self):
        if time.time() % 10 == 0:
            print(time.time(), "post now")
            self.postData()
            time.sleep(1)