const http = require('http');   // nodejs 내장 모듈
const express = require('express');
const app = express();
const cors = require('cors');
const formidable = require('formidable');
const fs = require('fs');   // nodejs 내장 모듈

// app.set("key", "value")  // setAttribute의 용도
// app.get("key");  // getAttribute의 용도
// app.get("path", 콜백함수)    // 서버의 doGet 역할
// app.post("path", 콜백함수)    // 서버의 doPost 역할

app.set("port", 3000);

app.set("view engine", "ejs");
app.set("views", __dirname + "/template");

app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.write("<h1>Hello world</h1>");
    res.end();
});

// app.post("/saram/input", (req, res) => {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         //  console.log(fields);    // fields - {name, email, phone}의 정보가 들어가있음
//         var oldpath = files.photo.filepath;  // 파일 경로
//         var newpath = './public/upload/' + files.photo.originalFilename;  // 새롭게 저장될 위치
//         fs.rename(oldpath, newpath, function (err) {    // oldpath에 있는 것을 newpath로 옮기면서 새로운 이름으로 짓겠다
//             if (err) throw err;
//             res.write('File uploaded and moved!');
//             res.end();
//         });
//     });
app.post("/saram/input", (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
        res.write("<h2>upload ok!</h2>");
        res.end();
    });
    // 다중 파일 업로드
    form.on('end', function () {
        for (var i = 0; i < this.openedFiles.length; i++) {
            let file = this.openedFiles[i];
            var oldpath = file.filepath; 
            var newpath = './public/upload/' + file.originalFilename; 
            fs.rename(oldpath, newpath, function (err) {   
                if (err) throw err;
            });
        }
    });
});

app.get
// http와 express의 결합 - 같은 port 공유
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    console.log("서버가 실행되었습니다. - localhost:" + app.get("port"));
});
