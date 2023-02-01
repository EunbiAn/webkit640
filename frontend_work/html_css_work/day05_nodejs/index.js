const express = require('express');
const app = express();

// public을 외부에서 접속 할 수 있도록 static 설정 하기.
app.use(express.static('public'));

const carList = [];
app.get('/car/input', function (req, res) {
    // var name = req.query.name;
    // var price = req.query.price;
    // var company = req.query.company;
    // var year = req.query.year;
    // console.log(name, price, company, year);

//    var carData = 
    
    carList.push(req.query);
    
    res.send(carList);
    
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    
})