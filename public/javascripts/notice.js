console.log(location.pathname + location.search);

var mod = function(){
    u.link(location.pathname + location.search + "&m=write");
}

var del = function(){
    let delete_file = [];
    let button = u.names("filedown");

    for(let i = 0; i < button.length; i++){
        delete_file.push(button[i].textContent);
    }
    if(confirm('정말로 삭제하시겠습니까?')){
        u.axios("/notice/delete" + location.search, { data : { delete_file : delete_file } }, "delete");
    }
}

var download = function(id){
    console.log(id);
    u.form(u.qu('#form'),'/notice/file_search?notice_num=' + id[0] + "&num=" + id[1], 'post');
}