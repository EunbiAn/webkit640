
// 구조분해 할당  - 객체나 리스트의 요소를 바로 사용 (props안의 name을 name으로 바로 사용!)
function Hello({name, address, onChangeName}) {
    return (
      <div>
        <h1>Hello {address}에 사는 {name}</h1>
        <button onClick= {function () {
          {onChangeName("은비")}
        }}>이름 바꾸기</button>
      </div>
    );
  }
  export default Hello;