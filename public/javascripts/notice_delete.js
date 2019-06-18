u.qu("#delete_notice") !== null ?  u.qu("#delete_notice").addEventListener('click', () => {
    let delete_file = [];
    let button = u.names("filedown");

    for(let i = 0; i < button.length; i++){
        delete_file.push(button[i].textContent);
    }
    if(confirm('정말로 삭제하시겠습니까?')){
        u.axios("../notice/delete" + location.search, { data : { delete_file : delete_file } }, "delete");
    }
}) : null;

