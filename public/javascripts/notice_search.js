let search_condition = u.qu('#search_condition');
let search_condition_list = u.names('search_condition_list');
let search = u.qu("#search");
let search_input = u.qu("#search_input");

for(let i = 0; i < search_condition_list.length; i++){
    search_condition_list[i].addEventListener('click', () => {
        console.log(search_condition_list[i].textContent);
        search_condition.innerText = search_condition_list[i].textContent;
    });
}

search.addEventListener('click', () => {
    if(search_input.value !== ""){
        let prev_page = pagedata.nowpage;
        pagedata = { nowpage : 1 };
        pagedata.search_cnt = 1;
        switch(search_condition.textContent) {
            case '제목' :
                console.log("제목");
                pagedata.search_title = search_input.value;
                break;
            case '내용' :
                console.log("내용");
                pagedata.search_content = search_input.value;
                break;
            default :
                console.log("기본값");
                pagedata = { nowpage : prev_page };
                break;
        }
        console.log(pagedata.search_cnt);
        pagination(pagedata);
        make_notice_search_next();
        // axios.post('/notice/pagination_search_condition', pagedata);
    }else{
        alert("검색어를 입력해주세요.");
    }
});