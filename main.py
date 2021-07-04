# import socket
# addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]


# def getFile(fileName):
#     try:
#         f = open("data/" + fileName, "r")
#         data = f.read()
#         f.close()
#         return data
#     except:
#         return "Not found"


# s = socket.socket()
# s.bind(addr)
# s.listen(1)

# print('listening on', addr)

# while True:
#     cl, addr = s.accept()
#     print('client connected from', addr)

#     request = cl.recv(1024)
#     request = str(request).split(" ")[1]

#     if "?" in request:
#         request = request.split("?")[0]

#     if request == "/":
#         request = "index.html"

#     cl.send('HTTP/1.1 200 OK\n')
#     cl.send('Content-Type: text/html\n')
#     cl.send('Connection: close\n\n')
#     cl.sendall(getFile(request))
#     cl.close()
