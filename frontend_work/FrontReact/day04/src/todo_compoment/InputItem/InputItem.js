import React, { useState, useEffect } from 'react';
function InputItem({addWork}) {
    const [newWork, setNewWork] = useState("");
    return (
            <div>
                할 일 :  
                <input 
                    type="text"
                    value={newWork} 
                    onChange={(e)=>{
                        setNewWork(e.target.value);
                    }}
                />
                <button 
                onClick={(e)=>{
                    addWork(newWork);
                    setNewWork("");
                   }}
                >추가</button>
           </div>
    );
}
export default InputItem;