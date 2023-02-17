// 웹 서버 만들기
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');

app.set("views",__dirname + '/views');
app.set('view engine', 'ejs');

process.env.PORT=3000;
app.set('port',process.env.PORT||3001);

// bodyParser 미들웨어 설정 - express의 설정으로 변경
// POST 요청 방식에서 body의 파라미터 사용 가능
app.use(express.json());    // application/json
app.use(express.urlencoded({extended:true})); // application/x-www-form-urlencoded

const todoList = [
    { idx: 1, title: "hello", done: false },
    { idx: 2, title: "world", done: false },
    { idx: 3, title: "node공부", done: false }
  ];
const carList = [
    {no:1, title:"SONATA", price:3000, company:"HYUNDAI", year:2022},
    {no:2, title:"GRANDEUR", price:4000, company:"HYUNDAI", year:2019},
    {no:3, title:"K9", price:7000, company:"KIA", year:2020}
];

app.get("/home", (req, res)=>{
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
    res.write("<h1>길동이의 홈페이지</h1>");
    res.end(); // end() 안하면 무한루프 발생.
});


// ejs 템플릿 뷰 엔진 사용
app.get("/car",(req,res)=>{
    // req.app.render(뷰파일, data, 콜백함수(err,data){});
    let userName = "홍길동";
    req.app.render("car",{userName, carList},(err,data)=>{
        if(err){console.log(err); return;}
        res.end(data);
    });

});

app.get("/todolist",(req,res)=>{
    // req.app.render(뷰파일, data, 콜백함수(err,data){});
  
    req.app.render("todoList",{todoList},(err,data)=>{
        if(err){console.log(err); return;}
        res.end(data);
    });

});

app.post("/todoList",(req,res)=>{
    console.log("POST - TODOLIST");

    //post 방식에서는 파라미터 밭기 - bodyparser 미들웨어 사용
    // express.json()
    var newItem = req.body.newItem;
    
    // 저장 후 목록 갱신
    res.redirect("/todoList");
});

// http와 express를 합쳐준다. - 같은 port 사용.
const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log("Node.js 서버 실행 중 ...");
})