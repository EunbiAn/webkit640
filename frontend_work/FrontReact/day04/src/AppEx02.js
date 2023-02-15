import React, { useState } from 'react';

// props, 스프레드 연산자 실습
function AppEx02(props) {
    const [fishArr, setFishArr] = useState(["고래","거북이","연어"]);
    const [newFish, setNewFish] = useState("상어");
    
    return (
        <>
        <p>
            <input 
                type="text"
                 value={newFish}
                  onChange={(e)=>{
                    setNewFish(e.target.value);
                }}
            />
                <button onClick={(e)=>{
                    setFishArr([...fishArr,newFish]);
                    // state가 변경되어 컴포넌트가 다시 랜더링된디
                    setNewFish("");
                }}
                >추가</button>
        </p>

        <ul>
            {fishArr.map((fish,idx)=>{
                return <li key={idx}>{fish}</li>
            })}
        </ul>
        </>
    )
}

export default AppEx02;