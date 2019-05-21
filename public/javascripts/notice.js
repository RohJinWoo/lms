console.log(location.pathname + location.search);

var mod = function(){
    u.link(location.pathname + location.search + "&m=write");
}

var del = function(){
    if(confirm('정말로 삭제하시겠습니까?')){
        u.axios("/notice/delete" + location.search, {}, "delete");
    }
}

var download = function(id){
    u.form(u.qu('#form'),'/notice/file_search?notice_num=' + id, 'post');
}