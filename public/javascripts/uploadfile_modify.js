// 업로드된 파일명 배열 modify_file에서 제거되어 삭제해야하는 파일명을 저장하는 변수
delete_file = [];

var createNotice = function(req) {
    let title = u.qu('#title').value;
    let content = u.qu('#content').value;

    for(var arr_chg = 0; arr_chg < delete_file.length; arr_chg++){
        delete_file[arr_chg] = delete_file[arr_chg].filepath;
    }
    
    var modify_file_change = [];
    let change_file = u.qu("#change_file")
    var file_change_text = [];
    var file_change_cnt = 0;
    var file_change_bool = false;
  
    if(!(title === "") && !(content === "")){
        console.log("createNotice(update) 실행");

        for(var lbl_mod = 0; lbl_mod < modify_file.length; lbl_mod++){
            // 기존 파일 중에 어떤 첨부파일이 변화하였는지 확인할 수 있음.
            modify_file_change[lbl_mod] = { filepath : modify_file[lbl_mod].filepath };
            for(var lbl_chk = 0; lbl_chk < inputfile.length; lbl_chk++){
                if(modify_file[lbl_mod].filepath === inputfile[lbl_chk].label.textContent){
                    modify_file_change[lbl_mod].delete = true
                 }else{
                     null
                 };
            }
            if(modify_file_change[lbl_mod].delete === undefined){
                change_file.appendChild(file_change_text[file_change_cnt++] = u.createTag("input", {
                    attribute : [ "type", "name", "value" ],
                    value : [ "text", "change_file", modify_file_change[lbl_mod].filepath ]
                }, null));
                file_change_bool = true;
            }else{
                change_file.appendChild(file_change_text[file_change_cnt++] = u.createTag("input", {
                    attribute : [ "type", "name" ],
                    value : [ "text", "change_file" ]
                }, null));
            }
            console.log(modify_file_change[lbl_mod].delete);
        }
    
        // for(var lbl_mod = 0; lbl_mod < modify_file.length; lbl_mod++){
        //     // 변하지 않은것은 false, 변한것은 (삭제를 위해서) 변화기전 파일명을 가지고있음.
        //     modify_file[lbl_mod].filepath === inputfile[lbl_mod].label.textContent ? modify_file_change[lbl_mod] = false : modify_file_change[lbl_mod] = modify_file[lbl_mod].filepath;
        // }

        // for(var insert_input = modify_file.length; insert_input < inputfile.length; insert_input++){
        //     // 파일이 선택된것은 (추가적인 업로드를 위해) true, 파일 선택이 되지 않은것은 undefined
        //     inputfile[insert_input].input.value !== "" ? modify_file_change[insert_input] = true : modify_file_change[insert_input] = null;
        // }

        console.log("modify_file_change");
        console.log(modify_file_change);

        if(req === "update"){
            u.form(u.qu('#form'), '/notice/fileupdate' + location.search +'&change=' + file_change_bool + "&now=" + getTimeStamp(), 'post');
        }
    }else{
      alert("다 입력");
    }
  }
  