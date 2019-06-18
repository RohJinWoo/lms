let file = u.qu('#userfile');
var upload = function(str){
    let form = u.qu('#form');
    if(dir_path !== '' && file.files[0] !== undefined){
        // 파일 크기가 5MB이하만 허용
        console.log(form);
        u.form(form, "../file_sample/upload?dir=" + dir_path, "post");
    }else{
        alert("업로드 파일 또는 file / video중 저장하고자하는 디렉토리를 선택해주세요");
    }
}

let select_file = () => {
    let label_file = u.qu("label")
    console.log(label_file.innerText = (file.files[0] !== undefined ? file.files[0].name : "업로드할 파일을 선택해주세요."));
}