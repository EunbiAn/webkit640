const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const router = express.Router();
const { MongoClient } = require('mongodb');
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(session({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri, { useUnifiedTopology: true });
let localDB = null;
async function connectDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    localDB = client.db("local");
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

////////////////////////////////////////////////////////////////

// 로그인 처리
router.route('/login').post((req, res) => {
    console.log("POST - /login");
    const userId = req.body.id;
    const userPw = req.body.passwd;
    if(localDB){
        let user = localDB.collection("users").findOne({id: userId, passwd: userPw}, function(err, user){
            if(err) throw err;
            if(user){
                // 세션에 정보를 저장하고 리다이렉트하기
                req.session.user = {
                    id: userId,
                    name: user.name
                }
                res.redirect("/product");
            } else{
                res.redirect("/longin.html");
            }
        });
    } 
});


// 회원가입
router.route('/join').post((req, res) => {
    console.log("POST - /join");
    const userName = req.body.name;
    const userId = req.body.id;
    const userPw = req.body.passwd;
    
    if(localDB){
        let user = localDB.collection("users").findOne({id: userId}, function(err, user){
            if(err) throw err;
            if(user){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
                res.write("이미 사용 중인 아이디입니다 :( ");
                res.write('</br> <a href="/login.html">로그인</a>');
                res.write(' <a href="/join_form.html">회원가입</a>');
                res.end();
            } else{
                let userData = { id: userId, passwd: userPw, name: userName, role:'user' };
                localDB.collection("users").insertOne(userData, function(err, result){
                    if(err) throw err;
                    console.log("회원가입 성공 :D");
                    res.redirect("/login.html");
                });
            }
        });
    } 
});

router.route("/logout").get( async (req, res)=>{
    req.session.user = null;
    res.redirect('/login.html');
});

router.route("/product").get( async (req, res)=>{
    res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
    res.write("<h1>상품페이지입니다</h1>");
    if(req.session.user){
        res.write("안녕하세요, "+ req.session.user.name + " 님");
        res.write('<a href="/users/user_detail">My Page</a>');
        res.write("<hr/> <a href='/logout'>Logout</a>");

        res.end();
    } else{
        res.redirect('/login.html');
    }
});

router.route("/users/user_detail").get( (req, res)=>{
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
    if(localDB ){
        localDB.collection("users").findOne({id: req.session.user.id}, function(err, user) {
            if(err) throw err;
            if(user){
                req.app.render("users/user_detail", { user}, function(err, html) {
                if(err) throw err;
                res.end(html);
            });
            }
        });
    }
});

router.route('/users/update/passwd').post((req, res) =>{
    let oldPasswd = req.body.oldPasswd;
    let newPasswd = req.body.newPasswd;
    console.log(req.session.user.id , oldPasswd);
    if(localDB ){
        localDB.collection("users").findOne({id: req.session.user.id, passwd: oldPasswd}, function(err, user) {
            if(err) throw err;
            if(user){
                //localDB.collection("users").updateOne( {id: req.session.user.id, passwd: oldPasswd},{$set:{passwd : newPasswd}} 으로
                // 한 번에 처리하고 싶었는데 변경이 정상적으로 완료되었을 때와 아닐때의 조건을 아직 알지못했다.. modifiedCount와  matchedCount 접근방법을 달리하면 될 듯,,
                localDB.collection("users").updateOne( {id: req.session.user.id},{$set:{passwd : newPasswd}}, function(err, result) {
                    if(err) throw err;
                    res.redirect('/users/user_detail');
                }); 
            } else{
                res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
                res.write("비밀번호 변경에 실패하였습니다 :( ");
                res.write('<a href="/users/user_detail"> My Page </a>');
                res.write('<a href="/product"> 상품페이지 </a>');
                res.end();
            }
        });
    }
 });


app.use("/", router);
server.listen(app.get("port"), ()=>{
    console.log("http://localhost:"+ app.get("port"));
    console.log("Node.js 서버 실행 중 ...");
    connectDB().catch(console.dir);
});