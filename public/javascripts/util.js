const u = {
  form: function(form, path, method) {
    form.action = path;
    form.method = method;
    form.submit();
  },
  /*  
  위는 일반적 함수를 쓴거. 아래부터는 ES6의 arrow를 사용한 방법.
  이러한 코딩을 읽으려면 옛 브라우저에서는 불가능 한데, babel이라는 것을 통해
  코드를 변경해주므로 ES6의 기법을 사용할 수 있다. 
  그러나 arrow를 사용할 경우 this의 스코프가 바뀌므로 같은 객체간의 함수를 사용할 경우 
  function을 사용해야한다.
  */
  qu: (str) => {  //노드 선택
    return document.querySelector(str);
  },
  link: (str) => {  //link 이동
    location.href = str;
  },
  node: (str) => {  //string -> 노드 생성
    return document.createRange().createContextualFragment(str).firstChild;
  },
  childAllRemove: function(str) { //해당 노드의 자식 노드들 전부 삭제
    var child = this.qu(str); 
    // 이와 같은 경우 처럼 같은 객체 안의 함수를 이용할 때 arrow를 사용하면 안된다.
    while (child.hasChildNodes()) {
      child.removeChild(child.firstChild);
    }
  },
  validation: (str, type) => {
    let regexp;
    switch (type) {
      case 'id':
        regexp = /^[a-zA-Z0-9].{8,12}$/;
        //하나이상의 대소문자 영어, 하나 이상의 숫자, 최소 8자 최대 12자
        return regexp.test(str);
      case 'engkor':
        regexp = /^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        return regexp.test(str);
      case 'password':
        regexp = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
        //하나이상의 대소문자 영어, 하나 이상의 숫자, 하나 이상의 특수문자, 최소 8자 최대 16자
        return regexp.test(str);
      case 'email':
        regexp = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return regexp.test(str);
      default:
        break;
    }
  },

  axios: function(req_path, form, method){
    let a;
    
    switch(method){
      case 'post' :
        a = axios.post(req_path, form);
        break;
      case 'put' :
        a = axios.put(req_path, form);
        break;
      case 'delete' :
        a = axios.delete(req_path, form);
        break;
      default :
        break;
    }
      a
      .then((response) => {
        if(response.data.content){
          alert(response.data.content);
        }
        if(response.data.errMessage){
          alert(response.data.errMessage);
        }
        if(response.data.link){
          location.href = response.data.link;
        }
        if(response.data.console){
          console.log(response.data.console);
        }
      })
      .catch((err) => {
        console.log('에러가 발생하였습니다.');
        console.log('에러 내용 : ', err);
      });
  },
}

function subclose(){
  return false;
}