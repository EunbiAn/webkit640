import Item from "../Item/Item";
import './TodoList.css';
function TodoList({works, removeWork,  updateItem}) {
    return (
        <div>
            <ul>
                {works.map((item, idx)=>{
                    return <Item removeWork={removeWork} item={item} key={item.no} updateItem={updateItem}/>;
                    
                })}
            </ul>
        </div>
    );
}
export default TodoList;