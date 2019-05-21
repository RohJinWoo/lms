// var count = 0;
// var notice = setInterval(function(){
//     ++count;
//     // u.axios('/notice/create',{});
//     if(count === 10000){
//         clearInterval(notice);
//     }
// }, 1000);

function getTimeStamp() {
    var d = new Date();
    var s =
      leadingZeros(d.getFullYear(), 4) + '-' +
      leadingZeros(d.getMonth() + 1, 2) + '-' +
      leadingZeros(d.getDate(), 2) + ' ' +
  
      leadingZeros(d.getHours(), 2) + ':' +
      leadingZeros(d.getMinutes(), 2) + ':' +
      leadingZeros(d.getSeconds(), 2);
  
    return s;
  }
  
  function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
  
    if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }  

    let file = u.qu('#userfile');
  var createNotice = function(req) {
    let title = u.qu('#title').value;
    let content = u.qu('#content').value;

    if(!(title === "") && !(content === "")){
      console.log("createNotice 실행");
      if(req === "create"){
        u.form(u.qu('#form'), '/notice/create?now=' + getTimeStamp(), 'post');
        // u.axios('/notice/create', { title : title, content : content, file : file.value, now : getTimeStamp() }, "post" );
      }else if(req === "update"){
        if(file.disabled){
          console.log('/notice/update' + location.search + "&now=" + getTimeStamp());
          u.axios('/notice/update' + location.search + "&now=" + getTimeStamp(), { title : title, content : content, file : file.value}, "put" );
        }
          u.form(u.qu('#form'), '/notice/fileupdate'+ location.search + "&now=" + getTimeStamp(), 'post');
      }
    }else{
      alert("다 입력");
    }
  }

  var file_change = function(){
    file.disabled = !file.disabled;
    if(file.disabled){
      u.qu('#file_changebutton').innerText = "첨부 파일 변경";
    }else{
      u.qu('#file_changebutton').innerText = "첨부 파일 변경 취소";
    }
  }