import React, { useState, useEffect } from 'react';

function menu(props) {
    const [menuItems, setMenuItems] = useState(['HOME', 'PROFILE', 'GALLERY', 'LECTURE', 'GUEST']);

    return (
        <>
            <ul>
                {menuItems.map((item, i) => {
                    return <li key="i">item</li>;
                })}
            </ul>
        </>
    );
}


function  App(props) {
    return (
    <>
        <menu></menu>
    </>);
}
export default App;
