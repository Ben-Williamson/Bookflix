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
        self.MIMETypes = {"html": "text/html", "css": "text/css"}

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
                value = value.replace("%20", " ")
                value = value.replace("+", " ")
                args[var] = value

        return args

    def fileToMIME(self, filename):
        extension = filename.split(".")[-1]

        for t in self.MIMETypes:
            if t == extension:
                return self.MIMETypes[t]
        return "text/plain"

    def serve(self):
        cl, addr = self.s.accept()
        print('client connected from', addr)

        request = cl.recv(1024)
        request = str(request).split(" ")[1]

        arguments = ""
        connectionType = "text/plain"

        if "?" in request:
            print(request.split("?"))
            request, arguments = request.split("?")

        if request == "/":
            request = "index.html"

        if request in self.endpoints:
            response = self.endpoints[request](self.splitToArgs(arguments))
        else:
            response = self.getFile(request)

        connectionType = self.fileToMIME(request)

        cl.send('HTTP/1.1 200 OK\n')
        cl.send('Content-Type: ' + connectionType + '\n')
        cl.send('Connection: close\n\n')

        cl.sendall(response)
        cl.close()

    def addCustomEndpoint(self, endpoint, callback):
        self.endpoints[endpoint] = callback
