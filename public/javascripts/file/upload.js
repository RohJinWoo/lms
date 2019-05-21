let file = u.qu('#userfile');
var upload = function(str){
    let form = u.qu('#form');
    if(dir_path !== ''){
        // 파일 크기가 5MB이하만 허용
        console.log(form);
        u.form(form, "./upload?dir=" + dir_path, "post");
    }else{
        alert("최대5MB용량 초과 또는 file / video중 저장하고자하는 디렉토리를 선택해주세요");
    }
}