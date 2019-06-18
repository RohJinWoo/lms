// 메인화면 공지사항 클릭시 해당 글 페이지로 이동하기 위함(현재 구현 필요)
let notice_post = u.names("notice_post");
let notice_num = u.names("notice_num");
for(let i = 0; i < notice_post.length; i++) {
    notice_post[i].addEventListener("click", () => {
        u.link("./notice?notice_num=" + notice_num[i].textContent);
    });
}

// 
u.qu('#logout') !== null ? u.qu("#logout").addEventListener('click',() => {
    if(confirm("logout?"))
        location.href = "/user/logout";
}) : null;