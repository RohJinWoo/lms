let file = u.qu('#userfile');
var upload = function(){
    let form = u.qu('#form');
    if(file.files[0].size <= 5 * 1024 * 1024){
        // 파일 크기가 5MB이하만 허용
        console.log(form);
        u.form(form, "./upload", "post");
    }else{
        alert("최대5MB용량 초과");
    }
}