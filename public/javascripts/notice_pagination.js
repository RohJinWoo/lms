// var pagination = function() {
//   ss({nowpage : nowpage});
// }
let pagedata = { nowpage : 1 }
let board = document.getElementById('board');
let notice_pagination = u.qu("#notice_pagination");

let prevnext_num = 1;
let make_notice_pagination = (pageNum, nowpage) => {
  notice_pagination.childNodes[0] === undefined ? null : notice_pagination.removeChild(notice_pagination.childNodes[0]);
  
  let pagination_span = [], pagination_div = u.createTag('div', { attribute : null }, null);
  let pagination_prev = u.createTag('span', { attribute : [ "name", "class", "style" ], value : [ "pagination_prev", "prev", "cursor:pointer" ] }, "<"),
  pagination_next = u.createTag('span', { attribute : [ "name", "class", "style" ], value : [ "pagination_next", "next", "cursor:pointer" ] }, ">");

  pagination_prev.addEventListener("click", () => {
    console.log("페이지 앞으로")
    if(prevnext_num !== 1){
      prevnext_num--;
      make_notice_pagination(pageNum, nowpage);
    }else{
      alert("더는 앞으로 이동 불가");
    }
  });
  
  pagination_next.addEventListener("click", () => {
    console.log("페이지 뒤로")
    if(prevnext_num < Math.ceil(pageNum / 10)){
      prevnext_num++;
      make_notice_pagination(pageNum, nowpage);
    }else{
      alert("더는 뒤로 이동 불가");
    }
  });

  pagination_div.appendChild(pagination_prev);

  for(let i = 1; i <= (prevnext_num * 10 > pageNum ? pageNum % 10 : 10); i++){
    pagination_span[i - 1] = u.createTag('span', { attribute : [ "name", "class", "style" ], value : [ "pagination_span", (nowpage === (prevnext_num-1) * 10 + i) ? "pagination_nowpage" : " ", "cursor:pointer" ] }, (prevnext_num-1) * 10 + i);
    pagination_span[i - 1].addEventListener("click", () => {
      console.log("(prevnext_num-1) * 10 + i :: ", (prevnext_num-1) * 10 + i);
      pagedata.nowpage = (prevnext_num-1) * 10 + i;
      console.log("FDSFDSFDS", pagedata);
      pagination( pagedata );
    })
    pagination_div.appendChild(pagination_span[i - 1]);
    console.log(pagination_span[i - 1]);
  }
    pagination_div.appendChild(pagination_next);

  notice_pagination.appendChild(pagination_div);
}

/*
<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5" name="notice_post" style="cursor:pointer"><div class="resume-content"><h3 class="mb-0">5개 확인용</h3><div class="subheading mb-3" name="notice_num">232</div></div><div class="resume-date text-md-right"><span class="text-primary">2019년 6월 5일 14:58:20</span><p><img src="../images/upload_file.png" class="upload_file_img">+4</p></div></div>
*/


let make_notice_title = (notice) => {
  board.childNodes[0] === undefined ? null : board.removeChild(board.childNodes[0]);

  var node = u.createTag("div", { attribute : null }, null);

    let p = [];
    if(notice.length !== 0){
      // 검색 결과가 없으면 조건문 false
      for(let data = 0; data < notice.length; data++){
        p[data] = u.node(
          '<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5" id="notice_post" style="cursor:pointer"><div class="resume-content"><h4 class="mb-0">'
           + notice[data].n_title +
          '</h4><div class="subheading mb-3" id="notice_num">'
           + notice[data].n_id +
          '</div></div><div class="resume-date text-md-right"><span class="text-primary">'
           + notice[data].createdAt +
          '</span><p><img src="../images/upload_file.png" class="upload_file_img">+'
           + (notice[data].file_cnt !== null ? notice[data].file_cnt : 0) +
          '</p></div></div><hr>');
        p[data].addEventListener("click", () => {
          u.link("./notice?notice_num=" + notice[data].n_id);
        })

        console.log(notice[data])
        // li[data] = u.createTag("a", { attribute : [ "href" ], value : [ 'notice?notice_num='+notice[data].n_id ] }, notice[data].n_title + ", " + notice[data].createdAt + ", 첨부파일 수 : " + (notice[data].file_cnt !== null ? notice[data].file_cnt : 0));
        // p[data] = u.createTag("p", { attribute : null }, null);
        // p[data].appendChild(li[data]);
        node.appendChild(p[data]);
        node.appendChild(u.node('<hr>'));
      }
    }else{
      alert("검색 결과가 없습니다.");
      p[0] = u.node(
        '<div class="resume-content"><h4 class="mb-0">검색 결과 없음</h4></div>');
      node.appendChild(p[0]);
      node.appendChild(u.node('<hr>'));
    }
    
    console.log(node);

    board.appendChild(node);
    
}

let next_search_div = u.qu("#next_search");
let next_search_btn = u.node('<button type="button" id="next_search_btn" name="next_search_btn">다음검색</button>');
next_search_btn.addEventListener('click', () => {
  if(confirm("다음으로 검색하시겠습니까?")){
    pagedata.search_cnt++;
    pagedata.nowpage = 1;
    pagination(pagedata);
  }
});

let delete_search_condition = u.node('<button type="button" id="delete_search_condition" name="delete_search_condition">검색조건 취소</button>');
delete_search_condition.addEventListener('click', () => {
  if(confirm("검색조건을 취소하시겠습니까?")){
    search_condition.textContent = "제목";
    search_input.value = null;
    pagedata = { nowpage : 1 };
    pagination(pagedata);
    make_notice_search_next();
  }
})

let make_notice_search_next = () => {
  switch(pagedata.search_cnt){
    case 1 :
      if(next_search_div.firstChild === null){
        next_search_div.appendChild(next_search_btn);
        next_search_div.appendChild(u.node("&nbsp;&nbsp;"));
        next_search_div.appendChild(delete_search_condition);
      }
        break;
    case undefined :
    default :
      if(next_search_div.firstChild !== null){
        while(next_search_div.firstChild){
          next_search_div.removeChild(next_search_div.firstChild);
        }
      }
      break;
  }
}

var pagination = function(pagedata){
  let path;
  path = (pagedata.search_title !== undefined) || (pagedata.search_content !== undefined) ? "/notice/pagination_search_condition" : '/notice/pagination';
  axios.post(path, pagedata)
  .then((response) => {
    console.log("총 페이지 수 : ", response.data.pageNum , ", 현재 페이지 : ", response.data.nowpage);
    
    console.log("response.data.pageNum : ", response.data.pageNum, " response.data.nowpage : ", response.data.nowpage);
    make_notice_pagination(response.data.pageNum, response.data.nowpage);

    console.log("response.data.notice : ", response.data.notice);
    make_notice_title(response.data.notice);
  });
}

pagination( pagedata );