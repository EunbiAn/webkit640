const express = require('express');
const app = express();

// public을 외부에서 접속 할 수 있도록 static 설정 하기.
app.use(express.static('public'));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    
})