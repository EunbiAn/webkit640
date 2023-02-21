const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();

app.set("views", __dirname + "/views"); 
app.set("view engine", "ejs");
process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use("/uploads",express.static(__dirname + "/uploads"));

// 소켓io
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

/////// router -------
// http로 접속하면 실행 된다.
router.route("/home").get((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); 
});


// // 클라이언트가 socket으로 접속하면 실행
// io.sockets.on("connection", (socket)=>{
//   console.log("소켓으로 접속 됨.");
//   socket.emit('news',"hello world");
//   socket.on('hi', (data)=>{
//     console.log("data => " + data);
//   });

//   // 접속된 모든 소켓에 메세지 전달
//   io.sockets.emit("this",{will : "be received by "});

//   // private messages -
//   socket.on("private message",(from, msg )=>{
//     console.log('from => '+from + " msg => " + msg);
//   });

//   // 접속이 끊어졌을 때 실행
//   socket.on("disconnect", function(){
//     console.log("접속이 끊어짐");
//   });
// });

// 클라이언트가 socket으로 접속하면 실행
io.of("/chat").on("connection", (socket)=>{
    console.log("/chat 소켓으로 접속 됨.");
    socket.emit("chat message", {hello:"chat!"});
  
    socket.on("disconnect", function() {
      console.log("/chat 클라이언트 접속이 해제 됨.");
    });
  });
  
  io.of("/news").on("connection", (socket)=>{
    console.log("/news 소켓으로 접속 됨.");
    socket.emit("chat message", {hello:"news!"});
  
    socket.on("disconnect", function() {
      console.log("/chat 클라이언트 접속이 해제 됨.");
    });
  });
  
  

app.use("/", router);
/////// error handler -----
var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static : {
        '404':'./public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404) );
app.use(errorHandler );

server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});