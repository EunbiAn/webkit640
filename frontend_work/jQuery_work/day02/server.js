const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
// npm i -S formidable
const formidable = require('formidable');
const fs = require("fs");

app.set("port", 3000);

app.set("view engine", "ejs");
app.set("views", __dirname + "/template");

app.use(cors());
app.use(express.static(__dirname + "/public"));
// express의 bodyParser 미들웨어 설정 - POST요청 방식에서 파라미터를 받기 위해.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res)=>{
    res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    res.write("<h1>Hello world</h1>");
    res.end();
});

// 목록
var carList = [];
for(var i=0; i<10; i++) {
    carList.push({no:i, name:"car name "+i, price: (1+i)*1000, year:2008+i, company:"company"+i});
}
let no = 10;
// GET 요청 처리 - SELECT 기능
app.get("/car", (req, res)=>{
    console.log("GET - /car");
    res.send(carList);
});

// POST 요청 처리 - INSERT 기능
// post요청에서 파라미터를 받기위해서는 body-parser 미들웨어 필요.
// 테스트는 Post Man으로 하면 된다.
app.post("/car", (req, res)=>{
    console.log("POST - /car");
    let carObj = req.body;
    carObj.no = no++;
    carList.push(carObj);
    res.send(carList);
});

// 수정기능
app.post("/car/modify", (req, res)=>{
    console.log("POST - /car/modify");
    let carObj = req.body;
    for(var i=0; i<carList.length; i++){
        if(carList[i].no == carObj.no){
            carList[i] = carObj;
            break;
        }
    }
    res.send(carList);
});

// 삭제기능
app.post("/car/delete", (req, res)=>{
    console.log("POST - /car/delete");
    for(var i=0; i<carList.length; i++){
        if(carList[i].no == req.body.no){
            carList.splice(i, 1);
            break;
        }
    }
    res.send(carList);
});


// http와 express의 결합 - 같은 port를 공유한다.
const server = http.createServer(app);
server.listen(app.get("port"), ()=>{
    console.log("서버 실행 중 - http://localhost:"+ app.get("port") );
});