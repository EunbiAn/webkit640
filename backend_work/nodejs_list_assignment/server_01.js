// express 기본 모듈
const http = require("http");
const express = require("express");
const app = express();

const cors = require("cors");
// 라우터 함수 등록
const router = express.Router();
app.set("views", __dirname + "/views"); 
app.set("view engine", "ejs");

// 포트 설정
process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);

// 다중 서버 접속(CORD) 지원
app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname + "/public"));




const saramInfo = [{
  no: 1,
  name: 'anisbee',
  id:'isbee' ,
  email:'bee@gmail.com',
}];
const saramNo =2;

/////// router -------
router.route("/home").get((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); 
});

router.route("/saramlist").get((req, res)=>{
  req.app.render("saramlist", { saramInfo: saramInfo }, (err, data) => {
    if(err) throw err;
    res.end(data);
  });
});


router.route("/saramlist").post((req, res)=>{
    let newList = [];
    newList.push(...saramInfo,{
      no: saramNo++,
      id: req.body.id, 
      name: req.body.name, 
      email:  req.body.emaill,
    });
    saramInfo = newList;
    res.redirect("/");
});

app.use("/", router);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});