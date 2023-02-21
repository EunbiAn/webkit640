// express 기본 모듈
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
//파일 업로드용 미들웨어 불러오기
var multer = require('multer');
var fs = require('fs');

app.set("views", __dirname + "/views"); 
app.set("view engine", "ejs");

// 포트 설정
process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);

// 다중 서버 접속(CORD) 지원
app.use(cors());


//multer 미들웨어 사용 : 미들웨어 사용 순서 중요 body-parser -> multer -> router
//파일 제한 : 10개, 1G
var storage = multer.diskStorage({
  destination: function(req, file, callback){
      callback(null,'uploads');
  },
  filename: function(req, file, callback){
      callback(null, file.originalname + Date.now())
  }
});

var upload = multer({
  storage: storage,
  limits: {
      files: 10,
      fileSize: 1024 * 1024 * 1024
  }
});

// 라우터 함수 등록
const router = express.Router();
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname + "/public"));
// app.use('/uploads', express.static((__dirname, '/uploads')));



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


// router.route("/saramlist").post((req, res)=>{
//     let newList = [];
//     newList.push(...saramInfo,{
//       no: saramNo++,
//       id: req.body.id, 
//       name: req.body.name, 
//       email:  req.body.emaill,
//     });
//     saramInfo = newList;
//     res.redirect("/");
// });
// 업로드 라우팅 함수
// server.js
router.route("/saram/input").post( (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      var oldpath = files.photo.filepath;
      var newpath = './public/upload/' + files.photo.originalFilename; 
      fs.rename(oldpath, newpath, function (err) { 
          if (err) throw err;
          res.write('File uploaded and moved!');
          res.end();
      });
  });
});
// router.route('/saramlist').post(upload.array('photo', 1), function(req, res) {
//   res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
// 	console.log('POST - /saramlist 호출됨.');
//   console.log(req.body);
//   console.log(req.files);
// 	try{
        
//         var files = req.files;
        
//         console.dir('#===== 업로드된 첫번째 파일 정보 =====#');
//         console.dir(req.files[0]);
//         console.dir('#=========#');
    
//         // 현재의 파일 정보를 저장할 변수 선언
//         var originalname = '',
//             filename = '',
//             mimetype = '',
//             size = 0;
        
//         if(Array.isArray(files)){
//             console.log('배열에 들어있는 파일 갯수 : %d', files.length);
            
//             for(var index = 0; index < files.length; index++){
//                 originalname = files[index].originalname;
//                 filename = files[index].filename;
//                 mimetype = files[index].mimetype;
//                 size = files[index].size;
//             }
//         }else{
//             console.log('파일 갯수 : 1');
//             originalname = files[index].originalname;
//             filename = files[index].filename;
//             mimetype = files[index].mimetype;
//             size = files[index].size;
//         }
        
//         console.log('현재 파일 정보 : ' + originalname +',  ' + filename + ',  ' + mimetype + ',  ' + size);
        
//         res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//         res.write('<h1>파일 업로드 성공</h1>');
//         res.write('<img src="/uploads/'+ filename + '" width="200px">');
//         res.write('<hr/>');
       
//         res.write('<div><p>원본 파일 이름 : ' + originalname + '</p></div>');
//         res.write('<div><p>저장된 파일 이름 : ' + filename + '</p></div>');
//         res.write('<div><p>MiME TYPE : ' + mimetype + '</p></div>');
//         res.write('<div><p>파일 크기 : ' + size + '</p></div>');
        
//         res.write('<div><input type="button" value="다시 작성" onclick="javascript:history.back()"></div>');
//         res.end();
        
//     }catch(err){
//         console.dir(err.stack);
        
//         res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//         res.write('<div><p>메모 저장 시 에러 발생</p></div>');
//         res.end();
//     }
  
// });
app.use("/", router);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});