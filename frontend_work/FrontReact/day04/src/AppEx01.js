import './App.css';
import { useState } from 'react';
import Car from './app_ex01/Car';
import Hello from './app_ex01/Hello';

// 컴포넌트, props, 스프레드 연산자 실습
function AppEx01() {
  // state 선언
  const [brand, setBrand] = useState("KIA");
  const [carName, setCarName] = useState("K7");
  const [user, setUser] = useState("길동");
  
  function onChangeName(newName) {
    setUser(newName);
  }

  function assignTest(){
    console.log('assignTest()');
    const target = {a:1, b:2};
    const source = {b: 4, c:5};

    const returnedTarget = Object.assign(target, source);
    console.log(target);
    console.log(returnedTarget);
    console.log(target===returnedTarget);
  }

  function assignTest2(){
    console.log("assignTest2()");
    const target = {a:1,b:2};
    const source = [
      {b: 4, c:5},
      {b: 5, c: 7, d:8},
      {b:9, c:10, d:11},
      {b:12, c:13, d:14, e:15}
    ];

    Object.assign(target, ...source);
    console.log(target);
  }

  function testSpread(){
    console.log('testSpread()');
    const array = [{name:'kim'},{name:'lee'},{name:'park'}];
    const newArray =[...array, {name:'an'}];
    console.log(array);
    console.log(newArray);
  }

  return (
    <div>
        {/* 컴포넌트 생성 */}
        {/* <Car brand="HYUNDAI" name="SONATA"></Car> */}
        <Car brand={brand} name={carName}></Car>
        
        <hr/>
        {/* <Hello name="Gildong" address="DAEGU"></Hello> */}
        <Hello name={user} address="DAEGU" onChangeName={onChangeName} ></Hello>
  
        <hr/>
        <button 
          onClick={(event)=>{
            assignTest();
        }}>assign 테스트</button>

         <hr/>
        <button onClick={assignTest2}>assign 테스트 2</button>
        <button onClick={testSpread}>spread 테스트</button>
    </div>
  );
}

export default AppEx01;
