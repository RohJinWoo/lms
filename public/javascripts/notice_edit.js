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
    }
  }else{
    alert("다 입력");
  }
}

let inputfile_cnt = 0;
let inputfile = [];
let div_inputfile = u.qu("#customfile")
var createInputFile = function(){
  if(inputfile_cnt < 5){
    // inputfile 태그 생성
    inputfile[inputfile_cnt] = { input : u.createTag('input', {
      attribute : ["type", "name", "id", "onchange"],
      value : ["file", "userfile", "userfile" + inputfile_cnt, "inputfile_change(" + inputfile_cnt + ")"] 
    }, null) };
    div_inputfile.appendChild(inputfile[inputfile_cnt].input);

    // inputfile의 내용을 가질 label 태그 생성
    inputfile[inputfile_cnt].label = u.createTag('label', {
      attribute : ["for"],
      value : ["userfile" + inputfile_cnt]
    }, modify_file[inputfile_cnt] !== undefined ? modify_file[inputfile_cnt].filepath : "선택된 파일 없음");
    div_inputfile.appendChild(inputfile[inputfile_cnt].label);

    inputfile_cnt++;
  }
}

change_files = [false, false, false, false, false];

var inputfile_change = function(inputfile_num){
  console.log(inputfile_num + "번 input file 태그 onchange 이벤트 리스너 동작");
  console.log(inputfile[inputfile_num].input.value);
  inputfile[inputfile_num].label.textContent = (inputfile[inputfile_num].input.files[0] !== undefined) ? inputfile[inputfile_num].input.files[0].name : "선택된 파일 없음";
  if(inputfile[inputfile_num].input.value !== "" && inputfile[inputfile_num+1] === undefined){
    console.log("버튼 생성함미다.");
    inputfile[inputfile_num].label.textContent = inputfile[inputfile_num].input.files[0].name;
    createInputFile();
  }else if(inputfile[inputfile_num].input.value === "" && inputfile_num < 4){
    console.log("버튼 삭제함미다.");
    div_inputfile.removeChild(inputfile[inputfile_num].input);
    div_inputfile.removeChild(inputfile[inputfile_num].label);
    for(var remove_cnt = inputfile_num; remove_cnt < inputfile_cnt - 1; remove_cnt++){
      inputfile[remove_cnt].input = inputfile[remove_cnt + 1].input;
      u.updateAttribute(inputfile[remove_cnt].input, "id", "userfile" + remove_cnt);
      u.updateAttribute(inputfile[remove_cnt].input, "onchange", "inputfile_change(" + remove_cnt + ")");
      
      inputfile[remove_cnt].label = inputfile[remove_cnt + 1].label;
      u.updateAttribute(inputfile[remove_cnt].label, "for", "userfile" + remove_cnt);
    }
    inputfile.pop();
    inputfile_cnt--;
    if(inputfile_cnt === 4 && inputfile[3].label.textContent !== ""){
      createInputFile();
    }
  }
}

createInputFile();