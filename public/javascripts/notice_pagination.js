let nowpage = parseInt(u.qu('#nowpage').value);

  var pagination = function() {
    nowpage = parseInt(u.qu('#nowpage').value);

    ss({nowpage : nowpage});
  }

  var board = document.getElementById('board');

//   var ss = function(form){
//     axios.post('/notice/pagination', form)
//     .then((response) => {
//       console.log(response.data.notice);
//       var node = document.createElement('ul');
//       board.childNodes[0] === undefined ? null : board.removeChild(board.childNodes[0]);
//       for(var data in response.data.notice){
//         var li  = document.createElement('li')
//         li.appendChild(document.createTextNode(response.data.notice[data].n_id + ", " + response.data.notice[data].n_title + ", " + response.data.notice[data].createdAt));
//         node.appendChild(li);
//       }
//       console.log(node);
//       board.appendChild(node);
//     });
// }

var ss = function(form){
  axios.post('/notice/pagination', form)
  .then((response) => {
    console.log(response.data.notice);
    var node = document.createElement('div');
    board.childNodes[0] === undefined ? null : board.removeChild(board.childNodes[0]);
    for(var data in response.data.notice){
      var p = document.createElement('p');
      var li  = document.createElement('a')
      li.setAttribute('href','notice?notice_num='+response.data.notice[data].n_id);
      li.appendChild(document.createTextNode(response.data.notice[data].n_title + ", " + response.data.notice[data].createdAt));
      p.appendChild(li);
      node.appendChild(p);
    }
    console.log(node);
    board.appendChild(node);
  });
}

pagination();