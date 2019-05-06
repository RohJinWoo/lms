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

  var createNotice = function() {
    let title = u.qu('#title').value;
    let content = u.qu('#content').value;

    if(!(title === "") && !(content === "")){
      console.log("createNotice 실행");
      u.axios('/notice/create', { title : title, content : content, now : getTimeStamp() } );
    }else{
      alert("다 입력");
    }
  }
