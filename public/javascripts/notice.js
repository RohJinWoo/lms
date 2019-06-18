console.log(location.pathname + location.search);

var mod = function(){
    u.link(location.pathname + location.search + "&m=write");
}

var download = function(id){
    console.log(id);
    u.form( u.qu('#form'),'../notice/file_search?notice_num=' + id[0] + "&num=" + id[1], 'post');
}