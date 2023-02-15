import React, { useState, useEffect } from 'react';
import './Item.css';
function Item({item, removeWork, updateItem}) {  
    const [mode, setMode] = useState(false);
    const [title, setTitle] = useState(item.title);
   
    return (
        <li>
            <p>
                <input
                    checked={item.done ? "checked" : ""}
                    type="checkbox"
                    onChange={(e) => {
                    item.done = e.target.checked;
                    updateItem(item);
                }}/>

                <input 
                    type="text" 
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}            
                    className = {item.done? 'deleteLine': ''}
                    value={title} disabled={mode ? "" : "disabled"} 
                />
                <button onClick={(e)=>{removeWork(item.no);}}>삭제</button>
                <button
                    onClick={(e) => {
                        setMode(!mode);
                        if (mode) {
                            item.title = title;
                            updateItem(item);
                        }
                    }}>
                    {mode ? "수정완료" : "수정"}
                </button>

               
            </p>
        </li>
    );
}
export default Item;