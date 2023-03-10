const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

app.set("views", __dirname + "/views"); // prefix
app.set("view engine", "ejs"); // suffix

process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);

app.use(express.json()); // application/json
app.use(express.urlencoded({extended:true})) // application/x-www-form-urlencoded

// static 미들웨어 설정 - express 사용
app.use(express.static(__dirname+"/public"));

const todoList = [
  { idx: 1, title: "hello", done: false },
  { idx: 2, title: "world", done: false },
  { idx: 3, title: "node공부", done: false }
];

let seqTodoList = 4;
app.get("/home", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); 
});

app.get("/todoList", (req, res) => {
  req.app.render("todoList", { todoList: todoList}, (err, data) => {

    res.end(data);
  });
});

app.post("/todoList", (req, res)=>{
  console.log("POST - /todoList");
  var newItem = req.body.newItem;  // bodyParser 설정.
  todoList.push({ idx: seqTodoList++, title: newItem, done: false })
  res.redirect("/todoList");
});

app.get("/json/todoList",(req,res)=>{
    // res.end() -  문자열 인자만 처리
    // res.send() - (수식 또는 객체)만 처리 => 결과는 JSON 문자열
    res.send({todoList: todoList});
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});