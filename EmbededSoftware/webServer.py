import socket
from time import sleep


class WebServer:
    def __init__(self, port):
        self.port = port
        self.endpoints = {}
        self.s = socket.socket()
        self.addr = socket.getaddrinfo('0.0.0.0', port)[0][-1]
        self.s.bind(self.addr)
        self.s.listen(1)

    def getFile(self, fileName):
        try:
            f = open("data/" + fileName, "r")
            data = f.read()
            f.close()
            return data
        except:
            return "Not found"

    def splitToArgs(self, url):
        args = {}
        if url != "":
            url = url.split("&")
            for var in url:
                var, value = var.split("=")
                args[var] = value

        return args

    def serve(self):
        cl, addr = self.s.accept()
        print('client connected from', addr)

        request = cl.recv(1024)
        request = str(request).split(" ")[1]

        arguments = ""

        if "?" in request:
            print(request.split("?"))
            request, arguments = request.split("?")

        print(request, request in self.endpoints)

        if request == "/":
            request = "index.html"

        if request in self.endpoints:
            response = self.endpoints[request](self.splitToArgs(arguments))
        else:
            response = self.getFile(request)

        cl.send('HTTP/1.1 200 OK\n')
        cl.send('Content-Type: text/html\n')
        cl.send('Connection: close\n\n')

        while True:
            print("Looping")
            cl.sendall("Connected")
            sleep(1)
        cl.close()

    def addCustomEndpoint(self, endpoint, callback):
        self.endpoints[endpoint] = callback
