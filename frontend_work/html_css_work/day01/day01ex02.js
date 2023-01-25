       // id 속성이 clickBtn인 요소인 DOM 셀렉트
       var clickBtn = document.getElementById('clickBtn');
       // id 값이 같은 요소는 1개 뿐 
       // 그 외 같은 요소들 묶어서 사용하고 싶으면 id 아닌 class 로 
        var heading = document.getElementById("heading");


       console.log(clickBtn);
       console.dir(clickBtn);
       
       //선택된 DOM 요소에 이벤트 핸들러 걸기
       clickBtn.onclick = function(event) {
           // 클릭 이벤트가 발생하면 이벤트를 콘솔에 출력
           document.bgColor = "gray";
           document.title = "Hello";
           console.log(heading);
           heading.style.backgroundColor = 'yellow';
       
       }

        // 문서의 거의 모든 요소가 객체가 될수 있다.
        // 함수를 변수에 참조 시킨다.
        // 함수를 배열에도 담을 수 있다.
        // 함수를 다른 함수의 인자로 사용. (callback 함수)

        // 자바 스크립트 작성 방법 
        // 1) 내부 스크립트 <script> ~내부 코드 작성~ </script> 
        // 2) 외부 스크립트  외부 js 파일에 코드 작성 후 <script src='js 경로'> </script>
