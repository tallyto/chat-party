var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {

  io.emit('entrou', {message: "entrou na sala"})
  
  socket.on("disconnect", () => {
    io.emit('disconnect', {message: "saiu da sala"})
  });
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
  console.log("listening on *:3000");
});
