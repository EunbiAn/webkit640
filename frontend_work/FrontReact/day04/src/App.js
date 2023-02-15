import React, { useState, useEffect } from 'react';
import "./App.css";
import InputItem from './todo_compoment/InputItem/InputItem';
import TodoList from './todo_compoment/TodoList/TodoList';

function App(props) {
    const [works, setWorks] = useState([]);
    const [count, setCount] = useState(1);  // 새로운 work 추가할 때의 no의 값

    useEffect(()=>{
        // loaclstorage에 데이터가 있으면 로드한다.
        // 문자열로 저장
        const localStorageData = localStorage.getItem("todoListData")

        if(localStorageData) {
            let objData = JSON.parse(localStorageData);
            setWorks(objData.todoList);
            setCount(objData.count);
        }
    },[]);

    function saveLocalStorage(newList, newCount){
        localStorage.setItem("todoListData", JSON.stringify({todoList: newList, newCount: newCount}));
    }
    // 할 일 추가 기능
    function addWork(newWork){
        let newList = [...works, {no:count, title: newWork, done: false}];
        let newCount = count+1;
        setWorks(newList);
        setCount(newCount);
        saveLocalStorage(newList, newCount);
    }

    // 할 일 삭제 기능
    function removeWork(no){
        var newList = works.filter((item, idx)=>{
            return item.no != no;   // 삭제할 no와 같지 않은 객체만 return하여 새로운 newList로 선언
        });
        setWorks(newList);
        saveLocalStorage(newList, count);
    }

    // 할 일 수정 기능
    function updateItem(item) {
        const idx = works.findIndex((todo, idx) => {
          return todo.no === item.no;
        });
        works[idx] = item;
        let newList = [...works];
        setWorks(newList );
        saveLocalStorage(newList, count);
      }


    return (
        <>
           <h1>Todo List</h1>
           <InputItem addWork={addWork}/>
           
           <hr/>
           <TodoList works={works} removeWork={removeWork} updateItem={updateItem}/>
    
        </>
    )
}

export default App;