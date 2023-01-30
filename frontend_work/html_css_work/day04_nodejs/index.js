const express = require('express');
const app = express();
const path = require('path');

// app.get(path, callback)
app.get('/', (req,res)=>{
    res.end('<h1>Homepage!</h1>');
});
app.get('/write', (req,res)=>{
    //쿼리스트링으로 전달된 파라미터 받아오기
    let subject = req.query.subject;
    let writer = req.query.writer;
    let content = req.query.content;

    console.log(subject, writer, content);
    res.sendFile(path.join(__dirname, '..', 'day04', 'day04ex03_2.html'));
});
app.listen(3000, ()=>{
    console.log('서버 실행 중');
});
