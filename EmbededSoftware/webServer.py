import socket


class WebServer:
    def __init__(self, port):
        self.port = port
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

    def serve(self):
        cl, addr = self.s.accept()
        print('client connected from', addr)

        request = cl.recv(1024)
        request = str(request).split(" ")[1]

        if "?" in request:
            request = request.split("?")[0]

        if request == "/":
            request = "index.html"

        cl.send('HTTP/1.1 200 OK\n')
        cl.send('Content-Type: text/html\n')
        cl.send('Connection: close\n\n')

        response = self.getFile(request)

        cl.sendall(response)
        cl.close()
