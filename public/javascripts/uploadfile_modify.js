// 업로드된 파일명 배열 modify_file에서 제거되어 삭제해야하는 파일명을 저장하는 변수
delete_file = [];

var createNotice = function(req) {
    let title = u.qu('#title').value;
    let content = u.qu('#content').value;

    for(var arr_chg = 0; arr_chg < delete_file.length; arr_chg++){
        delete_file[arr_chg] = delete_file[arr_chg].filepath;
    }
    
    var modify_file_change = [];
    // let change_file = u.qu("#change_file")
    // var file_change_text = [];
    // var file_change_cnt = 0;
    // var file_change_bool = false;

    let delete_query = [];
  
    if(!(title === "") && !(content === "")){
        console.log("createNotice(update) 실행");

        //
        let formData = new FormData();
        formData.append("title",u.qu("#title").value);
        formData.append("content",u.qu("#content").value);
        for(let i = 0; i < inputfile.length; i++){
            formData.append('userfile', inputfile[i].input.files[0]);
        }
        let contenttype = { headers : { "content-type" : "multipart/form-data" } };
        //
        for(let i = 0; i < modify_file.length; i++){
            for(let j = 0; j < inputfile.length; j++){
                if(modify_file[i].filepath == inputfile[j].label.textContent)
                    break;
                else if(j + 1 === inputfile.length){
                    delete_query.push("\'" + modify_file[i].filepath + "\'");
                    formData.append('delete_file', modify_file[i].filepath);
                }
            }
        }
        delete_query = "("+ delete_query.toString()+ ")"
        formData.append('delete', delete_query);

        console.log("modify_file_change");
        console.log(modify_file_change);
        
        console.log('delete_query');
        console.log(delete_query);

        if(req === "update"){
            axios.put('/notice/fileupdate' + location.search + "&now=" + getTimeStamp(), formData, contenttype)
            .then(res => {
                console.log(res.data.console);
                if(res.data.err){
                    alert(res.data.err);
                }
                location.href = res.data.link;
            });

            // u.axios('/notice/fileupdate' + location.search +'&change=' + file_change_bool + "&now=" + getTimeStamp(), { change : modify_file_change, form : u.qu("#form") }, "post");
            // u.form(u.qu('#form'), '/notice/fileupdate' + location.search +'&change=' + file_change_bool + "&now=" + getTimeStamp(), 'post');
        }
    }else{
      alert("다 입력");
    }
  }
  