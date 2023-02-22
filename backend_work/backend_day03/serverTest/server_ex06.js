const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();

var cookieParser = require('cookie-parser');
app.use(cookieParser() );
// session 미들웨어 설정
app.use(expressSession({
  secret:'my key',
  resave:true,
  saveUninitialized:true
}));

// ejs 뷰엔진을 사용하기 위한 설정 - 뷰템플릿
app.set("views", __dirname + "/views"); // prefix - 폴더 지정
app.set("view engine", "ejs"); // suffix - 확장자
process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);
// cors 미들웨어 설정
app.use(cors());
// bodyParser 미들웨어 설정 부분.
app.use(express.json()); // application/json
// application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))
// static 미들웨어 설정 - express에 내장.
app.use(express.static(__dirname + "/public"));


/////// router
router.route("/home").get((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); 
});

router.route("/login").post((req, res) => {
    console.log("POST - /login");
    res.redirect("/");
});

router.route('/process/product').get((req, res) => {
  console.log("GET - /process/product");
  // 로그인이 안되어있으면 login 페이지로
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  if(request.session.user){
    // 세션에 유저 정보가 있다(로그인이 되어있음
  }
  else{
    // 로그아웃 상태 -> 로그인 페이지로 이동
   req.session.user={
    id:req.session.user,
    
   }
  }
  res.write("<h1>"+req.session.user+"님 로그인되었습니다 </h1>");
  res.write("<a href='/process/product'>페이지로 이동</a>");
  res.end();
});

router.route("/login/cookie").post((req, res) => {
  console.log("POST - /login");
  console.log(req.body);

  // 쿠키는 사용자쪽(Client)에 생성된다. res저장
  res.cookie('user',{
    id:req.body.id,
    password:req.body.password,
    name:"신유진",
    ahuthorized:true
  });

  res.redirect("/");
});


app.use("/", router);
//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
//모든 라우터 처리 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static : {
        '404':'./public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404) );
app.use(errorHandler );
// 서버 실행
const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});